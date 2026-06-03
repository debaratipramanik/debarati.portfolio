

document.addEventListener('DOMContentLoaded', () => {
    /* ==================================================
       Theme Toggle (Dark/Light Mode)
       ================================================== */
    const themeToggleBtn = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check LocalStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);

        // Re-init particles with new colors if needed
        if (window.pJSDom && window.pJSDom.length > 0) {
            pJSDom[0].pJS.particles.color.value = newTheme === 'light' ? '#0ea5e9' : '#00f0ff';
            pJSDom[0].pJS.particles.line_linked.color = newTheme === 'light' ? '#0ea5e9' : '#00f0ff';
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    /* ==================================================
       Mobile Menu Toggle
       ================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* ==================================================
       Dynamic Typing Effect
       ================================================== */
    const typingText = document.querySelector('.typing-text');
    const words = ["Frontend Developer", "Web Designer", "UI/UX Enthusiast", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);

    /* ==================================================
       Scroll Reveal Animations
       ================================================== */
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');

                // Animate skill bars when visible
                if (element.classList.contains('skills-container')) {
                    animateSkills();
                }
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load

    /* ==================================================
       Active Section Highlight (Intersection Observer)
       ================================================== */
    const sections = document.querySelectorAll('section');
    const navLinksArray = document.querySelectorAll('.nav-links a[href^="#"]');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    /* ==================================================
       Dynamic Skills Data population
       ================================================== */
    const techSkills = [
        { name: "HTML5", percentage: 95 },
        { name: "CSS3", percentage: 90 },
        { name: "JavaScript", percentage: 85 },
        { name: "C / C++", percentage: 70 },
        { name: "PHP", percentage: 75 },
        { name: "Python", percentage: 65 },
        { name: "Advance Excel", percentage: 80 }
    ];

    const softSkills = [
        { name: "Hardworking", icon: "fa-hammer" },
        { name: "Decision Maker", icon: "fa-brain" },
        { name: "Problem Solver", icon: "fa-puzzle-piece" },
        { name: "Communication", icon: "fa-comments" },
        { name: "Quick Learner", icon: "fa-rocket" },
        { name: "Innovative", icon: "fa-lightbulb" },
        { name: "Service-Focused", icon: "fa-handshake" }
    ];

    const techContainer = document.getElementById('techSkillsContainer');
    const softContainer = document.getElementById('softSkillsContainer');

    // Populate Tech Skills
    techSkills.forEach(skill => {
        const skillHTML = `
            <div class="skill-box">
                <div class="skill-info">
                    <span>${skill.name}</span>
                    <span>${skill.percentage}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="${skill.percentage}%"></div>
                </div>
            </div>
        `;
        techContainer.insertAdjacentHTML('beforeend', skillHTML);
    });

    // Populate Soft Skills
    softSkills.forEach(skill => {
        const skillHTML = `
            <div class="soft-skill-item">
                <i class="fas ${skill.icon}"></i>
                <span>${skill.name}</span>
            </div>
        `;
        softContainer.insertAdjacentHTML('beforeend', skillHTML);
    });

    let skillsAnimated = false;
    function animateSkills() {
        if (skillsAnimated) return;
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
        skillsAnimated = true;
    }

    /* ==================================================
       Portfolio Filtering
       ================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    // Add slight animation
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==================================================
       Contact Form Handling (Google Sheets Web App Integration)
       ================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    // Google Sheets Web App URL
    // Paste the Google Apps Script Web App URL you generated earlier here:
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxhQYbrbRs0lYLivx_hXz_i4LovuUbn5ky0q9HE_hjGTTEjbMhtHZpFVkfPClefGN3c/exec";

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Disable button and show sending status
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        btnText.textContent = 'Saving...';
        submitBtn.disabled = true;

        if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE") {
            console.error("Google Script URL is missing!");
            formStatus.textContent = "Please add your Google Apps Script URL to the code!";
            formStatus.className = "form-status error";
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        const formData = new FormData(contactForm);

        // Fetch request to Google Apps Script Web App
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Google Script responses are opaque, so we use no-cors
        })
            .then(() => {
                // Since no-cors doesn't give us a readable response body, we assume success if it didn't throw a network error
                formStatus.textContent = "Message saved to Google Sheets successfully!";
                formStatus.className = "form-status success";
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error saving to Google Sheets:', error);
                formStatus.textContent = "Oops! Something went wrong while saving your message.";
                formStatus.className = "form-status error";
            })
            .finally(() => {
                btnText.textContent = originalText;
                submitBtn.disabled = false;

                setTimeout(() => {
                    formStatus.textContent = "";
                    formStatus.className = "form-status";
                }, 5000);
            });
    });

    /* ==================================================
       Current Year in Footer
       ================================================== */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ==================================================
       Particles.js Initialization
       ================================================== */
    if (typeof particlesJS !== 'undefined') {
        const theme = html.getAttribute('data-theme') || 'dark';
        const pColor = theme === 'light' ? '#0ea5e9' : '#00f0ff';

        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": pColor },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": pColor,
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 200, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }
});
