// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') ||
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.hero, .skills, .projects, .skill-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to current navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinksContainer.classList.toggle('active');
            // Toggle menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (navLinksContainer && !navLinksContainer.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navLinksContainer.classList.remove('active');
            // Reset menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const content = dropdown.querySelector('.dropdown-content');

        if (link && content) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Update active link based on current page
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

    // Handle scroll behavior
    const navContainer = document.querySelector('.nav-container');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768) {
                navLinksContainer.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                // Reset menu icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }, 250);
    });
}); 
