---
title: Projects
layout: page
---

# My Projects

Welcome to my project showcase! I'm a software developer with strong expertise in Python development, alongside full-stack web technologies. Here you'll find a collection of my public GitHub repositories, demonstrating my skills and experience.

## Featured Projects

<div id="featured-projects" class="container">
    <!-- Featured projects will be dynamically loaded here -->
</div>

## All Projects

<div id="repos">
    <div class="container">
        <!-- Filter controls -->
        <div class="field">
            <p class="control has-icons-left">
                <input class="search input" type="text" placeholder="Search projects by name or technology">
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
        
        <!-- Project categories -->
        <div class="field">
            <div class="control">
                <div class="select">
                    <select id="category-filter">
                        <option value="all">All Categories</option>
                        <option value="python">Python Projects</option>
                        <option value="web">Web Development</option>
                        <option value="api">API Projects</option>
                        <option value="fullstack">Full Stack</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>

## Technologies Used

### Python Expertise
- Python 3.x
- Django & Flask
- Data Analysis (Pandas, NumPy)
- Machine Learning (scikit-learn, TensorFlow)
- API Development (FastAPI, REST)
- Testing (pytest, unittest)

### Other Technologies
- Frontend: React, JavaScript/TypeScript, HTML5, CSS3
- Backend: Node.js, Express
- Databases: MongoDB, PostgreSQL
- Tools: Git, Docker, AWS
- Testing: Jest, Mocha

*Note: This page automatically updates with my latest public repositories. Feel free to explore and reach out if you'd like to know more about any project!*

<!-- Add Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<!-- Add Bulma CSS for styling -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">

<!-- Add custom styles -->
<style>
:root {
    /* Modern color palette */
    --primary-color: #6366f1;
    --primary-light: #818cf8;
    --primary-dark: #4f46e5;
    --secondary-color: #10b981;
    --accent-color: #f43f5e;
    --background-color: #f8fafc;
    --card-background: rgba(255, 255, 255, 0.9);
    --text-color: #1e293b;
    --text-light: #64748b;
    --shadow-color: rgba(0, 0, 0, 0.05);
    --gradient-start: #6366f1;
    --gradient-end: #10b981;
}

body {
    background: linear-gradient(135deg, var(--background-color) 0%, #e2e8f0 100%);
    color: var(--text-color);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    padding: 2rem 1rem;
    position: relative;
}

/* Glassmorphism card design */
.card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    background: var(--card-background);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 40px var(--shadow-color);
    border-color: rgba(255, 255, 255, 0.3);
}

.card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.75rem;
}

.content {
    flex-grow: 1;
}

.title {
    color: var(--text-color);
    font-weight: 700;
    letter-spacing: -0.025em;
    background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle {
    color: var(--text-light);
    font-weight: 500;
}

/* Modern tag design */
.tags {
    margin: 1rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tag {
    border-radius: 8px;
    font-weight: 500;
    padding: 0.5em 1em;
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary-color);
    border: 1px solid rgba(99, 102, 241, 0.2);
    transition: all 0.3s ease;
}

.tag:hover {
    background: rgba(99, 102, 241, 0.15);
    transform: translateY(-1px);
}

.tag.is-python {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: white;
    border: none;
}

.python-badge {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: white;
    padding: 0.5em 1em;
    border-radius: 8px;
    font-size: 0.875rem;
    margin-left: 0.5rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

/* Modern form elements */
.input {
    border-radius: 12px;
    border: 2px solid rgba(99, 102, 241, 0.1);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
    padding: 0.75rem 1rem;
}

.input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    background: white;
}

.select select {
    border-radius: 12px;
    border: 2px solid rgba(99, 102, 241, 0.1);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    padding: 0.75rem 2.5rem 0.75rem 1rem;
}

/* Modern notifications */
.notification {
    border-radius: 12px;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.progress {
    border-radius: 8px;
    height: 0.5rem;
    background: rgba(99, 102, 241, 0.1);
    overflow: hidden;
}

.progress::-webkit-progress-bar {
    background: rgba(99, 102, 241, 0.1);
}

.progress::-webkit-progress-value {
    background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
    border-radius: 8px;
}

#featured-projects {
    margin-bottom: 3rem;
    position: relative;
}

/* Modern icon styling */
.icon-text {
    align-items: center;
    display: inline-flex;
    gap: 0.5rem;
    color: var(--text-light);
    transition: all 0.3s ease;
}

.icon {
    color: var(--primary-color);
    transition: all 0.3s ease;
}

.icon-text:hover {
    color: var(--primary-color);
}

.icon-text:hover .icon {
    transform: scale(1.1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(99, 102, 241, 0.1);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, var(--gradient-start), var(--gradient-end));
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, var(--gradient-end), var(--gradient-start));
}

/* Responsive improvements */
@media screen and (max-width: 768px) {
    .column {
        padding: 0.75rem;
    }
    
    .card-content {
        padding: 1.25rem;
    }
    
    .title {
        font-size: 1.25rem;
    }
    
    .card {
        border-radius: 12px;
    }
}

/* Loading animation */
@keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.98); }
    100% { opacity: 1; transform: scale(1); }
}

.progress.is-primary {
    animation: pulse 2s infinite;
}

/* Hover effects for interactive elements */
a {
    transition: all 0.3s ease;
    position: relative;
}

a:hover {
    color: var(--primary-color);
}

a::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
}

a:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}
</style>

<!-- Add GitHub integration script -->
<script src="scripts/github-repos.js" defer></script>
