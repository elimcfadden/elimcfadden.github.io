# Shattered Backboard Analytics - Technical Documentation

**Last Updated:** January 2025  
**Project Status:** Feature complete for class submission, actively maintained

---

## 1. Project Overview

**Shattered Backboard Analytics** is an NBA-focused visualization and opinion site built entirely with static HTML, CSS, and vanilla JavaScript. The site presents data-driven basketball analysis through clean visualizations and article-style breakdowns. The core philosophy is simple: share takes that might sound bold at first, but shouldn't be once the data is on the table.

The tech stack is intentionally minimal—no frameworks, no build tools, just semantic HTML, organized CSS, and progressive enhancement via JavaScript. This makes the site fast, maintainable, and easy to host on GitHub Pages or any static hosting service.

The user experience centers around a striking home page hero section with a "Do you really know ball?" call-to-action, a featured articles grid showcasing the main three-point shooting analysis, a visualizations gallery with click-to-enlarge lightbox functionality, and dedicated article pages that combine written analysis with embedded visualizations and social media content.

---

## 2. File & Folder Structure

```
eli-sports-analytics-site/
├── index.html                          # Home page with hero and featured articles
├── visualizations.html                 # Visualizations gallery with lightbox modal
├── three-point-article.html            # Canonical article page for 3PT analysis
├── about.html                          # About page with bio and site description
├── articles.html                       # Legacy articles page (not actively linked)
├── attendance-article.html              # Coming soon placeholder page
├── pace-offense-article.html           # Coming soon placeholder page
├── css/
│   └── styles.css                      # Single stylesheet with all site styles
├── js/
│   └── main.js                         # JavaScript for dark mode, modal, form handling
├── images/
│   ├── shattered-glass-hero.jpg       # Main hero background (home + headers)
│   ├── raymond-petrik-BXNe9EF35DE-unsplash.jpg  # Hero card background (home only)
│   ├── 3pt_viz.png                    # Three-point shooting visualization
│   ├── avghomeattendance_viz.png       # Average home attendance visualization
│   ├── offensiveratingvspacev_viz.png  # Offensive rating vs pace visualization
│   ├── broken-backboard-hero.jpg       # Legacy/unused image
│   └── header-backdrop.jpg             # Legacy/unused image
├── docs/
│   └── SHATTERED_BACKBOARD_DOCUMENTATION.md  # This file
├── favicon.ico                         # Site favicon
├── apple-touch-icon.png                # iOS home screen icon
└── README.md                           # Basic project readme

```

### Key Files Explained

- **index.html**: The landing page featuring the hero section, featured articles grid, and call-to-action. Uses `body#home` for CSS targeting.
- **visualizations.html**: Gallery page displaying all visualizations with click-to-enlarge modal functionality. Uses `body#visualizations`.
- **three-point-article.html**: The canonical article page for the three-point shooting analysis. Uses `body#three-point-article`. This is the **primary article** that multiple pages link to.
- **about.html**: About page with personal bio and site description. Contact email is embedded in the copy. Uses `body#about`.
- **css/styles.css**: Single-file stylesheet (~1,500 lines) containing all styles, organized by section with clear comment headers.
- **js/main.js**: Handles dark mode toggle, visualization modal, and form validation (though contact form was removed from about.html).

---

## 3. Pages and Their Responsibilities

### index.html (Home Page)

**Body ID:** `body#home`

**Structure:**
- **Header**: Site logo, navigation (Home, Visualizations, About), dark mode toggle. Header is transparent on home page, showing the hero shell background.
- **Hero Section** (`#hero`): Wrapped in `.home-hero-shell` div which provides the shattered-glass background image. Contains:
  - `.hero-text-content`: A card with dark background (using vertical backboard image) containing:
    - H2: "Do you really know ball?"
    - Subtitle: "The eye test is one thing, but sometimes the numbers tell a different story"
    - Body text: "Shattered Backboard Analytics breaks down NBA trends with simple, clean visuals to back up takes."
    - CTA button: "Explore Visualizations" linking to `visualizations.html`
