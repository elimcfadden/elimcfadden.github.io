# Eli Sports Analytics Website

A high-fidelity prototype website for a Web Design course final project. This is a clean, professional analytics portfolio site featuring data-driven insights for basketball and mountain sports.

## Project Overview

This static website demonstrates modern web design principles with semantic HTML5, responsive CSS, and interactive JavaScript features. The site includes three main pages: a landing page, a visualizations gallery, and an about/contact page.

## Site Structure

- **Home (index.html)**: Landing page with hero section, article previews, and call-to-action
- **Visualizations (visualizations.html)**: Gallery page with a table index and visualization cards
- **About (about.html)**: About section and contact form

## Folder Structure

```
eli-sports-analytics-site/
├── index.html              # Homepage
├── visualizations.html     # Visualizations page
├── about.html              # About/Contact page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── images/                 # Image assets folder
├── favicon.ico             # Site favicon
├── apple-touch-icon.png    # Apple touch icon
└── README.md               # This file
```

## Features

- **Semantic HTML5** structure with proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`
- **Responsive design** with mobile-first approach and media queries
- **Dark mode toggle** - Click the moon/sun icon in the header to toggle dark mode
- **Contact form** with client-side validation
- **Table** displaying visualization index
- **Professional styling** with modern card-based layouts
- **"You are here" navigation** indicator showing current page

## Getting Started

### Opening Locally

1. Download and extract the project files
2. Open `index.html` in your web browser
3. Navigate between pages using the navigation menu

### Replacing Placeholder Content

All placeholder content is clearly marked with brackets, such as:
- `[HERO TITLE PLACEHOLDER]`
- `[ARTICLE TITLE PLACEHOLDER]`
- `[IMAGE PLACEHOLDER]`
- `[ABOUT ME TEXT PLACEHOLDER]`

Simply search for these placeholders in the HTML files and replace them with your actual content.

### Adding Images

1. Place your image files in the `images/` folder
2. Update the HTML to reference your images:
   ```html
   <img src="images/your-image.jpg" alt="Description">
   ```
3. Replace `[IMAGE PLACEHOLDER]` sections with actual `<img>` tags

### Setting Up Google Analytics

1. Get your Google Analytics tracking code from your GA account
2. Open each HTML file (`index.html`, `visualizations.html`, `about.html`)
3. Find the comment `<!-- Google Analytics placeholder — replace with real GA code -->`
4. Replace the placeholder script with your actual Google Analytics code

### Customizing Icons

Replace the placeholder icon files:
- **favicon.ico**: Create a 16x16 or 32x32 pixel icon and save as `favicon.ico`
- **apple-touch-icon.png**: Create a 180x180 pixel PNG image for iOS devices

You can use online favicon generators or design tools to create these icons.

## Deploying to GitHub Pages

1. **Create a GitHub repository:**
   - Go to GitHub and create a new repository (e.g., `eli-sports-analytics-site`)
   - Do NOT initialize with README, .gitignore, or license

2. **Push your files to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/eli-sports-analytics-site.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "main" branch and "/ (root)" folder
   - Click "Save"
   - Your site will be available at `https://YOUR-USERNAME.github.io/eli-sports-analytics-site/`

## Technical Details

### CSS Selectors Used
- Element selectors (body, h1, p, a, etc.)
- Class selectors (.card, .button, .form-group, etc.)
- ID selectors (#hero, #articles, #contact-form, etc.)
- Contextual selectors (nav ul li a, .card h3, etc.)
- Anchor pseudo-classes in LVHA order (:link, :visited, :hover, :active)
- Grouped selectors (h1, h2, h3, h4)

### JavaScript Features
- Dark mode toggle with localStorage persistence
- Contact form validation and submission handling
- DOMContentLoaded event handling

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design tested for mobile, tablet, and desktop viewports

## Validation

Before submitting, validate your HTML and CSS:
- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/

## License

This project is created for educational purposes as part of a Web Design course final project.

## Author

Eli McFadden

---

**Note**: This is a prototype website with placeholder content. Replace all placeholder text and images with actual content before final submission.

