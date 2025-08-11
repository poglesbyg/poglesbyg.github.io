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

        // Close menu when clicking outside or on a link
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen) {
                if (!this.navLinksContainer.contains(e.target) && 
                    !this.mobileMenuBtn.contains(e.target)) {
                    this.toggleMobileMenu();
                } else if (e.target.tagName === 'A' && e.target.closest('.nav-links')) {
                    // Close menu when clicking on a navigation link
                    setTimeout(() => this.toggleMobileMenu(), 100);
                }
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
        // details/summary dropdown management
        this.dropdowns.forEach(dropdown => {
            const summary = dropdown.querySelector('summary.nav-link');
            const menu = dropdown.querySelector('.dropdown-content');
            if (!summary || !menu) return;

            summary.addEventListener('click', (e) => {
                // Close other open dropdowns on desktop
                if (!this.isMobile) {
                    this.dropdowns.forEach(d => { if (d !== dropdown) d.removeAttribute('open'); });
                }
                // reflect aria-expanded
                setTimeout(() => {
                    const isOpen = dropdown.hasAttribute('open');
                    summary.setAttribute('aria-expanded', String(isOpen));
                    if (isOpen) {
                        const firstItem = menu.querySelector('a');
                        firstItem && firstItem.focus({ preventScroll: true });
                    }
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
                    firstItem && firstItem.focus({ preventScroll: true });
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
                        (arr[(idx + 1) % arr.length]).focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        (arr[(idx - 1 + arr.length) % arr.length]).focus();
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
        let ticking = false;
        
        const updateScrolled = () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                this.navContainer.classList.add('scrolled');
            } else {
                this.navContainer.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrolled);
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

// (Legacy DOMContentLoaded removed; unified initialization at bottom)

// Navigation functionality
// (Legacy initNavigation removed in favor of Navigation module)

// Scroll animations
// (Legacy initScrollAnimations removed in favor of Animation module)

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
// (Legacy theme toggle removed in favor of Theme module)

// Smooth scrolling for anchor links
// (Legacy smooth scrolling removed in favor of SmoothScroll module)

// Enhanced intersection observer for various animations
// (Legacy intersection observer removed in favor of Animation module)

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

// (Legacy DOMContentLoaded for counter removed; unified at bottom)

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

// Initialize parallax on load (keep for smoother hero animation start)
window.addEventListener('load', initParallax, { once: true });

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

// Contact form handling with validation and error handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    // Add form validation
    const validateForm = (form) => {
        const email = form.querySelector('input[type="email"]');
        const message = form.querySelector('textarea');
        const errors = [];

        if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.push('Please enter a valid email address');
        }
        
        if (message && message.value.length < 10) {
            errors.push('Message must be at least 10 characters');
        }

        return errors;
    };

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate form
        const errors = validateForm(this);
        if (errors.length > 0) {
            showNotification(errors.join('. '), 'error');
            return;
        }

        const formData = new FormData(this);
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate random success/failure for demo
                    if (Math.random() > 0.1) {
                        resolve();
                    } else {
                        reject(new Error('Network error'));
                    }
                }, 2000);
            });

            showNotification('Message sent successfully!', 'success');
            this.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
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

// (Legacy lazy loading DOMContentLoaded removed; unified at bottom)

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

// (Injected animation styles removed; defined in CSS file)

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('ServiceWorker registered:', registration.scope))
            .catch(err => console.log('ServiceWorker registration failed:', err));
    });
}

// Module integration with existing code
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    Navigation.init();
    Theme.init();
    Animation.init();
    SmoothScroll.init();

    // Initialize individual functions
    initSkillBars();
    initCounterAnimation();
    initFloatingElements();
    initTypingAnimation();
    initParallax();
    initProjectFiltering();
    initContactForm();
    initLazyLoading();
}); 