- **Featured Articles Section** (`#featured-articles`): Grid of three article cards:
  - **Three-Point Article Card**: Links to `three-point-article.html` (canonical URL). Uses `3pt_viz.png` thumbnail.
  - **Attendance Article Card**: Links to `attendance-article.html` (coming soon placeholder).
  - **Pace/Offense Article Card**: Links to `pace-offense-article.html` (coming soon placeholder).
- **CTA Section** (`#cta`): Simple call-to-action with links to About and Visualizations pages.
- **Footer**: Copyright and contact link.

**Key CSS Classes:**
- `.home-hero-shell`: Wrapper for header + hero with shattered-glass background
- `.hero-text-content`: The card containing hero text, uses backboard image background
- `.card-link-wrap`: Makes entire article card clickable
- `.card-thumb`: Thumbnail images in article cards

### visualizations.html (Visualizations Gallery)

**Body ID:** `body#visualizations`

**Structure:**
- **Header**: Same structure as home page, but header has its own shattered-glass background (not transparent).
- **Page Header Section** (`#page-header`): Title and intro text ("All visualizations made by Eli McFadden").
- **Visualization Index Table** (`#visualizations-table`): Table listing all three visualizations with links:
  - Three-Point viz: Links to `three-point-article.html` (must match home page canonical URL)
  - Attendance viz: Links to `#attendance-viz` (anchor on same page)
  - Pace/Offense viz: Links to `#pace-viz` (anchor on same page)
- **Visualizations Gallery** (`#visualizations-gallery`): Grid of visualization cards:
  - Each card contains an image with `.viz-image` class (enables lightbox)
  - Images are wrapped in `<figure>` with `<figcaption>`
  - Cards have `.viz-card` and `.card` classes
- **Modal/Lightbox** (`#viz-modal`): Hidden modal that opens when clicking `.viz-image` elements. Contains backdrop, close button, image, and caption.

**Key CSS Classes:**
- `.viz-image`: Applied to visualization images to enable click-to-enlarge
- `.viz-modal`: The modal container (hidden by default, shown with `.is-open` class)
- `.viz-modal-backdrop`: Dark overlay behind modal content
- `.viz-modal-content`: Container for modal image and caption

**Important:** The "View Article" link for the three-point visualization in the table **must** point to `three-point-article.html` to match the home page featured card.

### three-point-article.html (Canonical Article Page)

**Body ID:** `body#three-point-article`

**Structure:**
- **Header**: Same as other pages, with shattered-glass background.
- **Main Content** (`.article-layout`): Two-column layout:
  - **Article Column** (`.article-content`): Full article text about three-point shooting evolution.
  - **Sidebar** (`.article-sidebar`): Contains:
    - **Three Point Viz Section**: Image (`3pt_viz.png`) with caption "Clear spike in three-point attempts following Steph Curry's first All-Star appearance."
    - **Featured Clip Section**: Embedded Twitter/X post about Steph Curry (requires Twitter widget script).

**Key CSS Classes:**
- `.article-layout`: Flexbox container for two-column layout
- `.article-content`: Main article text column
- `.article-sidebar`: Sidebar with visualization and social media embed

**Placeholders Still Present:**
- Meta description: `[3PT ARTICLE DESCRIPTION PLACEHOLDER]`
- Meta keywords: `[KEYWORDS PLACEHOLDER]`

**Important:** This is the **canonical article URL** (`three-point-article.html`). All links to the three-point article must point here.

### about.html (About Page)

**Body ID:** `body#about`

**Structure:**
- **Header**: Same structure, with shattered-glass background.
- **About Section** (`#about-section`): Two articles:
  - **About Me**: Personal bio mentioning graduation from Utah State University, degree in Information Systems with Data Engineering emphasis, minor in Data Analytics.
  - **About Shattered Backboard Analytics**: Site description explaining it's NBA-only, built on analysis, backed by visualizations. Mentions Tableau, future plans for Power BI/SQL/Python. Includes contact email: `eli.bball3@gmail.com`.

