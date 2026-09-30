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
      "Today is Super Bowl Sunday. My friends and coworkers are gathered in my living room half-watching the TV while reaching for the French onion dip. For about four hours, over 120 million people agree on one thing to watch. It’s the most-watched broadcast in America every year. Then the game stops, and something strange happens. Nobody gets up and the room goes quiet. Everyone turns toward the TV, because this is the one night a year Americans watch commercials on purpose.",
      "Companies know how big the Super Bowl is. They spend months and millions for thirty seconds. What they choose to say with it tells you what they think we want, and over the last twenty-five years what they’ve been selling us about money has changed."
    ]
  },

  /* ---------- Ads ----------
     Each ad has a short ID (the key, e.g. pair1Left). The pairs below refer
     to ads by that ID, so you can swap which ad appears where. */
  ads: {
    pair1Left: {
      brand: "E*Trade",
      title: "Monkey",
      year: "2000",
      video: "https://www.youtube.com/watch?v=qbBLDBohgrY",
      link: "https://www.youtube.com/watch?v=qbBLDBohgrY",
      poster: "",
      alt: "[Describe what happens on screen in Ad A.]"
    },
    pair1Right: {
      brand: "Coinbase",
      title: "QR Code",
      year: "2022",
      video: "videos/pair1-right.mp4",
      link: "https://adage.com/video/coinbase-qr-wagmi",
      poster: "",
      alt: "[Describe what happens on screen in Ad B.]"
    },
    pair2Left: {
      brand: "Ameriquest",
      title: "Surprise Dinner",
      year: "2005",
      video: "videos/pair2-left.mp4",
      link: "https://adage.com/videos/ameriquest-surprise-dinner/634",
      poster: "",
      alt: "[Describe what happens on screen in Ad C.]"
    },
    pair2Right: {
      brand: "FTX",
      title: "Don't Miss Out",
      year: "2022",
      video: "videos/pair2-right.mp4",
      link: "https://adage.com/video/ftx-an-idiot-through-history-sb-60s-embargoed/",
      poster: "",
      alt: "[Describe what happens on screen in Ad D.]"
    },
    pair3Left: {
      brand: "MetLife",
      title: "Peanuts",
      year: "1986",
      video: "videos/pair3-left.mp4",
      link: "https://clickamericana.com/topics/money-work/snoopy-peanuts-met-life-ads-1987",
      poster: "",
      alt: "[Describe what happens on screen in Ad E.]"
    },
    pair3Right: {
      brand: "Novig",
      title: "Just Sports",
      year: "2026",
      video: "videos/pair3-right.mp4",
      link: "https://novig.com/justsports",
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
        "January 2000. The Rams are playing the Titans, and the stock market is bullish. A website that sells pet food has bought a Super Bowl ad, and so have sixteen other dot-com companies. E*Trade uses its airtime to put a chimp on screen, dancing in a garage while two guys clap off-beat. The ad drags out the awkwardness on purpose. The room laughs, confused, until the words appear: “Well, we just wasted two million bucks. What are you doing with your money?”",
        "The ad is mocking itself and every other dot-com in the lineup. Everyone is supposed to laugh, but almost nobody takes the hint. Six weeks later, the NASDAQ peaks. By the next Super Bowl, seven of the seventeen tech companies that advertised that night are out of business."
      ],
      left: "pair1Left",
      right: "pair1Right",
      caption: "[Caption for comparison one]",
      after: [
        "February 2022. The Rams are back in the Super Bowl, and so are the companies selling fast money, but this time it’s crypto. Coinbase, FTX, Crypto.com, and eToro have all bought time.",
        "Mid-game, the screen goes black. A QR code drifts across it, changing colors and bouncing off the edges like the old DVD screensaver.  This goes on for a full minute. There’s no voice, no actor, and no explanation. Scan the QR code and you get $15 in free Bitcoin. The site gets twenty million hits in one minute, and it crashes. Like the E*Trade chimp, the ad never explains what the company does. It only asks that you buy in. The next day, crypto prices drop and Coinbase shares fall with them. By November, FTX has collapsed. By the next Super Bowl, only one crypto company buys an ad."
      ]
    },
    {
      id: "pair-2",
      kicker: "[Pair Two kicker]",
      heading: "[Pair Two Heading]",
      before: [
        "February 2005. The Patriots are playing the Eagles, and home prices have been climbing for years. Ameriquest, a mortgage lender, is buying Super Bowl ad space for the first time. In one, a man is cooking a surprise dinner for his wife. The cat knocks over the pot of red sauce, and when his wife walks in, he’s holding the kitchen knife in one hand and a sauce-covered cat in the other. She screams. The words appear: “Don’t judge too quickly. We won’t.”",
        "It’s funny and both of Ameriquest’s ads that night make USA Today’s top ten. But “we won’t judge” is the business model. Ameriquest is a subprime lender, making home loans to people with weak credit who couldn’t get them elsewhere. After 2006, no subprime lender buys another Super Bowl ad. By 2007, Ameriquest stops taking new loan applications, and the housing market is collapsing."
      ],
      left: "pair2Left",
      right: "pair2Right",
      caption: "[Caption for comparison two]",
      after: [
        "February 2022. The same Crypto Bowl. FTX puts Larry David on screen, playing a skeptic through history. He waves off the wheel, the fork, and the lightbulb as bad ideas. Then someone pitches him FTX as a safe and easy way to get into crypto, and he says no to that too. The words appear: “Don’t be like Larry.”",
        "Seventeen years apart, the message is the same: the person asking the questions is the joke. Nine months later, FTX collapses, and its founder is later convicted of fraud amongst other things. Customers who trusted the safe and easy pitch lose their money, and Larry David is named in a class-action lawsuit over the ad. He later told the AP that he asked friends whether to do the ad, and they said crypto was on the rise, “and like an idiot, I did.”"
      ]
    },
    {
      id: "pair-3",
      kicker: "[Pair Three kicker]",
      heading: "[Pair Three Heading]",
      before: [
        "Not every money ad airs during the Super Bowl, so this pair looks outside it. In 1985, MetLife starts putting Snoopy and the Peanuts gang in its commercials. Insurance companies had a reputation of being cold and distant, and a cartoon beagle was meant to change that. In one 1986 spot, Snoopy promises that in over a hundred years, MetLife has never failed to meet its obligations to its customers.",
        "That’s the whole pitch: no prize, no deadline, and no dare. The ad is selling the idea that MetLife will still be there in fifty years when you retire and need it."
      ],
      left: "pair3Left",
      right: "pair3Right",
      caption: "[Caption for comparison three]",
      after: [
        "September 2026. A prediction market called Novig launches an ad campaign starring Sydney Sweeney, wearing nothing but sports gear. It lets people bet on sports outcomes, and since the NFL bans prediction market ads, it can’t advertise during the game. So it goes to billboards in Times Square and other platforms. The tagline: “Think you know sports? Prove it.”",
        "Female Olympians and athletes push back hard, and Novig’s CEO confirms the campaign was meant to stir controversy. Sweeney also owns a stake in the company. MetLife used a familiar face to promise it would always be there. Novig uses one to dare you to bet that you’re right, today."
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
    heading: "What the Ads Tell Us",
    paragraphs: [
      "Put the pairs side by side and a pattern appears. The ads selling fast money crowd the biggest stage right before the crash. Dot-coms flooded the 2000 game, and the NASDAQ peaked six weeks later. Ameriquest arrived in 2005, and the housing market collapsed two years after. Crypto took over in 2022, and FTX was gone by November. Each time, the next Super Bowl is quieter, and the ads selling security come back. After the 2008 housing crash, insurance companies like MetLife and Prudential bought time to talk about widows and retirement.",
      "So this isn’t a straight line from responsible to reckless. It’s a cycle. But the cycle has changed in one way that matters. In 2000, the dot-coms needed you to buy their stock. In 2005, Ameriquest needed you to take out a loan. Now, companies like FanDuel and Novig don’t need a bubble to make money from you. They just need you to keep betting.",
      "That shift was made possible by a court ruling. In 2018, the Supreme Court struck down the federal ban on sports betting, and within six years it was legal in most states. The NFL, which once sued to stop sports betting, now owns a stake in Genius Sports, a company that sells betting data. The league caps sportsbook ads at six per game and bans prediction market ads, citing a lack of safeguards, while profiting from betting itself.",
      "The ads are also leaving the commercial break. The American Gaming Association says betting ads made up less than half a percent of TV ad volume in 2024, about half as many as in 2021. But a University of Bristol study of the 2025 NBA and NHL finals counted over 6,000 instances of gambling marketing across 13 games, mostly on jerseys, rink boards, and signage. Watch almost any game now and the betting odds are built right into the score graphics, sometimes with a sportsbook’s logo next to them. The ad is no longer something you watch during the break. It’s part of the game.",
      "This year, the Super Bowl was quiet. Coinbase ran a karaoke sing-along with no offer, and FanDuel skipped the game itself. If the pattern holds true, that quiet means something. The question is whether it’s the quiet after a crash or the quiet before the next one. Back in the living room, the game comes back on. Everyone turns back to the field, and half of them pull out their phones to check their bets."
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
