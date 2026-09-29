/* ==========================================================================
   app.js: builds the page from window.CONTENT (content.js).
   No visible text lives here; edit content.js instead.
   ========================================================================== */
(function () {
  "use strict";

  const C = window.CONTENT;
  if (!C) {
    console.error("content.js did not load, or has a syntax error (check for a missing comma or quote).");
    return;
  }
  const UI = C.ui || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

  /* ---------- tiny DOM helpers ---------- */
  function el(tag, props, ...kids) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "text") node.textContent = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? "" : v);
    }
    kids.flat(Infinity).forEach((kid) => {
      if (kid == null || kid === false) return;
      node.append(kid.nodeType ? kid : document.createTextNode(kid));
    });
    return node;
  }
  const fmt = (s, vars) => String(s || "").replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null ? vars[k] : ""));
  const stripTags = (s) => String(s || "").replace(/<[^>]*>/g, "");
  const svg = (paths) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("focusable", "false");
    s.innerHTML = paths;
    return s;
  };
  const ICON = {
    play: '<path fill="currentColor" d="M8 5.5v13l11-6.5z"/>',
    pause: '<path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/>',
    restart: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/>',
    muted: '<path fill="currentColor" d="M4 9h4l5-4v14l-5-4H4z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16.5 9.5l5 5m0-5l-5 5"/>',
    sound: '<path fill="currentColor" d="M4 9h4l5-4v14l-5-4H4z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    grip: '<path fill="currentColor" d="M9.5 7 4.5 12l5 5zM14.5 7l5 5-5 5z"/>',
    external: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 5h5v5M19 5l-8 8M17 14v5H5V7h5"/>',
    left: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 5l-7 7 7 7"/>',
    right: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>'
  };

  /* ---------- video source helpers ---------- */
  const isYouTube = (url) => /(^|\/\/)(www\.|m\.)?(youtube\.com|youtube-nocookie\.com|youtu\.be)\//i.test(url || "");
  function youTubeId(url) {
    const m = String(url || "").match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  const isVideoFile = (url) => !!url && url !== "#" && !isYouTube(url);
  const hasLink = (url) => !!url && url.trim() !== "" && url.trim() !== "#";

  /* ---------- shared bits ---------- */
  function kicker(text) {
    return text ? el("p", { class: "kicker", html: text }) : null;
  }
  function paragraphs(list) {
    return (list || []).map((p) => el("p", { class: "reveal", html: p }));
  }
  function chapterHead(data, id) {
    return el("div", { class: "chapter__head reveal" },
      kicker(data.kicker),
      el("h2", { class: "chapter__title", id: id + "-title", html: data.heading || "" }));
  }
  function adLabel(ad, side, extra) {
    return el("div", { class: `adlabel adlabel--${side} ${extra || ""}` },
      el("span", { class: "adlabel__brand", html: ad.brand }),
      el("span", { class: "adlabel__title", html: ad.title }),
      el("span", { class: "adlabel__year", html: ad.year }));
  }
  const adVars = (ad) => ({ brand: stripTags(ad.brand), title: stripTags(ad.title), year: stripTags(ad.year) });

  /* ======================================================================
     Draggable + keyboard-operable slider (used by both compare modes)
     ====================================================================== */
  function wireSlider({ track, grab, handle, min, max, onChange }) {
    let pos = 50;
    let dragging = false;
    let startX = 0;
    let isTouch = false;
    let armed = false;

    const set = (p) => {
      pos = clamp(p, min, max);
      onChange(pos);
      handle.setAttribute("aria-valuenow", String(Math.round(pos)));
    };
    const fromX = (x) => {
      const r = track.getBoundingClientRect();
      return ((x - r.left) / r.width) * 100;
    };

    grab.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      if (e.target.closest("button, a, iframe")) return;
      dragging = true;
      isTouch = e.pointerType !== "mouse";
      startX = e.clientX;
      armed = !isTouch; // touch waits for a horizontal move so vertical scrolling still works
      try { grab.setPointerCapture(e.pointerId); } catch (_) {}
      track.classList.add("is-dragging");
      if (armed) set(fromX(e.clientX));
    });
    grab.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      if (!armed && Math.abs(e.clientX - startX) > 4) armed = true;
      if (armed) set(fromX(e.clientX));
    });
    const end = () => {
      dragging = false;
      track.classList.remove("is-dragging");
    };
    grab.addEventListener("pointerup", end);
    grab.addEventListener("pointercancel", end);
    grab.addEventListener("lostpointercapture", end);

    handle.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 10 : 2;
      let next = null;
      switch (e.key) {
        case "ArrowLeft": case "ArrowDown": next = pos - step; break;
        case "ArrowRight": case "ArrowUp": next = pos + step; break;
        case "PageDown": next = pos - 10; break;
        case "PageUp": next = pos + 10; break;
        case "Home": next = min; break;
        case "End": next = max; break;
      }
      if (next !== null) { e.preventDefault(); set(next); }
    });

    set(50);
  }

  /* ======================================================================
     Comparison slider
     ====================================================================== */
  function buildCompare(pair, id) {
    const left = C.ads[pair.left];
    const right = C.ads[pair.right];
    const capId = id + "-caption";
    const fig = el("figure", { class: "compare reveal", "aria-labelledby": capId });
    if (!left || !right) {
      console.warn(`Pair "${id}": ad ID "${!left ? pair.left : pair.right}" not found in CONTENT.ads.`);
      return fig;
    }
    const caption = el("figcaption", { class: "compare__caption", id: capId, html: pair.caption || "" });
    const showSplit = () => fig.replaceChildren(buildSplit(left, right), caption);

    if (isVideoFile(left.video) && isVideoFile(right.video)) {
      fig.dataset.mode = "stacked";
      fig.append(buildStacked(left, right, () => { fig.dataset.mode = "split"; showSplit(); }), caption);
    } else {
      fig.dataset.mode = "split";
      showSplit();
    }
    return fig;
  }

  /* ---- Mode 1: both videos stacked in one frame, revealed with clip-path ---- */
  function buildStacked(left, right, onFail) {
    let failed = false;
    const wrap = el("div", { class: "compare__stacked" });

    const makeVideo = (ad, side) => {
      const v = el("video", {
        class: `compare__video compare__video--${side}`,
        muted: true, playsinline: true, loop: true, preload: "metadata",
        "aria-label": stripTags(ad.alt || `${ad.brand}, ${ad.title}, ${ad.year}`),
        poster: ad.poster || null
      });
      v.muted = true;
      v.addEventListener("error", fail);
      return v;
    };
    function fail() {
      if (failed) return;
      failed = true;
      [vL, vR].forEach((v) => { v.pause(); v.removeAttribute("src"); v.load(); });
      if (io) io.disconnect();
      onFail();
    }

    const vL = makeVideo(left, "left");
    const vR = makeVideo(right, "right");
    const labelL = adLabel(left, "left", "adlabel--overlay");
    const labelR = adLabel(right, "right", "adlabel--overlay");
    const handle = el("div", {
      class: "compare__handle", role: "slider", tabindex: "0",
      "aria-label": fmt(UI.sliderLabel, { left: stripTags(left.brand), right: stripTags(right.brand) }),
      "aria-valuemin": "0", "aria-valuemax": "100", "aria-orientation": "horizontal"
    }, el("span", { class: "compare__grip" }, svg(ICON.grip)));

    // Right ad is the base layer; left ad sits on top and is clipped to the handle.
    const frame = el("div", { class: "compare__frame" }, vR, vL, labelL, labelR, handle);

    /* controls */
    const playLabel = el("span", { text: UI.play });
    const playIcon = el("span", { class: "btn__icon" }, svg(ICON.play));
    const playBtn = el("button", { class: "btn btn--primary", type: "button" }, playIcon, playLabel);
    const restartBtn = el("button", { class: "btn btn--ghost", type: "button", "aria-label": UI.restart },
      el("span", { class: "btn__icon" }, svg(ICON.restart)), el("span", { class: "btn__text", text: UI.restart }));

    const muteBtn = (video, ad) => {
      const vars = adVars(ad);
      const icon = el("span", { class: "btn__icon" }, svg(ICON.muted));
      const text = el("span", { text: fmt(UI.unmute, vars) });
      const btn = el("button", { class: "btn btn--sound", type: "button", "aria-pressed": "false" }, icon, text);
      btn.addEventListener("click", () => {
        video.muted = !video.muted;
        const on = !video.muted;
        btn.setAttribute("aria-pressed", String(on));
        text.textContent = fmt(on ? UI.mute : UI.unmute, vars);
        icon.replaceChildren(svg(on ? ICON.sound : ICON.muted));
      });
      return btn;
    };

    const setPlaying = (playing) => {
      playLabel.textContent = playing ? UI.pause : UI.play;
      playIcon.replaceChildren(svg(playing ? ICON.pause : ICON.play));
      wrap.classList.toggle("is-playing", playing);
    };
    const playBoth = () => {
      vR.currentTime = Math.min(vL.currentTime, vR.duration || vL.currentTime);
      Promise.all([vL.play(), vR.play()]).catch(() => {});
    };
    const pauseBoth = () => { vL.pause(); vR.pause(); };
    playBtn.addEventListener("click", () => (vL.paused ? playBoth() : pauseBoth()));
    restartBtn.addEventListener("click", () => {
      vL.currentTime = 0; vR.currentTime = 0;
      if (vL.paused) playBoth();
    });
    vL.addEventListener("play", () => setPlaying(true));
    vL.addEventListener("pause", () => setPlaying(false));

    // Pause both when the frame scrolls out of view.
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (!en.isIntersecting && !vL.paused) pauseBoth(); });
      }, { threshold: 0.15 });
      io.observe(frame);
    }

    const controls = el("div", { class: "compare__controls" },
      el("div", { class: "compare__group" }, playBtn, restartBtn),
      el("div", { class: "compare__group" }, muteBtn(vL, left), muteBtn(vR, right)));

    wireSlider({
      track: frame, grab: frame, handle, min: 0, max: 100,
      onChange: (p) => {
        frame.style.setProperty("--pos", p + "%");
        handle.setAttribute("aria-valuetext", fmt(UI.sliderValue, {
          left: stripTags(left.brand), right: stripTags(right.brand),
          leftPct: Math.round(p), rightPct: 100 - Math.round(p)
        }));
        labelL.classList.toggle("is-hidden", p < 18);
        labelR.classList.toggle("is-hidden", p > 82);
      }
    });

    // Assign sources last so error listeners are already attached.
    vL.src = left.video;
    vR.src = right.video;

    wrap.append(frame, controls);
    return wrap;
  }

  /* ---- Mode 2: side-by-side panels with a draggable divider ---- */
  function buildPanel(ad, side) {
    const id = youTubeId(ad.video);
    let body;
    if (isYouTube(ad.video) && id) {
      body = el("div", { class: "panel__embed" },
        el("iframe", {
          src: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
          title: stripTags(ad.alt || `${ad.brand}, ${ad.title}, ${ad.year}`),
          loading: "lazy",
          allow: "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
          allowfullscreen: true,
          referrerpolicy: "strict-origin-when-cross-origin"
        }));
    } else {
      const action = hasLink(ad.link)
        ? el("a", { class: "btn btn--primary", href: ad.link, target: "_blank", rel: "noopener noreferrer", "aria-label": fmt(UI.watchAdLabel, adVars(ad)) },
            el("span", { text: UI.watchAd }), el("span", { class: "btn__icon" }, svg(ICON.external)))
        : el("span", { class: "btn btn--disabled", "aria-disabled": "true", text: UI.linkPending });
      body = el("div", { class: "panel__card" + (ad.poster ? " has-poster" : "") },
        ad.poster ? el("img", { class: "panel__poster", src: ad.poster, alt: "" }) : null,
        el("span", { class: "panel__ring", "aria-hidden": "true" }, svg(ICON.play)),
        el("p", { class: "panel__note", text: UI.videoUnavailable }),
        action,
        ad.alt ? el("p", { class: "sr-only", html: ad.alt }) : null);
    }
    return el("div", { class: `panel panel--${side}` }, adLabel(ad, side, "adlabel--panel"), body);
  }

  function buildSplit(left, right) {
    const handle = el("div", {
      class: "compare__divider", role: "slider", tabindex: "0",
      "aria-label": fmt(UI.dividerLabel, { left: stripTags(left.brand), right: stripTags(right.brand) }),
      "aria-valuemin": "20", "aria-valuemax": "80", "aria-orientation": "horizontal"
    }, el("span", { class: "compare__grip" }, svg(ICON.grip)));
    const split = el("div", { class: "compare__split" }, buildPanel(left, "left"), handle, buildPanel(right, "right"));
    wireSlider({
      track: split, grab: handle, handle, min: 20, max: 80,
      onChange: (p) => {
        split.style.setProperty("--pos", p + "%");
        handle.setAttribute("aria-valuetext", fmt(UI.sliderValue, {
          left: stripTags(left.brand), right: stripTags(right.brand),
          leftPct: Math.round(p), rightPct: 100 - Math.round(p)
        }));
      }
    });
    return split;
  }

  /* ======================================================================
     Sections
     ====================================================================== */
  function hero() {
    const h = C.hero || {};
    return el("header", { class: "hero", id: "top" },
      el("div", { class: "hero__inner" },
        h.kicker ? el("p", { class: "hero__kicker", html: h.kicker }) : null,
        el("h1", { class: "hero__title", html: h.title || "" }),
        h.subtitle ? el("p", { class: "hero__subtitle", html: h.subtitle }) : null,
        h.byline ? el("p", { class: "hero__byline", html: h.byline }) : null),
      el("a", { class: "hero__cue", href: "#opening", text: UI.scrollCue }));
  }

  function proseSection(data, id, cls) {
    return el("section", { class: `chapter ${cls || ""}`, id, "aria-labelledby": id + "-title" },
      chapterHead(data, id),
      el("div", { class: "prose" }, paragraphs(data.paragraphs)));
  }

  function pairSection(pair, i) {
    const id = pair.id || `pair-${i + 1}`;
    return el("section", { class: "chapter chapter--pair", id, "aria-labelledby": id + "-title" },
      chapterHead(pair, id),
      el("div", { class: "prose" }, paragraphs(pair.before)),
      buildCompare(pair, id),
      el("div", { class: "prose" }, paragraphs(pair.after)));
  }

  function timelineSection() {
    const t = C.timeline || {};
    const id = "timeline";
    const list = el("ol", { class: "timeline__list" },
      (t.entries || []).map((e) => el("li", { class: "timeline__item" },
        el("p", { class: "timeline__year", html: e.year }),
        el("h3", { class: "timeline__headline", html: e.headline }),
        el("p", { class: "timeline__text", html: e.text }))));
    const track = el("div", {
      class: "timeline__track", tabindex: "0", role: "region",
      "aria-label": stripTags(t.heading) || UI.timelineRegion
    }, list);
    const prev = el("button", { class: "btn btn--icon", type: "button", "aria-label": UI.timelinePrev }, svg(ICON.left));
    const next = el("button", { class: "btn btn--icon", type: "button", "aria-label": UI.timelineNext }, svg(ICON.right));
    const bar = el("span", { class: "timeline__bar" });
    const nav = el("div", { class: "timeline__nav" },
      el("span", { class: "timeline__meter", "aria-hidden": "true" }, bar), prev, next);
    const sticky = el("div", { class: "timeline__sticky" }, track, nav);
    const pin = el("div", { class: "timeline__pin" }, sticky);
    const section = el("section", { class: "chapter chapter--timeline timeline", id, "aria-labelledby": id + "-title" },
      chapterHead(t, id),
      t.intro && t.intro.length ? el("div", { class: "prose" }, paragraphs(t.intro)) : null,
      pin);

    /* Desktop: pinned, scroll-driven horizontal track.
       Reduced motion: plain horizontal scroller with Earlier/Later buttons.
       Mobile: vertical list (pure CSS). */
    const desktop = window.matchMedia("(min-width: 900px)");
    let overflow = 0;

    const innerWidth = () => {
      const cs = getComputedStyle(track);
      return track.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    };
    function layout() {
      const pinned = desktop.matches && !reduceMotion;
      section.classList.toggle("is-pinned", pinned);
      list.style.transform = "";
      if (!pinned) { pin.style.height = ""; updateScroller(); return; }
      overflow = Math.max(0, list.scrollWidth - innerWidth());
      pin.style.height = `${window.innerHeight + overflow}px`;
      updatePinned();
    }
    function updatePinned() {
      if (!section.classList.contains("is-pinned")) return;
      const total = pin.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-pin.getBoundingClientRect().top / total, 0, 1) : 0;
      list.style.transform = `translate3d(${-p * overflow}px,0,0)`;
      bar.style.transform = `scaleX(${p})`;
    }
    function updateScroller() {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      bar.style.transform = `scaleX(${p})`;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
    }
    prev.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" }));
    track.addEventListener("scroll", updateScroller, { passive: true });

    section._timeline = { layout, updatePinned };
    return section;
  }

  function worksCited() {
    const w = C.worksCited || {};
    const id = "works-cited";
    return el("section", { class: "chapter chapter--cited", id, "aria-labelledby": id + "-title" },
      el("div", { class: "chapter__head reveal" }, el("h2", { class: "chapter__title", id: id + "-title", html: w.heading || "" })),
      el("div", { class: "works-cited" }, (w.entries || []).map((e) => el("p", { html: e }))));
  }

  /* ======================================================================
     Assemble
     ====================================================================== */
  function render() {
    document.title = stripTags(C.site && C.site.pageTitle) || stripTags(C.hero && C.hero.title);
    const desc = document.querySelector('meta[name="description"]');
    if (desc && C.site) desc.setAttribute("content", stripTags(C.site.description));

    const app = document.getElementById("app");
    const pairs = C.pairs || [];
    const timeline = timelineSection();

    const main = el("main", { id: "main", tabindex: "-1" },
      proseSection(C.opening || {}, "opening", "chapter--opening"),
      pairs[0] ? pairSection(pairs[0], 0) : null,
      pairs[1] ? pairSection(pairs[1], 1) : null,
      timeline,
      pairs.slice(2).map((p, i) => pairSection(p, i + 2)),
      proseSection(C.closing || {}, "closing", "chapter--closing"),
      worksCited());

    const progress = el("div", { class: "progress", "aria-hidden": "true" });
    app.replaceChildren(
      el("a", { class: "skip", href: "#main", text: UI.skipToContent }),
      progress,
      hero(),
      main,
      el("footer", { class: "site-footer" }, el("p", { html: (C.footer && C.footer.text) || "" })));

    /* reveal-on-scroll */
    if (!reduceMotion && "IntersectionObserver" in window) {
      document.documentElement.classList.add("js-reveal");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      app.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    }

    /* scroll-linked effects: progress bar, hero fade, pinned timeline */
    const heroInner = app.querySelector(".hero__inner");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        if (!reduceMotion && heroInner) {
          heroInner.style.setProperty("--hero-p", clamp(window.scrollY / (window.innerHeight * 0.8), 0, 1).toFixed(3));
        }
        timeline._timeline.updatePinned();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { timeline._timeline.layout(); onScroll(); });
    timeline._timeline.layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { timeline._timeline.layout(); onScroll(); });
    window.addEventListener("load", () => timeline._timeline.layout());
    onScroll();
  }

  window.renderSite = render;
  render();
})();