**Note:** The contact form section was removed. Contact is now handled via email address in the copy.

---

## 4. Styling & Layout System

### CSS Organization (css/styles.css)

The stylesheet is organized into clear sections with comment headers:

1. **CSS Reset & Base Styles**: Universal reset, base typography, element defaults
2. **Anchor Pseudo-classes**: Link styling (LVHA order)
3. **Header & Navigation**: Global header styles, then page-specific overrides
4. **Home Page Hero**: Special handling for `.home-hero-shell` and hero card
5. **Non-Home Page Headers**: Shattered-glass background for other pages
6. **Layout Components**: Cards, grids, buttons, forms
7. **Article Layout**: Two-column article page styles
8. **Visualization Styles**: Gallery and modal styles
9. **Footer**: Site footer styling
10. **Dark Mode Styles**: Theme-specific overrides
11. **Responsive Media Queries**: Mobile breakpoints

### Key Styling Patterns

#### Home Page Header + Hero Background

The home page uses a unique structure:

```html
<body id="home">
  <div class="home-hero-shell">
    <header>...</header>
    <section id="hero">...</section>
  </div>
</body>
```

**CSS Implementation:**
- `.home-hero-shell`: Sets `shattered-glass-hero.jpg` as background, covers full header + hero area
- `body#home header`: Has `background: none` so it's transparent, showing the shell background
- `body#home #hero`: Positioned relative with z-index to sit above background

**Result:** The shattered-glass image appears behind both header and hero as one unified visual element.

#### Hero Card Background (Home Page Only)

The `.hero-text-content` card on the home page has its own background:

```css
body#home #hero .hero-text-content {
    background-image:
        linear-gradient(to bottom right, rgba(5, 10, 25, 0.80), rgba(5, 10, 25, 0.55)),
        url("../images/raymond-petrik-BXNe9EF35DE-unsplash.jpg");
    /* ... */
}
```

**Key Points:**
- Uses vertical backboard image (`raymond-petrik-BXNe9EF35DE-unsplash.jpg`)
- Dark gradient overlay (rgba(5, 10, 25)) for text readability
- Only applies to home page hero card
- Text color is `#ffffff` with dark text shadow

#### Non-Home Page Headers

Other pages (visualizations, about, article) use the shattered-glass image only in the header bar:

```css
body#visualizations header,
body#about header,
body#three-point-article header {
    background-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
        url("../images/shattered-glass-hero.jpg");
    /* ... */
}
```

**Key Points:**
- Same shattered-glass image, but only in header (not full-page)
- Subtle dark overlay (rgba(0, 0, 0, 0.15)) for text readability
- Header text is white (`#ffffff`) with dark text shadow
- No white/gray overlay that washes out the image

#### Header Text Color Override (Home Page)

The home page header text is explicitly set to white in both light and dark modes:

```css
body#home header .site-logo h1 {
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

body#home header nav a {
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}
```

This ensures consistency with other pages and readability on the image background.

### Responsive Behavior

**Breakpoints:**
- `@media screen and (max-width: 768px)`: Tablet and below
- `@media screen and (max-width: 480px)`: Mobile

**Responsive Changes:**
- Grid layouts switch to single column
- Typography scales down (h1: 2rem → 1.5rem on mobile)
- Padding/margins reduce
- Table becomes scrollable or simplified
- Hero card adjusts padding and max-width
- Modal adapts to smaller viewports (90vw max-width)

---

## 5. JavaScript Behavior (main.js)

### Dark Mode Toggle

**Implementation:**
- Toggles `.dark-mode` class on `<body>` element
- Stores preference in `localStorage` as `'enabled'` or `'disabled'`
- Updates button emoji: 🌙 (light mode) ↔ ☀️ (dark mode)
- On page load, checks localStorage and applies saved preference

**Key Code:**
```javascript
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const darkMode = localStorage.getItem('darkMode') === 'enabled';

if (darkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    // Save to localStorage...
});
```

