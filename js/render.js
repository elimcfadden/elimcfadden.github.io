/* ==========================================================================
   Shattered Backboard Analytics: rendering from the article data
   ==========================================================================
   Reads window.SBA_ARTICLES and fills in the parts of the site that are
   derived from it. Every hook is a data attribute on an empty container:

     data-stat-strip="latest"   the newest published article's stat strip
     data-stat-strip="<slug>"   that article's own stat strip
     data-latest-card           the homepage "The latest" featured card
     data-drafts-list           the homepage "In the works" numbered list
     data-article-index         the articles.html index rows
     data-footer-writing        the footer "Writing" links

   This file runs at the end of <body>, before main.js, so the markup it
   creates exists by the time main.js wires up scroll reveal and the rest.
   ========================================================================== */

(function () {
    'use strict';

    var articles = window.SBA_ARTICLES || [];

    var published = articles
        .filter(function (a) { return a.status === 'published'; })
        .sort(function (a, b) { return b.date.localeCompare(a.date); });

    var drafts = articles.filter(function (a) { return a.status === 'draft'; });

    var latest = published[0] || null;

    /* Escapes text going into an attribute. Body copy in the data file is
       allowed to carry entities like &ldquo;, so that goes in as markup. */
    function attr(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function dot() {
        return '<span class="dot" aria-hidden="true">&middot;</span>';
    }

    function thumb(article, className) {
        var t = article.thumbnail;
        return '<div class="' + className + (t.chart ? ' is-chart' : '') + '">' +
                   '<img src="' + attr(t.src) + '" alt="' + attr(t.alt) + '" ' +
                        'width="' + attr(t.width) + '" height="' + attr(t.height) + '" loading="lazy">' +
               '</div>';
    }

    /* ----------------------------------------------------------------------
       Stat strip
       The same component on the homepage and at the top of an article. The
       homepage asks for "latest"; an article page asks for itself by slug.
       ---------------------------------------------------------------------- */

    function renderStatStrip(host) {
        var key = host.getAttribute('data-stat-strip');
        var article = key === 'latest'
            ? latest
            : articles.filter(function (a) { return a.slug === key; })[0];

        if (!article || !article.statStrip) {
            host.remove();
            return;
        }

        var strip = article.statStrip;

        var cells = strip.stats.map(function (stat) {
            var value = stat.from !== undefined
                ? stat.from + ' <span class="to" aria-hidden="true">&rarr;</span> <span class="hi">' + stat.to + '</span>'
                : stat.value;
            return '<div class="stat">' +
                       '<p class="stat-value">' + value + '</p>' +
                       '<p class="stat-label">' + stat.label + '</p>' +
                   '</div>';
        }).join('');

        host.setAttribute('aria-label', article.topic + ' at a glance');
        host.innerHTML = '<div class="wrap">' +
                             '<div class="stat-grid">' + cells + '</div>' +
                             '<p class="stat-source">' + strip.source + '</p>' +
                         '</div>';
    }

    /* ----------------------------------------------------------------------
       Homepage: "The latest" featured card
       ---------------------------------------------------------------------- */

    function renderLatestCard(host) {
        if (!latest) { host.remove(); return; }

        host.className = 'lead-story reveal';

        /* The tag sits inside the figure, where the existing styles expect it,
           so this one does not reuse the shared thumb() helper. */
        host.innerHTML =
            '<a href="' + attr(latest.slug) + '">' +
                '<div class="lead-figure' + (latest.thumbnail.chart ? ' is-chart' : '') + '">' +
                    '<img src="' + attr(latest.thumbnail.src) + '" alt="' + attr(latest.thumbnail.alt) + '" ' +
                         'width="' + attr(latest.thumbnail.width) + '" height="' + attr(latest.thumbnail.height) + '">' +
                    '<span class="tag">' + attr(latest.tag) + '</span>' +
                '</div>' +
                '<div class="lead-body">' +
                    '<span class="eyebrow">' + attr(latest.topic) + '</span>' +
                    '<h3>' + attr(latest.title) + '</h3>' +
                    '<p class="lead-dek">' + attr(latest.description) + '</p>' +
                    '<p class="meta">' +
                        '<span class="byline-name">Eli McFadden</span>' + dot() +
                        '<span>' + attr(latest.readTime) + '</span>' + dot() +
                        '<span>' + attr(latest.kicker) + '</span>' +
                    '</p>' +
                '</div>' +
            '</a>';
    }

    /* ----------------------------------------------------------------------
       Homepage: "In the works" numbered list of drafts
       ---------------------------------------------------------------------- */

    function renderDrafts(host) {
        host.innerHTML = drafts.map(function (article, i) {
            var num = String(i + 1).padStart(2, '0');
            return '<li class="rail-item">' +
                       '<a href="' + attr(article.slug) + '">' +
                           '<span class="rail-num" aria-hidden="true">' + num + '</span>' +
                           '<div>' +
                               '<h4>' + attr(article.title) + '</h4>' +
                               '<p class="meta"><span>' + attr(article.kicker) + '</span> ' + dot() +
                                   ' <span>' + attr(article.topic) + '</span></p>' +
                           '</div>' +
                       '</a>' +
                   '</li>';
        }).join('');
    }

    /* ----------------------------------------------------------------------
       articles.html: the full index, published first then drafts
       ---------------------------------------------------------------------- */

    function renderIndex(host) {
        host.innerHTML = published.concat(drafts).map(function (article) {
            var isDraft = article.status === 'draft';
            var side = isDraft
                ? '<p class="meta"><span>' + attr(article.kicker) + '</span></p>'
                : '<p class="meta"><span class="byline-name">Eli McFadden</span>' + dot() +
                      '<span>' + attr(article.readTime) + '</span></p>';

            return '<li class="index-row' + (isDraft ? ' is-draft' : '') + ' reveal">' +
                       '<a href="' + attr(article.slug) + '">' +
                           thumb(article, 'index-thumb') +
                           '<div class="index-main">' +
                               '<span class="tag' + (isDraft ? ' muted' : '') + '">' + attr(article.tag) + '</span>' +
                               '<h3>' + attr(article.title) + '</h3>' +
                               '<p>' + attr(article.description) + '</p>' +
                           '</div>' +
                           '<div class="index-side">' +
                               side +
                               '<p class="meta"><span>' + attr(article.topic) + '</span></p>' +
                           '</div>' +
                       '</a>' +
                   '</li>';
        }).join('');
    }

    /* ----------------------------------------------------------------------
       Article page: the "Next up" cards, everything but the piece being read
       ---------------------------------------------------------------------- */

    function renderNextUp(host) {
        var here = location.pathname.split('/').pop();

        host.innerHTML = published.concat(drafts)
            .filter(function (article) { return article.slug !== here; })
            .map(function (article) {
                var isDraft = article.status === 'draft';
                return '<article class="card' + (isDraft ? ' is-draft' : '') + '">' +
                           '<a href="' + attr(article.slug) + '">' +
                               thumb(article, 'card-thumb') +
                               '<div class="card-body">' +
                                   '<span class="tag' + (isDraft ? ' muted' : '') + '">' + attr(article.tag) + '</span>' +
                                   '<h3>' + attr(article.title) + '</h3>' +
                                   '<p>' + attr(article.description) + '</p>' +
                                   '<p class="meta"><span>' + attr(article.kicker) + '</span> ' + dot() +
                                       ' <span>' + attr(article.topic) + '</span></p>' +
                               '</div>' +
                           '</a>' +
                       '</article>';
            }).join('');
    }

    /* ----------------------------------------------------------------------
       Footer: the "Writing" column
       ---------------------------------------------------------------------- */

    function renderFooterWriting(host) {
        host.innerHTML = published.concat(drafts).map(function (article) {
            return '<li><a href="' + attr(article.slug) + '">' + attr(article.shortTitle) + '</a></li>';
        }).join('');
    }

    /* ---------------------------------------------------------------------- */

    document.querySelectorAll('[data-stat-strip]').forEach(renderStatStrip);
    document.querySelectorAll('[data-latest-card]').forEach(renderLatestCard);
    document.querySelectorAll('[data-drafts-list]').forEach(renderDrafts);
    document.querySelectorAll('[data-article-index]').forEach(renderIndex);
    document.querySelectorAll('[data-next-up]').forEach(renderNextUp);
    document.querySelectorAll('[data-footer-writing]').forEach(renderFooterWriting);
}());
