/* ==========================================================================
   Shattered Backboard Analytics: article data
   ==========================================================================
   The single source of truth for every article on the site. Nothing about an
   article is written into a page by hand. These entries drive:

     - the homepage "The latest" card        (newest entry with status published)
     - the homepage "In the works" list      (entries with status draft)
     - the stat strip on the homepage        (newest published entry's stats)
     - the stat strip on an article page     (that article's own stats)
     - the articles.html index
     - the "Writing" column in every footer

   Publishing an article is a one word change: set status to "published".

   Fields
     title       full headline
     shortTitle  the label used in the footer "Writing" column
     slug        page filename, also the id used by data-stat-strip
     topic       subject line shown in metadata
     description short blurb for the cards and the index
     readTime    e.g. "4 min read", or null while a piece is still a draft
     date        ISO date, newest published entry wins "The latest"
     status      "published" or "draft"
     thumbnail   { src, alt, width, height, chart } chart letterboxes on white
     statStrip   { source, stats: [...] } source credits the chart the numbers
                 were read from. Each stat is either
                   { from, to, label }  rendered as "from -> to"
                   { value, label }     rendered on its own
   ========================================================================== */

window.SBA_ARTICLES = [
    {
        title: 'Three point shooting changed the game, for better and worse',
        shortTitle: 'Three-point shooting',
        slug: 'three-point-article.html',
        topic: 'Three-point shooting',
        description: 'Spacing was supposed to unlock easier offense. A lot of the league skipped straight to the pull-up instead, and the chart shows exactly when the shift happened.',
        readTime: '4 min read',
        date: '2025-12-06',
        status: 'published',
        tag: 'Feature',
        kicker: 'Analysis',
        thumbnail: {
            src: 'images/3pt_viz.png',
            alt: 'Line chart showing league three-point attempts and makes per game climbing sharply after 2012',
            width: 1146,
            height: 854,
            chart: true
        },
        statStrip: {
            source: 'Read from the &ldquo;Three-point attempts and makes over the years&rdquo; chart, 1979&ndash;80 through 2022&ndash;23.',
            stats: [
                { from: '2.5', to: '34.2', label: 'Threes attempted per game' },
                { from: '0.3', to: '12.3', label: 'Threes made per game' },
                { value: '35.2', label: 'Peak attempts, 2021&ndash;22' },
                /* 1979-80 through 2022-23 inclusive of both end seasons. */
                { value: '44', label: 'Seasons charted' }
            ]
        }
    },
    {
        title: 'What average home attendance says about a franchise',
        shortTitle: 'Home attendance',
        slug: 'attendance-article.html',
        topic: 'Attendance',
        description: 'Attendance by team from 2001 to 2017 is charted. The write-up that explains which buildings actually fill up, and why, is still being worked on.',
        readTime: null,
        date: '2025-12-06',
        status: 'draft',
        tag: 'In progress',
        kicker: 'Draft',
        thumbnail: {
            src: 'images/avghomeattendance_viz.png',
            alt: 'Bar chart of average home attendance by NBA team',
            width: 1146,
            height: 854,
            chart: true
        },
        statStrip: null
    },
    {
        title: 'Pace and offensive rating do not move the way you think',
        shortTitle: 'Pace and offense',
        slug: 'pace-offense-article.html',
        topic: 'Team performance',
        description: 'Playing fast and scoring efficiently get treated as the same thing. The chart is built; the argument about where they actually separate is still in progress.',
        readTime: null,
        date: '2025-12-06',
        status: 'draft',
        tag: 'In progress',
        kicker: 'Draft',
        thumbnail: {
            src: 'images/offensiveratingvspacev_viz.png',
            alt: 'Line chart comparing offensive rating and pace across seasons',
            width: 1146,
            height: 854,
            chart: true
        },
        statStrip: null
    }
];