**What Changes:**
- Background colors (light: `#f5f5f5` → dark: `#1a1a1a`)
- Text colors (light: `#333` → dark: `#e0e0e0`)
- Header backgrounds (light: white overlay → dark: darker overlay)
- **Important:** Background images (shattered-glass, backboard) remain constant in both themes

### Visualization Modal/Lightbox

**Target Elements:**
- All images with `.viz-image` class (currently only on `visualizations.html`)

**Modal Structure:**
- `#viz-modal`: Container (hidden by default)
- `.viz-modal-backdrop`: Dark overlay
- `.viz-modal-content`: Content wrapper
- `#viz-modal-image`: Image element
- `#viz-modal-caption`: Caption text
- `.viz-modal-close`: Close button (×)

**Behavior:**
- Click on `.viz-image` → Opens modal, sets image src/alt, sets caption from alt text
- Click close button → Closes modal
- Click backdrop → Closes modal
- Press Escape key → Closes modal
- Cursor changes to `zoom-in` on `.viz-image` hover

**Key Code:**
```javascript
const vizImages = document.querySelectorAll('.viz-image');
vizImages.forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openModal(img));
});
```

**Safety:** All modal code is wrapped in existence checks (`if (modal && modalImage && ...)`) so it fails gracefully on pages without the modal.

### Contact Form Handling (Legacy)

**Note:** The contact form was removed from `about.html`, but the JavaScript handler remains in `main.js` for potential future use or other pages.

**Implementation:**
- Listens for form submission on `#contact-form`
- Validates required fields (name, email, topic, message)
- Validates email format with regex
- Shows success/error messages in `#form-status`
- Resets form after 5 seconds

---

## 6. Theming (Light/Dark Mode)

### How Theming Works

**Toggle Mechanism:**
- Clicking the dark mode toggle button (🌙/☀️) adds/removes `.dark-mode` class on `<body>`
- Preference is saved to `localStorage` and restored on page load

### What Changes Between Themes

**Text & Backgrounds:**
- Body background: `#f5f5f5` (light) → `#1a1a1a` (dark)
- Body text: `#333` (light) → `#e0e0e0` (dark)
- Headings: `#2c3e50` (light) → `#fff` (dark)
- Links: Blue shades (light) → Lighter blue shades (dark)

**Header Behavior:**
- Light mode: Header has white/gray overlay on non-home pages (legacy, overridden)
- Dark mode: Header has darker overlay
- **Important:** Header background images remain constant

### Critical Design Decision: Background Images Stay Constant

**The shattered-glass and backboard images do NOT change between themes.** This was an intentional design choice:

- **Home Page:** `.home-hero-shell` background (shattered-glass) remains the same
- **Home Page Hero Card:** `.hero-text-content` background (backboard image) remains the same
- **Other Pages:** Header background (shattered-glass) remains the same

**Only text and UI element colors change.** This ensures:
- Visual consistency
- Image quality isn't degraded by filters
- The site maintains its distinctive visual identity

### Header Text Color Override

To ensure readability on image backgrounds, header text is explicitly set to white:

```css
/* Home page header text - always white */
body#home header .site-logo h1,
body#home header nav a {
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

/* Non-home pages header text - always white */
body#visualizations header .site-logo h1,
body#about header .site-logo h1,
body#three-point-article header .site-logo h1 {
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}
```

This override ensures header text is readable in both light and dark modes.

---

## 7. Article & Visualization Linking Strategy

### Canonical Article URL

**The canonical three-point article page is:**
```
three-point-article.html
```

### Links That Must Point to Canonical URL

1. **Home Page Featured Card** (`index.html`):
   ```html
   <a href="three-point-article.html" class="card-link-wrap">
   ```

2. **Visualizations Page Table** (`visualizations.html`):
   ```html
   <td><a href="three-point-article.html">View Article</a></td>
   ```

**Rule:** Any link intended to open the three-point article must use `three-point-article.html`. Do not create alternate routes or duplicate article pages.

