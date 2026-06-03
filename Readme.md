# Debarati Pramanik - Frontend Developer Portfolio

This is a modern, responsive frontend developer portfolio website built from scratch. It features a glassmorphism design, dark/light theme toggling, dynamic typing effects, scroll reveal animations, and an interactive background. 

## Technology Stack

The project relies purely on vanilla web technologies with minimal external dependencies, ensuring high performance and customizability.

### Core Technologies
- **HTML5:** Semantic markup structure for accessibility and SEO.
- **CSS3 (Vanilla):** 
  - **CSS Variables (Custom Properties):** Used extensively for the theming system (Dark/Light mode).
  - **Flexbox & CSS Grid:** For creating responsive and complex layout structures.
  - **Glassmorphism:** Achieved via `backdrop-filter` and semi-transparent backgrounds to create a sleek, frosted-glass effect.
  - **Keyframe Animations & Transitions:** Used for smooth hover effects, typing cursors, and scroll-reveal states.
- **JavaScript (Vanilla JS):**
  - Handles DOM manipulation for mobile navigation and dynamic data population (skills section).
  - Manages Dark/Light mode state using `localStorage`.
  - Implements the **Intersection Observer API** for scroll-spying (highlighting active navigation links) and scroll-reveal animations.
  - Custom typing effect implementation.
  - Form submission handling.

### External Libraries & Integrations
- **Particles.js:** A lightweight JavaScript library used to create the interactive, animated particle background.
- **Font Awesome (v6.4):** Used for scalable vector icons throughout the UI.
- **Google Fonts:** Utilizing modern, clean typography including *Outfit*, *Space Grotesk*, and *Inter*.
- **Google Apps Script (Web App):** Serves as a serverless backend endpoint to collect Contact Form submissions and save them directly to a Google Sheet using the `fetch` API.

## Features
- 🌓 **Dark & Light Mode Toggle** (with persistent `localStorage` support).
- 📱 **Fully Responsive Design** suitable for mobile, tablet, and desktop viewports.
- ✨ **Interactive Particle Background** that responds to mouse hover and clicks.
- 💬 **Working Contact Form** connected to Google Sheets.
- 📄 **Dual Resume Views:** Contains both a visual web portfolio and a dedicated text-based printable resume page (`index2.html`).
- ⚡ **Zero Framework Overhead:** Built without heavy frameworks like React or Vue, ensuring rapid load times.
