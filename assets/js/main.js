// Navigation Module
const Navigation = {
    init() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinksContainer = document.querySelector('.nav-links');
        this.navContainer = document.querySelector('.nav-container');
        this.dropdowns = document.querySelectorAll('.nav-dropdown');
        this.isMobile = window.innerWidth <= 768;
        this.isMenuOpen = false;
        this.resizeTimeout = null;

        if (!this.mobileMenuBtn || !this.navLinksContainer) return;

        this.bindEvents();
        this.updateActiveLinks();
        this.initScrollBehavior();
        this.handleResize();
    },

    bindEvents() {
        if (this._bound) return;
        this._bound = true;

        this.mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        document.addEventListener('click', (e) => {
            if (this.isMenuOpen) {
                if (!this.navLinksContainer.contains(e.target) &&
                    !this.mobileMenuBtn.contains(e.target)) {
                    this.toggleMobileMenu();
                } else if (e.target.tagName === 'A' && e.target.closest('.nav-links')) {
                    setTimeout(() => this.toggleMobileMenu(), 100);
                }
            }
        });

        window.addEventListener('resize', () => {
            if (this.resizeTimeout) cancelAnimationFrame(this.resizeTimeout);
            this.resizeTimeout = requestAnimationFrame(() => {
                this.isMobile = window.innerWidth <= 768;
                this.handleResize();
            });
        }, { passive: true });

        this.dropdowns.forEach(dropdown => {
            const summary = dropdown.querySelector('summary.nav-link');
            const menu = dropdown.querySelector('.dropdown-content');
            if (!summary || !menu) return;

            summary.addEventListener('click', () => {
                if (!this.isMobile) {
                    this.dropdowns.forEach(d => { if (d !== dropdown) d.removeAttribute('open'); });
                }
                setTimeout(() => {
                    const isOpen = dropdown.hasAttribute('open');
                    summary.setAttribute('aria-expanded', String(isOpen));
                }, 0);
            });

            summary.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    dropdown.removeAttribute('open');
                    summary.setAttribute('aria-expanded', 'false');
                    summary.focus();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    dropdown.setAttribute('open', '');
                    summary.setAttribute('aria-expanded', 'true');
                    const firstItem = menu.querySelector('a');
                    if (firstItem) firstItem.focus({ preventScroll: true });
                }
            });

            menu.querySelectorAll('a').forEach((item, idx, arr) => {
                item.setAttribute('role', 'menuitem');
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        dropdown.removeAttribute('open');
                        summary.setAttribute('aria-expanded', 'false');
                        summary.focus();
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        arr[(idx + 1) % arr.length].focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        arr[(idx - 1 + arr.length) % arr.length].focus();
                    }
                });
            });
        });

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

        this.dropdowns.forEach(d => d.removeAttribute('open'));
    },

    handleResize() {
        if (!this.isMobile) {
            this.isMenuOpen = false;
            this.navLinksContainer.classList.remove('active');
            this.dropdowns.forEach(d => d.removeAttribute('open'));
            const icon = this.mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    },

    updateActiveLinks() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    initScrollBehavior() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.pageYOffset > 50) {
                        this.navContainer.classList.add('scrolled');
                    } else {
                        this.navContainer.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
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
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.prefersDarkScheme.addEventListener('change', (e) => this.handleSystemThemeChange(e));
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

// Smooth Scroll Module
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
};

// Scroll Reveal Animation
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelectorAll(
                '.projects-grid, .featured-projects-grid, .blog-grid, ' +
                '.competency-grid, .section-header, .tech-stack-grid'
            ).forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                observer.observe(section);
            });
        }, 100);
    });
}

// Skill Bar Animation
function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.progress').forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => { bar.style.width = width + '%'; }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.skill-bars, .expertise-card').forEach(section => {
        observer.observe(section);
    });
}

// Project Filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
}

// Notification (shared utility)
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    Navigation.init();
    Theme.init();
    SmoothScroll.init();
    initScrollReveal();
    initSkillBars();
    initProjectFiltering();
    initLazyLoading();
});

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('ServiceWorker registered:', reg.scope))
            .catch(err => console.log('ServiceWorker registration failed:', err));
    });
}