### Coming Soon Articles

**Attendance Article:**
- File: `attendance-article.html`
- Linked from: Home page featured card
- Status: Placeholder page with "coming soon" content

**Pace/Offense Article:**
- File: `pace-offense-article.html`
- Linked from: Home page featured card
- Status: Placeholder page with "coming soon" content

### Rules for Adding a New Article

1. **Create HTML File:**
   - Place in root directory (e.g., `new-article.html`)
   - Use `body#new-article` ID for CSS targeting
   - Follow structure of `three-point-article.html` (header, main with article layout, footer)

2. **Update Links:**
   - Add featured card to `index.html` (if it should appear on home page)
   - Add entry to `visualizations.html` table (if it has a visualization)
   - Add visualization card to `visualizations.html` gallery (if applicable)

3. **Consistency:**
   - Use same header/footer structure
   - Apply same CSS classes (`.article-layout`, `.article-content`, `.article-sidebar`)
   - Keep body ID pattern: `body#[article-name]`

4. **Image References:**
   - Place visualization images in `images/` folder
   - Use descriptive filenames (e.g., `new-viz.png`)
   - Reference with relative path: `images/new-viz.png`

---

## 8. Image & Asset Usage

### Key Images and Their Roles

#### shattered-glass-hero.jpg
**Usage:**
- **Home Page:** Full background for `.home-hero-shell` (covers header + hero area)
- **Other Pages:** Background for header bar only (visualizations, about, article pages)

**CSS References:**
```css
/* Home page */
body#home .home-hero-shell {
    background-image: url("../images/shattered-glass-hero.jpg");
}

/* Other pages */
body#visualizations header,
body#about header,
body#three-point-article header {
    background-image: url("../images/shattered-glass-hero.jpg");
}
```

**Important:** This image remains constant in both light and dark modes.

#### raymond-petrik-BXNe9EF35DE-unsplash.jpg
**Usage:**
- **Home Page Only:** Background for `.hero-text-content` card (the dark card containing "Do you really know ball?")

**CSS Reference:**
```css
body#home #hero .hero-text-content {
    background-image:
        linear-gradient(to bottom right, rgba(5, 10, 25, 0.80), rgba(5, 10, 25, 0.55)),
        url("../images/raymond-petrik-BXNe9EF35DE-unsplash.jpg");
}
```

**Important:** This image is only used on the home page hero card, with a dark gradient overlay for text readability.

#### Visualization Images

**3pt_viz.png:**
- Appears on: `three-point-article.html` (sidebar), `index.html` (featured card thumbnail)
- Alt text: "Line chart showing three point attempts and makes over the years"
- Caption: "Clear spike in three-point attempts following Steph Curry's first All-Star appearance."

**avghomeattendance_viz.png:**
- Appears on: `visualizations.html` (gallery card), `index.html` (featured card thumbnail)
- Alt text: "Bar chart showing average home attendance by NBA team from 2001 to 2017"
- Has `.viz-image` class for lightbox functionality

**offensiveratingvspacev_viz.png:**
- Appears on: `visualizations.html` (gallery card), `index.html` (featured card thumbnail)
- Alt text: "Line chart showing offensive rating and pace over seasons, highlighting their correlation"
- Has `.viz-image` class for lightbox functionality

### Image Placement Conventions

**Where to Place New Images:**
- All images go in the `images/` folder
- Use descriptive, lowercase filenames with hyphens (e.g., `new-visualization.png`)
- Keep file sizes reasonable for web (optimize before committing)

**How to Reference Images:**

**In HTML:**
```html
<img src="images/filename.png" alt="Descriptive alt text">
```

**In CSS:**
```css
background-image: url("../images/filename.jpg");
/* Note: ../ because CSS is in css/ folder, images are in images/ folder */
```

**Alt Text Guidelines:**
- Always include descriptive alt text
- Describe what the visualization shows, not just "chart" or "graph"
- Include relevant context (time period, data source if relevant)

---

