/* ==========================================================================
   CONTENT.JS: every piece of visible text on the site lives in this file.
   ==========================================================================

   HOW TO EDIT
   - Change only the text inside the quotes. Keep the commas and brackets.
   - Prose sections are ARRAYS OF PARAGRAPHS: one "string" per paragraph,
     with a comma after each paragraph except the last.
   - Inside any string you may use simple inline HTML: <em>, <strong>, <i>,
     <a href="...">, <br>. Straight double quotes inside a string need a
     backslash (\"), or you can use curly quotes (“ ”) with no backslash.
   - Order of sections on the page is fixed:
       hero → opening → pair 1 → pair 2 → timeline → pair 3 → closing → works cited

   ADS & VIDEOS (see the `ads` block below)
   - `video` can be:
       • a file in the /videos folder, e.g. "videos/pair1-left.mp4"
         (use MP4/H.264 for the widest browser support; GitHub rejects files
         over 100 MB, so compress first)
       • a YouTube URL, e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"
   - If BOTH ads in a pair are video files that load, the pair shows the
     stacked clip-path slider. If either is missing or is a YouTube URL, the
     pair falls back to side-by-side panels: a YouTube source is embedded,
     anything else shows a "Watch the ad" card that links to `link`.
   - `link` is the fallback URL for the "Watch the ad" card. Leave it "#" until
     you have one; the card then shows the linkPending text instead of a link.
   - `alt` is read aloud by screen readers in place of the video. Describe
     what is on screen.
   - `poster` (optional) is a still image shown before the video plays,
     e.g. "videos/pair1-left.jpg". Leave "" for none.
   ========================================================================== */

