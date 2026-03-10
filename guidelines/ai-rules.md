# AI Generation Rules

These rules define how AI tools must generate code for the project.

The project is a personal furry profile website.

---

# 1. HTML Rules

Always generate semantic HTML.

Required elements:

<header>
<nav>
<main>
<section>
<footer>

Do not generate unnecessary div nesting.

---

# 2. Navigation

Navigation must always use anchor elements.

Correct:

<a href="#events">Events</a>

Incorrect:

<div onclick="navigate()">

---

# 3. CSS Rules

Colors and spacing must always use design tokens.

Correct:

color: var(--color-primary);

Incorrect:

color: #2e7d32;

---

# 4. JavaScript Fallback

The page must include a noscript warning.

Example:

<noscript>
<div class="no-js-warning">
This website works best with JavaScript enabled.
</div>
</noscript>

---

# 5. Component Usage

The following components must be used when generating pages:

Navigation  
Hero  
Card  
EventList  
SocialLinks  
Footer

Do not create alternative implementations.

---

# 6. Accessibility

All interactive elements must be accessible.

Rules:

- buttons must use <button>
- links must use <a>
- focus styles must be visible

---

# 7. Dark Mode

The theme switch must modify the data-theme attribute on the root element.

Example:

<html data-theme="dark">

---

# 8. Images

All images must include alt attributes.

Example:

alt="Sidney the grey spotted dog fursona artwork"

---

End of AI rules.