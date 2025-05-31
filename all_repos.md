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
.card {
    transition: transform 0.2s;
    height: 100%;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.content {
    flex-grow: 1;
}

.tags {
    margin: 0.5rem 0;
}

.level {
    margin-top: auto;
}

#featured-projects {
    margin-bottom: 2rem;
}

.select {
    width: 100%;
    max-width: 200px;
}

/* Python-specific styling */
.tag.is-python {
    background-color: #306998;
    color: white;
}

.python-badge {
    background-color: #306998;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    margin-left: 0.5rem;
}

/* Loading and error states */
.notification {
    margin: 1rem 0;
}

.progress {
    margin-top: 0.5rem;
}

@media screen and (max-width: 768px) {
    .column {
        padding: 0.5rem;
    }
}
</style>

<!-- Add GitHub integration script -->
<script src="scripts/github-repos.js" defer></script>
