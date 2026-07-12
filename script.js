// Modern Landing Page JavaScript
// Production-ready with dark mode toggle and mobile menu

(function() {
    'use strict';

    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const currentYear = document.getElementById('currentYear');

    // Initialize
    init();

    function init() {
        // Set current year in footer
        setCurrentYear();

        // Load saved theme preference
        loadTheme();

        // Bind event listeners
        bindEvents();
    }

    // Set current year
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
    }

    // Expose for inline handlers
    window.startGame = function() {
        console.log('Start game placeholder');
    };

    window.pauseGame = function() {
        console.log('Pause game placeholder');
    };

    window.resetGame = function() {
        console.log('Reset game placeholder');
    };
})();