window.CONTENT = {

  /* ---------- Browser tab + search/social preview ---------- */
  site: {
    pageTitle: "[Site Title]",
    description: "[One-sentence description used by search engines and link previews.]"
  },

  /* ---------- Hero (top of page) ---------- */
  hero: {
    kicker: "[Eyebrow line above the title]",
    title: "[Title of the Piece]",
    subtitle: "[Subtitle placeholder, one or two lines long]",
    byline: "Tyler Rose, WRT 120, Duke University, Fall 2026"
  },

  /* ---------- Opening scene ---------- */
  opening: {
    kicker: "[Opening kicker]",
    heading: "[Opening Section Heading]",
    paragraphs: [
      "[Opening ¶1] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "[Opening ¶2] Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "[Opening ¶3] Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris."
    ]
  },

  /* ---------- Ads ----------
     Each ad has a short ID (the key, e.g. pair1Left). The pairs below refer
     to ads by that ID, so you can swap which ad appears where. */
  ads: {
    pair1Left: {
      brand: "[Brand A]",
      title: "[Ad Title A]",
      year: "[Year]",
      video: "videos/pair1-left.mp4",
      link: "#",
      poster: "",
      alt: "[Describe what happens on screen in Ad A.]"
    },
    pair1Right: {
      brand: "[Brand B]",
      title: "[Ad Title B]",
      year: "[Year]",
      video: "videos/pair1-right.mp4",
      link: "#",
      poster: "",
      alt: "[Describe what happens on screen in Ad B.]"
    },
    pair2Left: {
      brand: "[Brand C]",
      title: "[Ad Title C]",
      year: "[Year]",
      video: "videos/pair2-left.mp4",
      link: "#",
      poster: "",
      alt: "[Describe what happens on screen in Ad C.]"
    },
    pair2Right: {
      brand: "[Brand D]",
      title: "[Ad Title D]",
      year: "[Year]",
      video: "videos/pair2-right.mp4",
      link: "#",
      poster: "",
      alt: "[Describe what happens on screen in Ad D.]"
    },
    pair3Left: {
      brand: "[Brand E]",
      title: "[Ad Title E]",
      year: "[Year]",
      video: "videos/pair3-left.mp4",
      link: "#",
      poster: "",
      alt: "[Describe what happens on screen in Ad E.]"
    },
    pair3Right: {
      brand: "[Brand F]",
      title: "[Ad Title F]",
      year: "[Year]",
      video: "videos/pair3-right.mp4",
      link: "#",
      poster: "",
      alt: "[Describe what happens on screen in Ad F.]"
    }
  },

  /* ---------- The three pair sections ----------
     before  = prose above the slider
     left / right = ad IDs from the `ads` block
     caption = line under the slider
     after   = prose below the slider */
  pairs: [
    {
      id: "pair-1",
      kicker: "[Pair One kicker]",
      heading: "[Pair One Heading]",
      before: [
        "[Pair 1, before ¶1] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
        "[Pair 1, before ¶2] Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla."
      ],
      left: "pair1Left",
      right: "pair1Right",
      caption: "[Caption for comparison one]",
      after: [
        "[Pair 1, after ¶1] Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.",
        "[Pair 1, after ¶2] Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem."
      ]
    },
    {
      id: "pair-2",
      kicker: "[Pair Two kicker]",
      heading: "[Pair Two Heading]",
      before: [
        "[Pair 2, before ¶1] Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.",
        "[Pair 2, before ¶2] Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit."
      ],
      left: "pair2Left",
      right: "pair2Right",
      caption: "[Caption for comparison two]",
      after: [
        "[Pair 2, after ¶1] Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi.",
        "[Pair 2, after ¶2] Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam."
      ]
    },
    {
      id: "pair-3",
      kicker: "[Pair Three kicker]",
      heading: "[Pair Three Heading]",
      before: [
        "[Pair 3, before ¶1] Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor.",
        "[Pair 3, before ¶2] Sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae."
      ],
      left: "pair3Left",
      right: "pair3Right",
      caption: "[Caption for comparison three]",
      after: [
        "[Pair 3, after ¶1] Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet.",
        "[Pair 3, after ¶2] Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim."
      ]
    }
  ],

  /* ---------- Timeline (appears between Pair 2 and Pair 3) ----------
     Add or remove entries freely; the layout adapts. */
  timeline: {
    kicker: "[Timeline kicker]",
    heading: "[Timeline Heading]",
    intro: [
      "[Timeline intro ¶1] Optional. Delete this line (leave the brackets: intro: []) if you want no intro."
    ],
    entries: [
      { year: "YYYY", headline: "[Timeline headline 1]",  text: "[One sentence for entry 1.]" },
      { year: "YYYY", headline: "[Timeline headline 2]",  text: "[One sentence for entry 2.]" },
      { year: "YYYY", headline: "[Timeline headline 3]",  text: "[One sentence for entry 3.]" },
      { year: "YYYY", headline: "[Timeline headline 4]",  text: "[One sentence for entry 4.]" },
      { year: "YYYY", headline: "[Timeline headline 5]",  text: "[One sentence for entry 5.]" },
      { year: "YYYY", headline: "[Timeline headline 6]",  text: "[One sentence for entry 6.]" },
      { year: "YYYY", headline: "[Timeline headline 7]",  text: "[One sentence for entry 7.]" },
      { year: "YYYY", headline: "[Timeline headline 8]",  text: "[One sentence for entry 8.]" },
      { year: "YYYY", headline: "[Timeline headline 9]",  text: "[One sentence for entry 9.]" },
      { year: "YYYY", headline: "[Timeline headline 10]", text: "[One sentence for entry 10.]" },
      { year: "YYYY", headline: "[Timeline headline 11]", text: "[One sentence for entry 11.]" },
      { year: "YYYY", headline: "[Timeline headline 12]", text: "[One sentence for entry 12.]" }
    ]
  },

  /* ---------- Closing scene ---------- */
  closing: {
    kicker: "[Closing kicker]",
    heading: "[Closing Section Heading]",
    paragraphs: [
      "[Closing ¶1] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
      "[Closing ¶2] Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.",
      "[Closing ¶3] Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc."
    ]
  },

  /* ---------- Works Cited (MLA) ----------
     One string per entry, already in alphabetical order. Use <i>...</i> for
     italic titles. The hanging indent is applied automatically. */
  worksCited: {
    heading: "Works Cited",
    entries: [
      "[Author Last Name, First Name.] “[Title of Article].” <i>[Title of Website or Journal]</i>, [Publisher], [Day Month Year], [URL].",
      "[Author Last Name, First Name.] <i>[Title of Book]</i>. [Publisher], [Year].",
      "[Brand Name.] “[Title of Ad].” <i>[Platform, e.g. YouTube]</i>, uploaded by [Uploader], [Day Month Year], [URL].",
      "[Author Last Name, First Name, and First Name Last Name.] “[Title of a Longer Source That Wraps onto a Second Line to Show the Hanging Indent].” <i>[Container Title]</i>, vol. [#], no. [#], [Year], pp. [#–#]. [Database], [DOI or URL].",
      "[Organization Name.] “[Title of Report or Page].” <i>[Website Name]</i>, [Day Month Year], [URL]. Accessed [Day Month Year].",
      "[Television Network.] <i>[Super Bowl Broadcast Title]</i>. [Network], [Day Month Year]."
    ]
  },

  /* ---------- Footer ---------- */
  footer: {
    text: "[Footer line, e.g. course, date, or acknowledgments]"
  },

  /* ---------- Interface labels ----------
     Button text and screen-reader labels. {brand}, {title}, {year}, {left},
     {right}, {leftPct}, {rightPct} are filled in automatically. */
  ui: {
    skipToContent: "Skip to main content",
    scrollCue: "Scroll",
    play: "Play both",
    pause: "Pause both",
    restart: "Restart",
    unmute: "Unmute {brand}",
    mute: "Mute {brand}",
    sliderLabel: "Comparison slider. Drag, or use the arrow keys, to reveal more of {left} or {right}.",
    sliderValue: "{leftPct}% {left}, {rightPct}% {right}",
    dividerLabel: "Panel divider. Drag, or use the arrow keys, to resize the {left} and {right} panels.",
    watchAd: "Watch the ad",
    watchAdLabel: "Watch {brand}, “{title}” ({year}). Opens in a new tab.",
    videoUnavailable: "Video not hosted on this page",
    linkPending: "Link coming soon",
    timelineRegion: "Timeline",
    timelinePrev: "Earlier",
    timelineNext: "Later"
  }
};
