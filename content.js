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
    pageTitle: "Thirty Seconds of Silence",
    description: "How Super Bowl ads went from selling security to selling fast money, told through three pairs of commercials."
  },

  /* ---------- Hero (top of page) ---------- */
  hero: {
    kicker: "A Genre Experiment",
    title: "Thirty Seconds of Silence",
    subtitle: "Years of Super Bowl ads, and what they've been selling us about money",
    byline: "Tyler Rose, WRT 120, Duke University, Fall 2026"
  },

  /* ---------- Opening scene ---------- */
  opening: {
    kicker: "Super Bowl Sunday",
    heading: "",
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
      alt: "A chimp in an E*Trade shirt dances in a garage while two men clap off-beat."
    },
    pair1Right: {
      brand: "Coinbase",
      title: "QR Code",
      year: "2022",
      video: "https://www.youtube.com/watch?v=F90XcAzyzsQ",
      link: "https://adage.com/video/coinbase-qr-wagmi",
      poster: "",
      alt: "A color-changing QR code bounces around a black screen for sixty seconds."
    },
    pair2Left: {
      brand: "Ameriquest",
      title: "Surprise Dinner",
      year: "2005",
      video: "https://www.youtube.com/watch?v=0rur4loqAoY",
      link: "https://adage.com/videos/ameriquest-surprise-dinner/634",
      poster: "",
      alt: "A man cooking dinner is caught holding a knife and a sauce-covered cat when his wife walks in."
    },
    pair2Right: {
      brand: "FTX",
      title: "Don't Miss Out",
      year: "2022",
      video: "https://www.youtube.com/watch?v=hWMnbJJpeZc",
      link: "https://adage.com/video/ftx-an-idiot-through-history-sb-60s-embargoed/",
      poster: "",
      alt: "Larry David dismisses inventions through history, then dismisses FTX."
    },
    pair3Left: {
      brand: "MetLife",
      title: "Peanuts",
      year: "1986",
      video: "https://www.youtube.com/watch?v=m55keP1abeY",
      link: "https://clickamericana.com/topics/money-work/snoopy-peanuts-met-life-ads-1987",
      poster: "",
      alt: "Snoopy and the Peanuts gang promote MetLife insurance."
    },
    pair3Right: {
      brand: "Novig",
      title: "Just Sports",
      year: "2026",
      video: "https://www.youtube.com/watch?v=bp0T184hVY0",
      link: "https://novig.com/justsports",
      poster: "",
      alt: "Sydney Sweeney poses with sports equipment in an ad for the prediction market Novig."
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
      kicker: "Pair One: 2000 and 2022",
      heading: "",
      before: [
        "January 2000. The Rams are playing the Titans, and the stock market is bullish. A website that sells pet food has bought a Super Bowl ad, and so have sixteen other dot-com companies. E*Trade uses its airtime to put a chimp on screen, dancing in a garage while two guys clap off-beat. The ad drags out the awkwardness on purpose. The room laughs, confused, until the words appear: “Well, we just wasted two million bucks. What are you doing with your money?”",
        "The ad is mocking itself and every other dot-com in the lineup. Everyone is supposed to laugh, but almost nobody takes the hint. Six weeks later, the NASDAQ peaks. By the next Super Bowl, seven of the seventeen tech companies that advertised that night are out of business."
      ],
      left: "pair1Left",
      right: "pair1Right",
      caption: "",
      after: [
        "February 2022. The Rams are back in the Super Bowl, and so are the companies selling fast money, but this time it’s crypto. Coinbase, FTX, Crypto.com, and eToro have all bought time.",
        "Mid-game, the screen goes black. A QR code drifts across it, changing colors and bouncing off the edges like the old DVD screensaver.  This goes on for a full minute. There’s no voice, no actor, and no explanation. Scan the QR code and you get $15 in free Bitcoin. The site gets twenty million hits in one minute, and it crashes. Like the E*Trade chimp, the ad never explains what the company does. It only asks that you buy in. The next day, crypto prices drop and Coinbase shares fall with them. By November, FTX has collapsed. By the next Super Bowl, only one crypto company buys an ad."
      ]
    },
    {
      id: "pair-2",
      kicker: "Pair Two: 2005 and 2022",
      heading: "",
      before: [
        "February 2005. The Patriots are playing the Eagles, and home prices have been climbing for years. Ameriquest, a mortgage lender, is buying Super Bowl ad space for the first time. In one, a man is cooking a surprise dinner for his wife. The cat knocks over the pot of red sauce, and when his wife walks in, he’s holding the kitchen knife in one hand and a sauce-covered cat in the other. She screams. The words appear: “Don’t judge too quickly. We won’t.”",
        "It’s funny and both of Ameriquest’s ads that night make USA Today’s top ten. But “we won’t judge” is the business model. Ameriquest is a subprime lender, making home loans to people with weak credit who couldn’t get them elsewhere. After 2006, no subprime lender buys another Super Bowl ad. By 2007, Ameriquest stops making loans, and the housing market is collapsing."
      ],
      left: "pair2Left",
      right: "pair2Right",
      caption: "",
      after: [
        "February 2022. The same Crypto Bowl. FTX puts Larry David on screen, playing a skeptic through history. He waves off the wheel, the fork, and the lightbulb as bad ideas. Then someone pitches him FTX as a safe and easy way to get into crypto, and he says no to that too. The words appear: “Don’t be like Larry.”",
        "Seventeen years apart, the message is the same: the person asking the questions is the joke. Nine months later, FTX collapses, and its founder is later convicted of fraud amongst other things. Customers who trusted the safe and easy pitch lose their money, and Larry David is named in a class-action lawsuit over the ad. He later told the AP that he asked friends whether to do the ad, they said it was fine, “so, like an idiot, I did it.”"
      ]
    },
    {
      id: "pair-3",
      kicker: "Pair Three: 1986 and 2026",
      heading: "",
      before: [
        "Not every money ad airs during the Super Bowl, so this pair looks outside it. In 1985, MetLife starts putting Snoopy and the Peanuts gang in its commercials. Insurance companies had a reputation of being cold and distant, and a cartoon beagle was meant to change that. In one 1986 spot, Snoopy promises that in over a hundred years, MetLife has never failed to meet its obligations to its customers.",
        "That’s the whole pitch: no prize, no deadline, and no dare. The ad is selling the idea that MetLife will still be there in fifty years when you retire and need it."
      ],
      left: "pair3Left",
      right: "pair3Right",
      caption: "",
      after: [
        "September 2026. A prediction market called Novig launches an ad campaign starring Sydney Sweeney, wearing nothing but sports gear. It lets people bet on sports outcomes, and since the NFL bans prediction market ads, it can’t advertise during the game. So it goes to social media. The tagline: “Think you know sports? Prove it.”",
        "Female Olympians and athletes push back hard, and Novig’s CEO says the goal was to grab the nation’s attention, and that Sweeney, who owns a stake in the company, drove much of the ad’s visuals and messaging. MetLife used a familiar face to promise it would always be there. Novig uses one to dare you to bet that you’re right, today."
      ]
    }
  ],

  /* ---------- Timeline (appears between Pair 2 and Pair 3) ----------
     Add or remove entries freely; the layout adapts. */
  timeline: {
    kicker: "Twenty-Six Years",
    heading: "The Cycle",
    intro: [],
    entries: [
      { year: "2000", headline: "The Dot-Com Bowl.", text: "Dot-com companies buy 17 of the game's 36 ad spots." },
      { year: "2001", headline: "The Hangover.", text: "Only three dot-coms advertise, and E*Trade's chimp cries in a ghost town of failed websites." },
      { year: "2005", headline: "Subprime Arrives.", text: "Ameriquest, a subprime mortgage lender, runs its first Super Bowl ads." },
      { year: "2008", headline: "The Talking Baby.", text: "E*Trade debuts a baby trading stocks from his crib. The market crashes that fall." },
      { year: "2009", headline: "Cash for Gold.", text: "Ed McMahon, who had defaulted on his own mortgage, sells his jewelry for cash with MC Hammer in the top-ranked ad of the year. Hyundai offers to take back your car if you lose your job." },
      { year: "2012", headline: "Security Returns.", text: "MetLife buys its first Super Bowl ad, and in New York, Prudential airs a real widow talking about her first day of retirement." },
      { year: "2018", headline: "The Door Opens.", text: "The Supreme Court strikes down the federal ban on sports betting, 7 to 2, in Murphy v. NCAA." },
      { year: "2021", headline: "Betting Enters the Game.", text: "DraftKings runs its first Super Bowl ads. Robinhood tells viewers \"We are all investors,\" days after freezing GameStop purchases." },
      { year: "2022", headline: "The Crypto Bowl.", text: "Coinbase, FTX, Crypto.com, and eToro all advertise. USA Today's ad critic compares the flood of betting ads to the dot-com bubble." },
      { year: "2023", headline: "The Kick.", text: "FanDuel turns its ad into a live bet on a Gronkowski field goal. Only one crypto company advertises." },
      { year: "2025", headline: "The Line.", text: "The NFL bans prediction market ads and caps sportsbook ads at six per game." },
      { year: "2026", headline: "Quiet.", text: "Coinbase's only ad is a karaoke sing-along with no offer. FanDuel skips the game itself." }

    ]
  },

  /* ---------- Closing scene ---------- */
  closing: {
    kicker: "The Pattern",
    heading: "",
    paragraphs: [
      "Put the pairs side by side and a pattern appears. The ads selling fast money crowd the biggest stage right before the crash. Dot-coms flooded the 2000 game, and the NASDAQ peaked six weeks later. Ameriquest arrived in 2005, and the housing market collapsed two years after. Crypto took over in 2022, and FTX was gone by November. Each time, the next Super Bowl is quieter, and the ads selling security come back. After the 2008 housing crash, insurance companies like MetLife and Prudential bought time to talk about widows and retirement.",
      "So this isn’t a straight line from responsible to reckless. It’s a cycle. But the cycle has changed in one way that matters. In 2000, the dot-coms needed you to buy their stock. In 2005, Ameriquest needed you to take out a loan. Now, companies like FanDuel and Novig don’t need a bubble to make money from you. They just need you to keep betting.",
      "That shift was made possible by a court ruling. In 2018, the Supreme Court struck down the federal ban on sports betting, and within six years it was legal in most states. The NFL, which once sued to stop sports betting, now owns a stake in Genius Sports, a company that sells betting data. The league caps sportsbook ads at six per game and bans prediction market ads, citing a lack of safeguards, while profiting from betting itself.",
      "The ads are also leaving the commercial break. The American Gaming Association says betting ads made up less than half a percent of TV ad volume in 2024, and betting ads on TV were down 44% from 2021. But a University of Bristol study of the 2025 NBA and NHL finals counted over 6,000 instances of gambling marketing across 13 games, mostly on jerseys, rink boards, and signage. Watch almost any game now and the betting odds are built right into the score graphics, sometimes with a sportsbook’s logo next to them. The ad is no longer something you watch during the break. It’s part of the game.",
      "This year, the Super Bowl was quiet. Coinbase ran a karaoke sing-along with no offer, and FanDuel skipped the game itself. If the pattern holds true, that quiet means something. The question is whether it’s the quiet after a crash or the quiet before the next one. Back in the living room, the game comes back on. Everyone turns back to the field, and half of them pull out their phones to check their bets."
    ]
  },

  /* ---------- Works Cited (MLA) ----------
     One string per entry, already in alphabetical order. Use <i>...</i> for
     italic titles. The hanging indent is applied automatically. */
  worksCited: {
    heading: "Works Cited",
    entries: [
      "\"Betting on the Finals: Prevalence of Gambling Marketing in the NBA and NHL Finals 2025.\" University of Bristol, 26 Aug. 2025, <a href=\"https://research-information.bris.ac.uk/en/publications/betting-on-the-finals-prevalence-of-gambling-marketing-in-the-nba/\">research-information.bris.ac.uk/en/publications/betting-on-the-finals-prevalence-of-gambling-marketing-in-the-nba/</a>. Accessed 29 Sept. 2026.",
      "\"Larry David Addresses FTX Super Bowl Commercial: 'Like an Idiot, I Did It.'\" CBS News, via AOL, Jan. 2024, <a href=\"https://www.aol.com/larry-david-addresses-ftx-super-231621074.html\">www.aol.com/larry-david-addresses-ftx-super-231621074.html</a>. Accessed 29 Sept. 2026.",
      "\"MetLife Grounds Snoopy. Curse You, Red Baron!\" The Boston Globe, 20 Oct. 2016, <a href=\"https://www.bostonglobe.com/business/2016/10/20/metlife-grounds-snoopy-curse-you-red-baron/uxepXLaz0VUpHXx9pMPLlI/story.html\">www.bostonglobe.com/business/2016/10/20/metlife-grounds-snoopy-curse-you-red-baron/uxepXLaz0VUpHXx9pMPLlI/story.html</a>. Accessed 29 Sept. 2026.",
      "\"NFL Gets $450 Million in Genius Stock.\" Sportico, Apr. 2021, <a href=\"https://www.sportico.com/business/finance/2021/nfl-gets-450-million-in-genius-stock-1234626951/\">www.sportico.com/business/finance/2021/nfl-gets-450-million-in-genius-stock-1234626951/</a>. Accessed 29 Sept. 2026.",
      "\"No. 2 of the Subprime 25: Ameriquest Mortgage Co.\" Center for Public Integrity, 6 May 2009, <a href=\"https://publicintegrity.org/inequality-poverty-opportunity/no-2-of-the-subprime-25-ameriquest-mortgage-co-acc-capital-holdings-corp/\">publicintegrity.org/inequality-poverty-opportunity/no-2-of-the-subprime-25-ameriquest-mortgage-co-acc-capital-holdings-corp/</a>. Accessed 29 Sept. 2026.",
      "\"Novig CEO Says Sydney Sweeney Drove 'Visuals and Messaging' of Nude Ad.\" Front Office Sports, 15 Sept. 2026, <a href=\"https://frontofficesports.com/?p=249524\">frontofficesports.com/?p=249524</a>. Accessed 29 Sept. 2026.",
      "\"Sports Betting Ads Decline in Regulated Market, AGA Warns.\" SiGMA World, 2025, <a href=\"https://sigma.world/news/sports-betting-ads-regulated-market-aga-warns/\">sigma.world/news/sports-betting-ads-regulated-market-aga-warns/</a>. Accessed 29 Sept. 2026.",
      "\"Sydney Sweeney's Explicit Novig Ad Sparks Backlash from Female Athletes.\" Khaleej Times, 15 Sept. 2026, <a href=\"https://www.khaleejtimes.com/entertainment/sydney-sweeney-novig-ad-backlash-female-athletes\">www.khaleejtimes.com/entertainment/sydney-sweeney-novig-ad-backlash-female-athletes</a>. Accessed 29 Sept. 2026.",
      "\"2000: Dot-Com Bubble.\" Goldman Sachs, <a href=\"https://www.goldmansachs.com/our-firm/history/moments/2000-dot-com-bubble\">www.goldmansachs.com/our-firm/history/moments/2000-dot-com-bubble</a>. Accessed 29 Sept. 2026.",
      "Valinsky, Jordan. \"Coinbase's Strange QR-Code Super Bowl Ad Briefly Crashes App.\" CNN Business, via KRDO, 13 Feb. 2022, <a href=\"https://krdo.com/?p=725050\">krdo.com/?p=725050</a>. Accessed 29 Sept. 2026."

    ]
  },

  /* ---------- Footer ---------- */
  footer: {
    text: "Tyler Rose, WRT 120: Writing Crime, Dr. Jessica Corey, Duke University, Fall 2026",
    // Link shown in the footer. Leave url "" to hide it.
    reflectionLabel: "Reflection",
    reflectionUrl: "https://docs.google.com/document/d/1hWQi-1Tc92ccuUs_fbDbZbWQOLeS0mGcbIhmZKelp6I/edit?tab=t.0"
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