## 9. How to Safely Extend the Site

### Adding a New Visualization

**Steps:**

1. **Add Image File:**
   - Place visualization image in `images/` folder
   - Use descriptive filename (e.g., `new-stat-viz.png`)

2. **Add to Visualizations Page:**
   ```html
   <div id="new-viz" class="viz-card card">
       <figure class="viz-figure">
           <img src="images/new-stat-viz.png"
                alt="Description of what the visualization shows"
                class="viz-image">
           <figcaption>Visualization Title</figcaption>
       </figure>
       <div class="card-content">
           <h4>Visualization Title</h4>
       </div>
   </div>
   ```
   - Add `.viz-image` class to enable lightbox
   - Add entry to visualization index table

3. **Optional: Link to Article:**
   - If you create an article page, link to it from the visualization card
   - Update the table "Link" column

### Adding a New Article

**Steps:**

1. **Create HTML File:**
   - Copy `three-point-article.html` as a template
   - Rename to descriptive filename (e.g., `new-article.html`)
   - Update body ID: `<body id="new-article">`

2. **Update Content:**
   - Replace article text in `.article-content`
   - Update sidebar visualization if needed
   - Update meta tags (title, description, keywords)

3. **Update Links:**
   - Add featured card to `index.html` (if it should appear on home)
   - Add entry to `visualizations.html` table
   - Ensure all links use the same canonical filename

4. **CSS Targeting:**
   - Add header styles if needed:
   ```css
   body#new-article header {
       /* Same as other non-home pages */
   }
   ```

### Adjusting Hero Content

**To Change Hero Text:**
- Edit `index.html` in `.hero-text-content` section:
  - H2: "Do you really know ball?"
  - Subtitle: `.hero-subtitle` paragraph
  - Body text: `.hero-text` paragraph
  - Button: Link and text in `.button.primary`

**To Adjust Hero Layout:**
- CSS classes:
  - `.home-hero-shell`: Controls full hero area background
  - `.hero-content`: Flexbox container for hero layout
  - `.hero-text-content`: The card with backboard background
  - `.hero-image-container`: Currently empty, image moved to CSS background

**Important:** Do not remove `.home-hero-shell` wrapper or change its background image without understanding the full header+hero integration.

### Modifying Shared Components

**Header:**
- Changes to header HTML/CSS affect **all pages**
- Test on home page (transparent header) and other pages (image background header)
- Ensure header text remains readable (white with text shadow)

**Footer:**
- Changes affect all pages
- Currently simple copyright and contact link

**Navigation:**
- Update nav links in all HTML files consistently
- Use `.current` class to indicate active page
- Ensure all pages have same nav structure

**Dark Mode:**
- Changes to dark mode styles affect all pages
- Remember: background images stay constant, only text/UI colors change
- Test both themes after making changes

---

## 10. Known Limitations / Technical Debt

### Hard-Coded Content

- **Article Meta Descriptions:** `three-point-article.html` still has placeholder meta description and keywords
- **Coming Soon Articles:** `attendance-article.html` and `pace-offense-article.html` are placeholder pages
- **Featured Article Cards:** Two of three featured cards on home page link to "coming soon" pages

### Static Site Limitations

- **No Backend:** All content is static HTML. No dynamic data, no database, no server-side processing
- **No Real Form Submission:** Contact form was removed, but if re-added, would need backend integration
- **No Content Management:** All content updates require editing HTML files directly

### Accessibility Considerations

- **Modal Accessibility:** The visualization modal has basic ARIA attributes (`aria-hidden`, `aria-label`) but could be improved:
  - Focus trap when modal is open
  - Focus return to trigger element on close
  - Screen reader announcements
- **Keyboard Navigation:** Generally good, but modal could trap focus better
- **Color Contrast:** Text on image backgrounds relies on text shadows for readability—should verify WCAG compliance

### Quick Fixes / Overrides

