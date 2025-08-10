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
        if (this._bound) return; // prevent duplicate binding
        this._bound = true;
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
            const menu = dropdown.querySelector('.dropdown-content');
            if (!link || !menu) return;

            // Click/touch toggle for mobile
            link.addEventListener('click', (e) => {
                if (this.isMobile) {
                    e.preventDefault();
                    e.stopPropagation();
                    const expanded = link.getAttribute('aria-expanded') === 'true';
                    link.setAttribute('aria-expanded', String(!expanded));
                    dropdown.classList.toggle('active');
                }
            }, { passive: true });

            // Keyboard support (Enter/Space to open, Esc to close, Arrow keys to navigate)
            link.setAttribute('tabindex', '0');
            link.addEventListener('keydown', (e) => {
                const code = e.key;
                if (code === 'Enter' || code === ' ') {
                    e.preventDefault();
                    const expanded = link.getAttribute('aria-expanded') === 'true';
                    link.setAttribute('aria-expanded', String(!expanded));
                    dropdown.classList.toggle('active');
                    if (!expanded) {
                        const firstItem = menu.querySelector('a');
                        firstItem && firstItem.focus();
                    }
                } else if (code === 'Escape') {
                    link.setAttribute('aria-expanded', 'false');
                    dropdown.classList.remove('active');
                    link.focus();
                } else if (code === 'ArrowDown') {
                    e.preventDefault();
                    const items = Array.from(menu.querySelectorAll('a'));
                    if (items.length) {
                        (items[0]).focus();
                    }
                }
            });

            // Allow arrow navigation within menu
            menu.querySelectorAll('a').forEach((item, idx, arr) => {
                item.setAttribute('role', 'menuitem');
                item.addEventListener('keydown', (e) => {
                    const code = e.key;
                    if (code === 'ArrowDown') {
                        e.preventDefault();
                        (arr[(idx + 1) % arr.length]).focus();
                    } else if (code === 'ArrowUp') {
                        e.preventDefault();
                        (arr[(idx - 1 + arr.length) % arr.length]).focus();
                    } else if (code === 'Escape') {
                        link.setAttribute('aria-expanded', 'false');
                        dropdown.classList.remove('active');
                        link.focus();
                    }
                });
            });
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
                const trigger = dropdown.querySelector('.nav-link');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
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

// Main JavaScript for Portfolio Site
document.addEventListener('DOMContentLoaded', function () {

    // Navigation functionality
    initNavigation();

    // Scroll animations
    initScrollAnimations();

    // Skill bar animations
    initSkillBars();

    // Theme toggle functionality
    initThemeToggle();

    // Smooth scrolling for anchor links
    initSmoothScrolling();

    // Intersection Observer for animations
    initIntersectionObserver();

    // Floating elements animation
    initFloatingElements();

    // Typing animation for hero section
    initTypingAnimation();
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const dropdownToggle = document.querySelectorAll('.nav-dropdown');

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', function (e) {
            if (e.target.classList.contains('nav-link')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    }

    // Dropdown functionality for mobile
    dropdownToggle.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.nav-container');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active navigation highlighting
    const currentPath = window.location.pathname;
    const navLinksArray = document.querySelectorAll('.nav-link');
    navLinksArray.forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            (currentPath === '/' && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s ease-out';

        if (element.classList.contains('slide-up')) {
            element.style.transform = 'translateY(30px)';
        } else if (element.classList.contains('slide-left')) {
            element.style.transform = 'translateX(-30px)';
        } else if (element.classList.contains('slide-right')) {
            element.style.transform = 'translateX(30px)';
        }

        observer.observe(element);
    });
}

// Skill bar animations
function initSkillBars() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-bars, .expertise-card').forEach(section => {
        observer.observe(section);
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update toggle icon
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                const navHeight = document.querySelector('.nav-container')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced intersection observer for various animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger animation for children elements
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll(
        '.hero-stats, .experience-highlights, .expertise-grid, .tech-categories, ' +
        '.projects-grid, .highlight-card, .expertise-card, .tech-category'
    );

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');

    floatingElements.forEach((element, index) => {
        // Randomize initial position
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 10;

        element.style.left = randomX + '%';
        element.style.animationDelay = randomDelay + 's';

        // Randomize size
        const size = 15 + Math.random() * 10;
        element.style.width = size + 'px';
        element.style.height = size + 'px';
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const titleSubtitle = document.querySelector('.title-subtitle');
    if (!titleSubtitle) return;

    const text = titleSubtitle.textContent;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = isDeleting
            ? text.substring(0, charIndex - 1)
            : text.substring(0, charIndex + 1);

        titleSubtitle.textContent = currentText;

        if (isDeleting) {
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                setTimeout(typeText, pauseTime);
                return;
            }
            setTimeout(typeText, deletingSpeed);
        } else {
            charIndex++;
            if (charIndex > text.length) {
                isDeleting = true;
                setTimeout(typeText, pauseTime);
                return;
            }
            setTimeout(typeText, typingSpeed);
        }
    }

    // Start typing animation after a delay
    setTimeout(() => {
        titleSubtitle.textContent = '';
        typeText();
    }, 1000);
}

// Counter animation for statistics
function initCounterAnimation() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hero-stats, .projects-stats').forEach(section => {
        observer.observe(section);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const suffix = element.textContent.replace(/[\d]/g, '');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', function () {
    initCounterAnimation();
});

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const speed = scrolled * 0.5;

        if (hero) {
            hero.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Initialize parallax on load
window.addEventListener('load', initParallax);

// Dynamic project filtering (if implemented)
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form handling (if contact form exists)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function () {
    initProjectFiltering();
    initContactForm();
});

// Performance optimization - lazy loading images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add CSS classes for animations
const animationStyles = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .stagger-child {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .stagger-child.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-background);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 30px var(--shadow-color);
        z-index: var(--z-tooltip);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification.success {
        border-left: 4px solid var(--secondary-color);
    }
    
    .notification.success i {
        color: var(--secondary-color);
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Module integration with existing code
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    Navigation.init();
    Theme.init();
    Animation.init();
    SmoothScroll.init();

    // Initialize individual functions
    initCounterAnimation();
    initFloatingElements();
    initTypingAnimation();
    initParallax();
    initProjectFiltering();
    initContactForm();
    initLazyLoading();
}); 
