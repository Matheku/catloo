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

        // Setup all click handlers
        setupAllClickables();
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
            const icon = themeToggle.querySelector('.toggle-icon svg');
            if (icon) {
                icon.setAttribute('href', theme === 'light' ? '#icon-moon' : '#icon-sun');
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

    // Modal functionality
    function showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    function closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    // Setup all clickable elements
    function setupAllClickables() {
        // Make stat elements clickable - navigate to relevant sections
        document.querySelectorAll('.stat').forEach(stat => {
            stat.addEventListener('click', function(e) {
                const label = this.querySelector('.stat-label')?.textContent;
                if (label === 'Rating' || label === 'Installed') {
                    window.location.hash = '#reviews';
                } else if (label === 'Shipping') {
                    window.location.hash = '#support';
                }
            });
            stat.style.cursor = 'pointer';
        });

        // Make tech icons clickable
        document.querySelectorAll('.tech-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                const tech = this.getAttribute('data-tech');
                let title, content;

                switch(tech) {
                    case 'flush':
                        title = 'Flush System';
                        content = '<p>Our 0.3L precision-engineered mechanism operates at under 25dB for whisper-quiet performance. Features a ceramic valve rated for 50,000+ cycles.</p>';
                        break;
                    case 'odor':
                        title = 'Odor Control';
                        content = '<p>Advanced activated carbon filtration with sealed trapway technology eliminates 99.7% of odors within 30 seconds.</p>';
                        break;
                    case 'safety':
                        title = 'Safety Certified';
                        content = '<p>All materials are NSF-approved, non-toxic, and BPA-free. Rounded edges and stable base prevent tipping.</p>';
                        break;
                    case 'cleaning':
                        title = 'Easy Clean';
                        content = '<p>Antimicrobial coated surfaces resist residue buildup. Disassembly takes seconds for thorough cleaning.</p>';
                        break;
                }

                if (title) showModal(title, content);
            });
        });

        // Make support icons clickable
        document.querySelectorAll('.support-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                const support = this.getAttribute('data-support');
                let title, content;

                switch(support) {
                    case 'manual':
                        title = 'Manuals & Guides';
                        content = '<p>Download instruction manuals for all CatLoo models. Available in PDF format with illustrated setup guides.</p><br><a href="#" class="btn btn-primary">Download Manuals</a>';
                        break;
                    case 'warranty':
                        title = 'Warranty Coverage';
                        content = '<p>3-year limited warranty covering mechanical defects. Register your product for extended coverage.</p><br><a href="#" class="btn btn-primary">Register Product</a>';
                        break;
                    case 'shipping':
                        title = 'Shipping Information';
                        content = '<p>Free shipping on all US orders. International shipping available in 3-5 business days. 30-day risk-free trial.</p>';
                        break;
                    case 'contact':
                        title = 'Contact Support';
                        content = '<p>Speak with our feline specialists Monday-Friday 9AM-6PM, Saturday-Sunday 10AM-4PM (PST).</p><br><a href="mailto:hello@catloo.com" class="btn btn-primary">Email Us</a>';
                        break;
                }

                if (title) showModal(title, content);
            });
        });

        // Make product images clickable
        document.querySelectorAll('.product-image').forEach(img => {
            img.addEventListener('click', function() {
                const product = this.getAttribute('data-product');
                window.location.hash = '#products';
            });
        });

        // Make step more buttons clickable
        document.querySelectorAll('.step-more').forEach(btn => {
            btn.addEventListener('click', function() {
                const step = this.getAttribute('data-step');
                let title, content;

                switch(step) {
                    case 'placement':
                        title = 'Fixture Placement Guide';
                        content = '<p>Position on a level, waterproof surface near a water supply. Ensure 8" clearance on all sides and access to power outlet for Pro/Deluxe models.</p>';
                        break;
                    case 'plumbing':
                        title = 'Plumbing Connection';
                        content = '<p>Connect the included 1/2" supply line to your standard residential plumbing. Professional installation recommended for optimal performance.</p>';
                        break;
                    case 'power':
                        title = 'Power Options';
                        content = '<p>Pro and Deluxe models include both USB-C and battery pack options. Basic model operates manually.</p>';
                        break;
                    case 'training':
                        title = 'Cat Training Guide';
                        content = '<p>Follow our step-by-step training guide. Most cats adapt within 2-3 days with consistent positive reinforcement.</p>';
                        break;
                }

                if (title) showModal(title, content);
            });
        });

        // Make product buttons clickable
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const target = this.getAttribute('data-target');

                if (action === 'buy') {
                    let title, content;
                    switch(target) {
                        case 'basic':
                            title = 'Basic Edition - $89';
                            content = '<p>Premium entry-level model with manual flush and deodorizing filter.</p><br><a href="#" class="btn btn-primary">Proceed to Checkout</a>';
                            break;
                        case 'pro':
                            title = 'Pro Edition - $149';
                            content = '<p>Sensor-activated flush with LED night light and adjustable riser ring.</p><br><a href="#" class="btn btn-primary">Proceed to Checkout</a>';
                            break;
                        case 'deluxe':
                            title = 'Deluxe Edition - $299';
                            content = '<p>Smart connectivity via companion app. Porcelain construction with self-cleaning cycle.</p><br><a href="#" class="btn btn-primary">Proceed to Checkout</a>';
                            break;
                    }
                    if (title) showModal(title, content);
                } else if (action === 'details') {
                    let title, content;
                    switch(target) {
                        case 'basic':
                            title = 'Basic Edition Details';
                            content = '<ul style="margin-left: 1.25rem; line-height: 1.8;"><li>Manual flush handle</li><li>Deodorizing carbon filter</li><li>6" diameter, ideal for small cats</li><li>ABS plastic construction</li></ul>';
                            break;
                        case 'pro':
                            title = 'Pro Edition Details';
                            content = '<ul style="margin-left: 1.25rem; line-height: 1.8;"><li>Motion sensor activation</li><li>LED night light (blue)</li><li>Adjustable riser ring</li><li>Built-in water filter</li></ul>';
                            break;
                        case 'deluxe':
                            title = 'Deluxe Edition Details';
                            content = '<ul style="margin-left: 1.25rem; line-height: 1.8;"><li>WiFi connectivity</li><li>Self-cleaning cycle</li><li>Heated seat option</li><li>Porcelain glaze</li></ul>';
                            break;
                    }
                    if (title) showModal(title, content);
                }
            });
        });

        // Add subtle water animation on page load
        setTimeout(() => {
            const water = document.getElementById('toiletWater');
            if (water) {
                water.style.opacity = '1';
                setTimeout(() => {
                    water.style.opacity = '0.8';
                }, 800);
            }
        }, 1000);

        // Close modal handlers
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Close modal when clicking outside
        const modal = document.getElementById('modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) closeModal();
            });
        }

        // Escape key closes modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModal();
        });
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
            // Don't override if it has its own link
            const hasTitleLink = card.querySelector('.feature-title-link');
            if (hasTitleLink) return;

            card.addEventListener('click', function() {
                const title = this.querySelector('.feature-title')?.textContent;

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