---
layout: default
title: Projects
description: Explore my portfolio of healthcare technology and enterprise solutions projects.
---

<div class="projects-container">
    <h1>Projects</h1>
    <p class="projects-intro">A collection of healthcare technology and enterprise solutions projects I've worked on.</p>

    <!-- Featured Projects Section -->
    <section class="featured-projects">
        <h2>Featured Projects</h2>
        <div id="featured-projects" class="projects-grid"></div>
    </section>

    <!-- GitHub Projects Section -->
    <section class="github-projects">
        <h2>GitHub Projects</h2>
        <div class="filter-controls">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="projectSearch" placeholder="Search repositories...">
            </div>
            <div class="category-filter">
                <select id="categoryFilter">
                    <option value="all">All Categories</option>
                    <option value="python">Python</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="data-science">Data Science</option>
                </select>
            </div>
        </div>
        <div id="repos" class="projects-grid"></div>
    </section>

    <!-- Portfolio Projects Section -->
    <section class="portfolio-projects">
        <h2>Portfolio Projects</h2>
        <div class="projects-grid">
            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">FHIR Implementation</h3>
                    <div class="project-meta">
                        <span class="project-language">
                            <i class="fas fa-code"></i>
                            Healthcare
                        </span>
                        <span class="project-stats">
                            <i class="fas fa-star"></i>
                            4.8
                        </span>
                    </div>
                    <p class="project-description">
                        Implementation of FHIR standards for healthcare data interoperability, including patient and practitioner resource management.
                    </p>
                    <div class="project-tags">
                        <span class="project-tag">FHIR</span>
                        <span class="project-tag">Healthcare</span>
                        <span class="project-tag">API</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">Enterprise API Gateway</h3>
                    <div class="project-meta">
                        <span class="project-language">
                            <i class="fas fa-code"></i>
                            Enterprise
                        </span>
                        <span class="project-stats">
                            <i class="fas fa-star"></i>
                            4.9
                        </span>
                    </div>
                    <p class="project-description">
                        Scalable API gateway implementation with advanced security features and monitoring capabilities.
                    </p>
                    <div class="project-tags">
                        <span class="project-tag">API Gateway</span>
                        <span class="project-tag">Security</span>
                        <span class="project-tag">Microservices</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">Healthcare Analytics Platform</h3>
                    <div class="project-meta">
                        <span class="project-language">
                            <i class="fas fa-code"></i>
                            Data Science
                        </span>
                        <span class="project-stats">
                            <i class="fas fa-star"></i>
                            4.7
                        </span>
                    </div>
                    <p class="project-description">
                        Real-time analytics platform for healthcare data with predictive modeling and visualization capabilities.
                    </p>
                    <div class="project-tags">
                        <span class="project-tag">Analytics</span>
                        <span class="project-tag">Machine Learning</span>
                        <span class="project-tag">Visualization</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
.projects-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.projects-intro {
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-light);
}

.featured-projects,
.github-projects,
.portfolio-projects {
    margin-bottom: 4rem;
}

.featured-projects h2,
.github-projects h2,
.portfolio-projects h2 {
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--border-color);
}

.filter-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.search-box {
    flex: 1;
    min-width: 200px;
    position: relative;
}

.search-box i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
}

.search-box input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-secondary);
    color: var(--text-color);
}

.category-filter select {
    padding: 0.75rem 2rem 0.75rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-secondary);
    color: var(--text-color);
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card {
    background: var(--card-background);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    overflow: hidden;
    transition: all 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px var(--shadow-color);
}

.project-content {
    padding: 1.5rem;
}

.project-title {
    margin-bottom: 1rem;
    font-size: 1.25rem;
}

.project-title a {
    color: var(--text-color);
    text-decoration: none;
}

.project-title a:hover {
    color: var(--primary-color);
}

.project-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.project-language {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-light);
}

.project-stats {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-light);
}

.project-description {
    color: var(--text-light);
    margin-bottom: 1rem;
    line-height: 1.6;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.project-tag {
    background: var(--bg-secondary);
    color: var(--text-light);
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.875rem;
}

.python-badge {
    background: #306998;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    margin-left: 0.5rem;
}

@media (max-width: 768px) {
    .filter-controls {
        flex-direction: column;
    }

    .search-box,
    .category-filter select {
        width: 100%;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script src="{{ site.baseurl }}/scripts/github-repos.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GitHub repositories
    initialize();

    // Initialize portfolio projects filtering
    const searchInput = document.getElementById('projectSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const projectCards = document.querySelectorAll('.portfolio-projects .project-card');

    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.project-tag')).map(tag => tag.textContent.toLowerCase());
            const category = card.querySelector('.project-language').textContent.trim();

            const matchesSearch = title.includes(searchTerm) || 
                                description.includes(searchTerm) || 
                                tags.some(tag => tag.includes(searchTerm));
            
            const matchesCategory = !selectedCategory || category === selectedCategory;

            card.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });
    }

    searchInput.addEventListener('input', filterProjects);
    categoryFilter.addEventListener('change', filterProjects);
});
</script> 
