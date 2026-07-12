// CatLoo Industries - Main JavaScript
// Dark mode toggle, mobile menu, and interactive features

(function() {
    'use strict';

    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const currentYear = document.getElementById('currentYear');
    const contactForm = document.getElementById('contactForm');

    // Initialize
    init();

    function init() {
        // Set current year
        setCurrentYear();

        // Load saved theme preference
        loadTheme();

        // Bind event listeners
        bindEvents();
    }

    // Set current year in footer
    function setCurrentYear() {
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
    }

    // Theme Management
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
    }

    function updateToggleIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('.toggle-icon');
            if (icon) {
                icon.textContent = theme === 'light' ? '🌙' : '☀️';
            }
            themeToggle.setAttribute('aria-label',
                theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            );
        }
    }

    // Mobile Menu
    function toggleMenu() {
        const isOpen = navMenu.classList.contains('active');

        if (isOpen) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        } else {
            navMenu.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    }

    // Form Handling
    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simulate form submission
        console.log('Form submitted:', { name, email, subject, message });

        // Show success message (in production, this would be an actual API call)
        alert(`Thank you for your message, ${name}! Our feline specialists will respond within 24 hours.`);

        // Reset form
        contactForm.reset();
    }

    // Smooth scroll for anchor links
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Card interactions - make all cards clickable
    function setupCardInteractions() {
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('.feature-title')?.textContent;
                const productId = this.querySelector('a')?.getAttribute('href');

                // Navigate to relevant section based on card content
                if (title) {
                    if (title.includes('Basic')) {
                        window.location.hash = '#shop-basic';
                    } else if (title.includes('Pro')) {
                        window.location.hash = '#shop-pro';
                    } else if (title.includes('Deluxe')) {
                        window.location.hash = '#shop-deluxe';
                    }
                }
            });

            // Add pointer cursor
            card.style.cursor = 'pointer';
        });
    }

    // Event Bindings
    function bindEvents() {
        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
        }

        // Contact form
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!e.target.closest('.nav-controls') && !e.target.closest('.nav-menu')) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Close menu on nav link click (mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 600 && navMenu) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Handle resize - close mobile menu on desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 600 && navMenu) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Setup smooth scroll
        setupSmoothScroll();

        // Setup card interactions
        setupCardInteractions();

        // Make logo clickable - scroll to top
        const logos = document.querySelectorAll('.logo');
        logos.forEach(logo => {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = '#home';
            });
        });
    }

    // Expose functions globally
    window.toggleTheme = toggleTheme;
    window.toggleMenu = toggleMenu;
})();