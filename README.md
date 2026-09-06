# Shattered Backboard Analytics

NBA writing backed by the numbers, by Eli McFadden.

A static site (HTML/CSS/JS, no build step) published with GitHub Pages.

## Structure

- `index.html`: front page. Hero, three-point stat strip, lead story, project intro.
- `articles.html`: full article index.
- `three-point-article.html`: feature article.
- `attendance-article.html`, `pace-offense-article.html`: drafts with finished charts.
- `about.html`: about the project.
- `css/styles.css`: the whole design system (tokens, layout, components).
- `js/main.js`: theme toggle, mobile nav, reading progress, chart lightbox, scroll reveal.

## Notes

- Dark is the default theme; the toggle stores a light preference in `localStorage`.
- Charts are light-background exports, so they are framed on white panels on purpose.
- Run it locally with any static server, e.g. `python -m http.server`.
