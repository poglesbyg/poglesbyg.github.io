---
layout: default
title: GitHub Projects
description: Explore my open source contributions and personal projects on GitHub.
---

<div class="projects-container">
    <div class="projects-header">
        <h1>GitHub Projects</h1>
        <p class="projects-intro">A collection of my open source contributions and personal projects.</p>
    </div>

    <!-- GitHub Projects Section -->
    <section id="github" class="projects-section">
        <div class="section-header">
            <h2><i class="fab fa-github"></i> My Repositories</h2>
            <p class="section-description">Browse through my GitHub repositories</p>
        </div>
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
</div>

<style>
.projects-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.projects-header {
    text-align: center;
    margin-bottom: 4rem;
}

.projects-intro {
    color: var(--text-light);
    max-width: 600px;
    margin: 1rem auto 0;
    line-height: 1.6;
}

.projects-section {
    margin-bottom: 6rem;
}

.section-header {
    margin-bottom: 2rem;
    text-align: center;
}

.section-header h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.section-header h2 i {
    color: var(--primary-color);
}

.section-description {
    color: var(--text-light);
    font-size: 1.1rem;
}

.filter-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
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
    transition: all 0.3s ease;
}

.search-box input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-color-alpha);
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
    transition: all 0.3s ease;
}

.category-filter select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-color-alpha);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card {
    background: var(--bg-secondary);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px var(--shadow-color);
}

.project-content {
    padding: 1.5rem;
}

.project-header {
    margin-bottom: 1rem;
}

.project-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.project-title a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.project-title a:hover {
    color: var(--primary-color);
}

.project-meta {
    display: flex;
    gap: 1rem;
    color: var(--text-light);
    font-size: 0.875rem;
}

.project-meta span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    margin-bottom: 1rem;
}

.project-tag {
    background: var(--bg-primary);
    color: var(--text-light);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    transition: all 0.3s ease;
}

.project-tag:hover {
    background: var(--primary-color);
    color: white;
}

.project-link {
    color: var(--primary-color);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.project-link:hover {
    gap: 0.75rem;
}

.python-badge {
    background: #306998;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

@media (max-width: 768px) {
    .projects-container {
        padding: 1rem;
    }

    .projects-header {
        margin-bottom: 2rem;
    }

    .projects-section {
        margin-bottom: 3rem;
    }

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