- **Header Text Color:** Explicit white color override for home page header to ensure readability (could be more elegant)
- **Legacy Images:** `broken-backboard-hero.jpg` and `header-backdrop.jpg` exist but are unused (could be cleaned up)
- **Legacy Articles Page:** `articles.html` exists but is not linked from navigation (could be removed or repurposed)

### Browser Compatibility

- **Modern CSS Features:** Uses `inset`, flexbox, CSS Grid—may not work in very old browsers
- **JavaScript:** Uses modern JS (arrow functions, `querySelectorAll`)—may need polyfills for IE11 if support required
- **LocalStorage:** Dark mode preference relies on localStorage—gracefully degrades if unavailable

---

## 11. AI Usage Notes & Guidance

### Critical Rules for AI Assistants

**When making changes, always preserve the body IDs (e.g., `body#home`, `body#visualizations`), because CSS and JS depend on them.**

The site uses body IDs extensively for page-specific styling:
- `body#home`: Special hero shell background, transparent header
- `body#visualizations`: Header with shattered-glass background, white text
- `body#about`: Same as visualizations
- `body#three-point-article`: Same as visualizations

**Do not change the canonical 3PT article URL without updating all links described in section 7.**

The canonical article is `three-point-article.html`. Links exist in:
- `index.html` (featured card)
- `visualizations.html` (table)

If you rename or move this file, update all references.

**When adjusting styles, be careful not to add global rules that break the header/hero image behavior described in sections 4 and 6.**

The header and hero backgrounds are carefully orchestrated:
- Home page: `.home-hero-shell` provides background, header is transparent
- Other pages: Header has its own background image
- Background images remain constant in light/dark modes

Adding global `header` styles could break this.

**Before refactoring, review this document to understand how the header image, hero card image, and theming work together.**

These are interconnected systems. Changing one affects the others.

### Checklist for Future AI Assistants

**Before Making Changes:**

- [ ] Read this documentation file completely
- [ ] Understand which page you're modifying (check body ID)
- [ ] Identify if change affects shared components (header, footer, CSS, JS)
- [ ] Check if change affects canonical article links
- [ ] Verify image paths are correct (relative to CSS file location)

**When Adding Features:**

- [ ] Follow existing naming conventions (body IDs, CSS classes)
- [ ] Update links consistently across all pages
- [ ] Test in both light and dark modes
- [ ] Ensure background images remain constant (don't add theme-specific image filters)
- [ ] Add appropriate alt text for new images

**When Modifying Styles:**

- [ ] Check if change affects home page hero shell behavior
- [ ] Verify header text remains readable (white with shadow on image backgrounds)
- [ ] Test responsive behavior at mobile breakpoints
- [ ] Ensure dark mode styles don't override background images

**When Updating Content:**

- [ ] Update meta tags (title, description) consistently
- [ ] Keep article structure consistent with `three-point-article.html`
- [ ] Maintain navigation consistency across all pages
- [ ] Update this documentation if adding new patterns or conventions

### Common Pitfalls to Avoid

1. **Changing body IDs:** This breaks CSS targeting
2. **Adding global header styles:** This breaks the home page transparent header
3. **Filtering background images in dark mode:** Images should stay constant
4. **Creating duplicate article pages:** Use canonical URL consistently
5. **Forgetting to update multiple links:** Home page and visualizations page must link to same article
6. **Breaking relative image paths:** CSS uses `../images/`, HTML uses `images/`

### Questions to Ask Before Major Changes

- Does this affect the home page hero shell?
- Does this change how background images work?
- Will this break the dark mode behavior?
- Are there multiple places that link to this article/page?
- Does this require updating the body ID or CSS selectors?

---

## Conclusion

This documentation is intended to be a living document. As the site evolves, update this file to reflect new patterns, conventions, and architectural decisions. When in doubt, refer to the existing code and this documentation to maintain consistency and avoid breaking existing functionality.

**Remember:** The site's visual identity is built on the careful integration of background images, hero layouts, and theming. Changes to these systems should be made thoughtfully and tested thoroughly.

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Maintained By:** Eli McFadden

