# Website Design Guidelines

This document defines the design rules for the website.

The website represents a personal furry profile and focuses on:

- introducing the fursona
- listing events attended
- linking social media profiles

The design must remain simple, friendly and accessible.

---

# 1. Color Identity

Green is the primary color of the website.

Recommended palette:

Primary: #2e7d32  
Light: #60ad5e  
Dark: #005005

Green should be used for:

- buttons
- links
- highlights
- navigation states

Backgrounds should remain neutral.

---

# 2. Dark Mode

The site should support light and dark mode.

Requirements:

- visible toggle in navigation
- theme preference stored in localStorage
- default follows system preference

Themes must use CSS variables.

---

# 3. Layout

Maximum content width:

1200px

Content must be centered.

Spacing must follow the spacing tokens defined in design-tokens.css.

---

# 4. Typography

Preferred font stack:

Inter, system-ui, sans-serif

Rules:

- clear heading hierarchy
- readable body text
- avoid overly thin fonts

---

# 5. Navigation

Navigation must use semantic HTML.

Example:

<nav>
<ul>
<li><a href="/">Home</a></li>
<li><a href="#events">Events</a></li>
<li><a href="#social">Social</a></li>
</ul>
</nav>

Rules:

- links must be real anchor elements
- section anchors are allowed for single-page layouts

---

# 6. Accessibility

The site must follow WCAG AA guidelines.

Important:

- strong color contrast
- semantic HTML
- keyboard navigation
- alt text on all images

White text on light green backgrounds must have a dark outline.

---

# 7. Images

The profile page may contain two image types:

- character artwork
- fursuit photographs

Images must include descriptive alt text.

---

# 8. Performance

Rules:

- lazy load images
- avoid large JavaScript bundles
- prefer modern image formats (WebP, AVIF)

---

End of guidelines.