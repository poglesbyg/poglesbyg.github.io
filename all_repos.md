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
    --primary-color: #2d3436;
    --secondary-color: #0984e3;
    --accent-color: #00b894;
    --background-color: #f5f6fa;
    --card-background: #ffffff;
    --text-color: #2d3436;
    --text-light: #636e72;
    --shadow-color: rgba(0, 0, 0, 0.1);
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.container {
    max-width: 1200px;
    padding: 2rem 1rem;
}

.card {
    transition: all 0.3s ease;
    height: 100%;
    background: var(--card-background);
    border-radius: 12px;
    border: none;
    box-shadow: 0 4px 6px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px var(--shadow-color);
}

.card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
}

.content {
    flex-grow: 1;
}

.title {
    color: var(--primary-color);
    font-weight: 700;
}

.subtitle {
    color: var(--text-light);
}

.tags {
    margin: 0.75rem 0;
}

.tag {
    border-radius: 6px;
    font-weight: 500;
    padding: 0.4em 0.8em;
}

.tag.is-python {
    background-color: var(--secondary-color);
    color: white;
}

.python-badge {
    background-color: var(--secondary-color);
    color: white;
    padding: 0.4em 0.8em;
    border-radius: 6px;
    font-size: 0.875rem;
    margin-left: 0.5rem;
    font-weight: 500;
}

.input {
    border-radius: 8px;
    border: 2px solid #e0e0e0;
    transition: all 0.3s ease;
}

.input:focus {
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 0.125em rgba(9, 132, 227, 0.25);
}

.select select {
    border-radius: 8px;
    border: 2px solid #e0e0e0;
}

.notification {
    border-radius: 8px;
    padding: 1.25rem;
}

.progress {
    border-radius: 4px;
    height: 0.5rem;
}

#featured-projects {
    margin-bottom: 3rem;
}

.level-item {
    color: var(--text-light);
}

.icon-text {
    align-items: center;
    display: inline-flex;
    gap: 0.5rem;
}

.icon {
    color: var(--secondary-color);
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: var(--secondary-color);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--accent-color);
}

/* Responsive improvements */
@media screen and (max-width: 768px) {
    .column {
        padding: 0.75rem;
    }
    
    .card-content {
        padding: 1rem;
    }
    
    .title {
        font-size: 1.25rem;
    }
}

/* Animation for loading state */
@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

.progress.is-primary {
    animation: pulse 1.5s infinite;
}
</style>

<!-- Add GitHub integration script -->
<script src="scripts/github-repos.js" defer></script>
