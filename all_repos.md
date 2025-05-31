---
title: Projects
layout: default
---

# My Projects

Welcome to my project showcase! I'm a Senior Solutions Engineer with expertise in enterprise architecture, system integration, and technical leadership. Here you'll find a collection of my public GitHub repositories, demonstrating my skills and experience in delivering complex technical solutions.

[View my Core Competencies](/competencies)

## Featured Solutions

<div id="featured-projects" class="featured-grid">
    <!-- Featured projects will be dynamically loaded here -->
</div>

## All Projects

<div id="repos" class="repos-container">
    <!-- Search and filter controls -->
    <div class="filter-controls">
        <div class="search-box">
            <input type="text" id="search-input" placeholder="Search projects by name or technology">
            <i class="fas fa-search"></i>
        </div>
        
        <div class="category-filter">
            <select id="category-filter">
                <option value="all">All Categories</option>
                <option value="enterprise">Enterprise Solutions</option>
                <option value="integration">System Integration</option>
                <option value="architecture">Architecture</option>
                <option value="leadership">Technical Leadership</option>
                <option value="other">Other</option>
            </select>
        </div>
    </div>

    <!-- Projects grid -->
    <div id="projects-grid" class="projects-grid">
        <!-- Projects will be dynamically loaded here -->
    </div>
</div>

*Note: This page automatically updates with my latest public repositories. Feel free to explore and reach out if you'd like to discuss potential opportunities!*

<!-- Add Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<!-- Add custom styles -->
<style>
:root {
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
}

body {
    background: linear-gradient(135deg, var(--background-color) 0%, #e2e8f0 100%);
    color: var(--text-color);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

/* Featured Projects Grid */
.featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

/* Filter Controls */
.filter-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.search-box {
    position: relative;
    flex: 1;
    min-width: 250px;
}

.search-box input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid rgba(99, 102, 241, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
}

.search-box i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
}

.category-filter select {
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 2px solid rgba(99, 102, 241, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    cursor: pointer;
}

/* Project Cards */
.project-card {
    background: var(--card-background);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px var(--shadow-color);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.project-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 40px var(--shadow-color);
    border-color: rgba(255, 255, 255, 0.3);
}

.project-content {
    padding: 1.75rem;
}

.project-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

.project-description {
    color: var(--text-light);
    margin-bottom: 1rem;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.project-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 8px;
    font-size: 0.875rem;
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary-color);
    border: 1px solid rgba(99, 102, 241, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
    .filter-controls {
        flex-direction: column;
    }
    
    .search-box, .category-filter {
        width: 100%;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<!-- Add JavaScript for dynamic functionality -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const GITHUB_USERNAME = 'poglesbyg';
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
    
    // Initialize search functionality
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    // Add event listeners for search and filter
    searchInput.addEventListener('input', filterProjects);
    categoryFilter.addEventListener('change', filterProjects);
    
    // Store all projects for filtering
    let allProjects = [];
    
    // Fetch repositories from GitHub API
    async function fetchRepositories() {
        try {
            const response = await fetch(GITHUB_API_URL);
            if (!response.ok) throw new Error('Failed to fetch repositories');
            
            const repos = await response.json();
            allProjects = repos.map(repo => ({
                name: repo.name,
                description: repo.description || 'No description available',
                url: repo.html_url,
                topics: repo.topics || [],
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                category: determineCategory(repo)
            }));
            
            // Sort projects by stars and forks
            allProjects.sort((a, b) => (b.stars + b.forks) - (a.stars + a.forks));
            
            // Load featured and all projects
            loadFeaturedProjects();
            loadAllProjects();
        } catch (error) {
            console.error('Error fetching repositories:', error);
            showError('Failed to load repositories. Please try again later.');
        }
    }
    
    // Determine project category based on topics and description
    function determineCategory(repo) {
        const topics = repo.topics || [];
        const description = (repo.description || '').toLowerCase();
        
        if (topics.includes('enterprise') || description.includes('enterprise')) return 'enterprise';
        if (topics.includes('integration') || description.includes('integration')) return 'integration';
        if (topics.includes('architecture') || description.includes('architecture')) return 'architecture';
        if (topics.includes('leadership') || description.includes('leadership')) return 'leadership';
        return 'other';
    }
    
    // Filter projects based on search term and category
    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        
        const filteredProjects = allProjects.filter(project => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm) ||
                                project.description.toLowerCase().includes(searchTerm) ||
                                project.topics.some(topic => topic.toLowerCase().includes(searchTerm));
            
            const matchesCategory = category === 'all' || project.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        renderProjects(filteredProjects, document.getElementById('projects-grid'));
    }
    
    // Load featured projects (top 3 by stars/forks)
    function loadFeaturedProjects() {
        const featuredProjects = allProjects.slice(0, 3);
        renderProjects(featuredProjects, document.getElementById('featured-projects'), true);
    }
    
    // Load all projects
    function loadAllProjects() {
        renderProjects(allProjects, document.getElementById('projects-grid'));
    }
    
    // Render projects to the specified container
    function renderProjects(projects, container, isFeatured = false) {
        container.innerHTML = '';
        
        if (projects.length === 0) {
            container.innerHTML = '<div class="no-projects">No projects found matching your criteria.</div>';
            return;
        }
        
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = `project-card ${isFeatured ? 'featured' : ''}`;
            
            card.innerHTML = `
                <div class="project-content">
                    <h3 class="project-title">
                        <a href="${project.url}" target="_blank" rel="noopener">
                            ${project.name}
                        </a>
                    </h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        ${project.language ? `<span class="project-language">${project.language}</span>` : ''}
                        <span class="project-stats">
                            <i class="fas fa-star"></i> ${project.stars}
                            <i class="fas fa-code-branch"></i> ${project.forks}
                        </span>
                    </div>
                    <div class="project-tags">
                        ${project.topics.map(topic => `
                            <span class="project-tag">${topic}</span>
                        `).join('')}
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
    
    // Show error message
    function showError(message) {
        const container = document.getElementById('projects-grid');
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }
    
    // Initial fetch
    fetchRepositories();
});
</script>

<style>
/* Additional styles for project cards */
.project-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    color: var(--text-light);
    font-size: 0.875rem;
}

.project-language {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.project-language::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
}

.project-stats {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.project-stats i {
    color: var(--primary-color);
}

.error-message {
    text-align: center;
    padding: 2rem;
    color: var(--accent-color);
}

.error-message i {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.no-projects {
    text-align: center;
    padding: 2rem;
    color: var(--text-light);
}

.featured .project-card {
    border: 2px solid var(--primary-color);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    :root {
        --card-background: rgba(30, 41, 59, 0.9);
        --text-color: #f1f5f9;
        --text-light: #94a3b8;
        --shadow-color: rgba(0, 0, 0, 0.2);
    }
    
    .search-box input,
    .category-filter select {
        background: rgba(30, 41, 59, 0.8);
        color: var(--text-color);
    }
    
    .project-tag {
        background: rgba(99, 102, 241, 0.2);
    }
}
</style>
