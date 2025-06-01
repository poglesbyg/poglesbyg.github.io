// Navigation Module
const Navigation = {
    init() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinksContainer = document.getElementById('navLinks');
        this.navContainer = document.querySelector('.nav-container');
        this.dropdowns = document.querySelectorAll('.nav-dropdown');

        if (!this.mobileMenuBtn || !this.navLinksContainer) {
            console.error('Mobile menu elements not found');
            return;
        }

        this.bindEvents();
        this.updateActiveLinks();
        this.initScrollBehavior();
    },

    bindEvents() {
        // Mobile menu events
        this.mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navLinksContainer.classList.contains('active') &&
                !this.navLinksContainer.contains(e.target) &&
                !this.mobileMenuBtn.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.handleResize(), 250);
        });

        // Handle dropdowns
        this.dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    },

    toggleMobileMenu() {
        this.navLinksContainer.classList.toggle('active');
        const icon = this.mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }

        // Close all dropdowns when toggling menu
        if (!this.navLinksContainer.classList.contains('active')) {
            this.dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    },

    handleResize() {
        if (window.innerWidth > 768) {
            this.navLinksContainer.classList.remove('active');
            this.dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            const icon = this.mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
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

        this.setInitialTheme();
        this.bindEvents();
    },

    setInitialTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon(this.currentTheme);
    },

    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.prefersDarkScheme.addEventListener('change', (e) => this.handleSystemThemeChange(e));
    },

    toggleTheme() {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    },

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    },

    handleSystemThemeChange(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
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

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    Theme.init();
    Animation.init();
    SmoothScroll.init();
}); 
