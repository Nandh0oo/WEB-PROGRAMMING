# BrightPath Consulting — Corporate Website

A clean, modern, multi-page business website built strictly with **pure HTML5 and CSS3** (zero external frameworks, zero build tools, and zero JavaScript dependencies).

---

## 📁 Project Structure

```
brightpath-website/
├── index.html        # Home page (Hero, Why Us, Services Preview, Testimonials, CTA)
├── services.html     # Services page (Detailed 6-service grid, 4-step process methodology)
├── about.html        # About page (Company story, Mission/Vision/Values, Team, Achievements)
├── contact.html      # Contact page (Accessible inquiry form, hours, contact info, map box)
├── css/
│   └── style.css     # Single unified, responsive stylesheet with CSS custom properties
├── images/
│   └── brand-mark.svg# Standalone vector brand asset (site uses crisp inline SVGs & CSS gradients)
└── README.md         # Project documentation & customization guide
```

---

## 🚀 How to Open the Site

Because this site is built entirely with standard HTML5 and CSS3, **no server, build step, or Node.js runtime is required**.

1. Navigate to the `brightpath-website/` directory on your computer.
2. Double-click **`index.html`** (or right-click and choose **Open With > Google Chrome, Edge, Firefox, or Safari**).
3. All internal links (`Home`, `Services`, `About`, `Contact`, and CTA buttons) navigate seamlessly between pages using relative file paths.

---

## 🎨 How to Customize

### 1. Customizing Colors & Styling (`css/style.css`)
All design tokens are defined at the very top of `css/style.css` inside the `:root` pseudo-class. Modifying a variable instantly updates the entire site:

```css
:root {
  /* Brand Color Palette */
  --color-primary: #0f2b48;          /* Main dark navy corporate color */
  --color-primary-light: #1b4974;    /* Primary hover / gradient shade */
  --color-secondary: #0284c7;        /* Accent blue for links & highlights */
  --color-secondary-light: #e0f2fe;  /* Subtle blue background tint */
  --color-accent: #f59e0b;           /* Warm amber for CTA buttons & badges */
  --color-accent-hover: #d97706;     /* Darker amber hover state */

  /* Neutral Backgrounds & Text */
  --color-bg-light: #f8fafc;         /* Slate 50 page background */
  --color-bg-subtle: #f1f5f9;        /* Slate 100 section alternate background */
  --color-text-dark: #0f172a;        /* Heading text color */
  --color-text-body: #334155;        /* Body paragraph text color */
  
  /* Typography Scale */
  --font-family-base: 'Plus Jakarta Sans', system-ui, sans-serif;
}
```

### 2. Updating Business Copy & Contact Information
- **Company Address & Phone**: Located in the shared footer across all HTML files and in the sidebar of `contact.html`.
- **Services**: Each service card in `services.html` contains an icon, title, description, and bulleted features ready to be customized for your industry.
- **Team Members**: Located in `about.html` under the `#team-heading` section with customizable initials avatars and biographies.

---

## 📱 Mobile Responsiveness & Navigation

- **CSS-Only Responsive Menu**: The mobile hamburger menu operates via a pure CSS checkbox hack (`#nav-toggle`), requiring zero JavaScript.
- **Mobile-First Breakpoints**:
  - `576px`: Small devices & landscape orientation adjustments.
  - `768px`: Tablet multi-column layouts for services, team, and footer.
  - `992px`: Full desktop view with horizontal navigation bar.

---

## ♿ Accessibility & Standards Compliance

- **Semantic HTML5**: Utilizes `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<address>`, and `<footer>`.
- **Color Contrast**: Compliant with WCAG AA contrast standards.
- **Form Controls**: Fully labeled with `<label for="...">` and explicit `required` and `autocomplete` attributes.
- **Keyboard Navigation**: Distinct `:focus-visible` outlines on all interactive links, buttons, and form inputs.
