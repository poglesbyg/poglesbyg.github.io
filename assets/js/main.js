// Navigation Module
const Navigation = {
    init() {
        // Initialize elements
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinksContainer = document.querySelector('.nav-links');
        this.navContainer = document.querySelector('.nav-container');
        this.dropdowns = document.querySelectorAll('.nav-dropdown');
        this.isMobile = window.innerWidth <= 768;
        this.isMenuOpen = false;
        this.resizeTimeout = null;
        this.touchStartY = 0;

        if (!this.mobileMenuBtn || !this.navLinksContainer) {
            console.error('Mobile menu elements not found');
            return;
        }

        // Bind events
        this.bindEvents();
        this.updateActiveLinks();
        this.initScrollBehavior();
        this.handleResize(); // Initial check
    },

    bindEvents() {
        // Mobile menu events with touch optimization
        if ('ontouchstart' in window) {
            this.mobileMenuBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            }, { passive: false });
        } else {
            this.mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            }, { passive: true });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen &&
                !this.navLinksContainer.contains(e.target) &&
                !this.mobileMenuBtn.contains(e.target)) {
                this.toggleMobileMenu();
            }
        }, { passive: true });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.resizeTimeout) {
                cancelAnimationFrame(this.resizeTimeout);
            }
            this.resizeTimeout = requestAnimationFrame(() => {
                this.isMobile = window.innerWidth <= 768;
                this.handleResize();
            });
        }, { passive: true });

        // Handle dropdowns
        this.dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    if (this.isMobile) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                    }
                }, { passive: true });
            }
        });

        // Handle touch events for mobile menu
        if ('ontouchstart' in window) {
            this.navLinksContainer.addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
            }, { passive: true });

            this.navLinksContainer.addEventListener('touchmove', (e) => {
                if (!this.isMenuOpen) return;

                const touchY = e.touches[0].clientY;
                const diff = touchY - this.touchStartY;

                if (diff > 50) { // Swipe down threshold
                    this.toggleMobileMenu();
                }
            }, { passive: true });
        }

        // Prevent body scroll when mobile menu is open
        this.navLinksContainer.addEventListener('transitionend', () => {
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        }, { passive: true });
    },

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navLinksContainer.classList.toggle('active');

        const icon = this.mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = this.isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
        }

        // Close all dropdowns when toggling menu
        if (!this.isMenuOpen) {
            this.dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    },

    handleResize() {
        if (!this.isMobile) {
            this.isMenuOpen = false;
            this.navLinksContainer.classList.remove('active');
            this.dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            const icon = this.mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
            document.body.style.overflow = '';
        }
    },

    updateActiveLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath ||
                (href !== '/' && currentPath.startsWith(href))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    initScrollBehavior() {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                this.navContainer.classList.add('scrolled');
            } else {
                this.navContainer.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
};

// Theme Module
const Theme = {
    init() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        this.currentTheme = localStorage.getItem('theme') ||
            (this.prefersDarkScheme.matches ? 'dark' : 'light');

        if (this.themeToggle) {
            this.setInitialTheme();
            this.bindEvents();
        }
    },

    setInitialTheme() {
        document.documentElement.classList.remove('light-theme', 'dark-theme');
        document.documentElement.classList.add(`${this.currentTheme}-theme`);
        this.updateThemeIcon(this.currentTheme);
    },

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            this.prefersDarkScheme.addEventListener('change', (e) => this.handleSystemThemeChange(e));
        }
    },

    toggleTheme() {
        const currentTheme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.classList.remove(`${currentTheme}-theme`);
        document.documentElement.classList.add(`${newTheme}-theme`);

        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    },

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    },

    handleSystemThemeChange(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.classList.remove('light-theme', 'dark-theme');
            document.documentElement.classList.add(`${newTheme}-theme`);
            this.updateThemeIcon(newTheme);
        }
    }
};

// Animation Module
const Animation = {
    init() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        this.observeElements();
    },

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                this.observer.unobserve(entry.target);
            }
        });
    },

    observeElements() {
        document.querySelectorAll('.hero, .skills, .projects, .skill-card, .project-card')
            .forEach(el => this.observer.observe(el));
    }
};

// Smooth Scroll Module
const SmoothScroll = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e, anchor));
        });
    },

    handleClick(e, anchor) {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    Theme.init();
    Animation.init();
    SmoothScroll.init();
}); 
