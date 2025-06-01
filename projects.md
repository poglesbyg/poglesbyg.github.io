---
layout: default
title: Portfolio Projects
description: Explore my portfolio of healthcare technology and enterprise solutions projects.
---

<div class="projects-container">
    <div class="projects-header">
        <h1>Portfolio Projects</h1>
        <p class="projects-intro">A collection of healthcare technology and enterprise solutions projects I've worked on.</p>
    </div>

    <!-- Portfolio Projects Section -->
    <section id="portfolio" class="projects-section">
        <div class="section-header">
            <h2><i class="fas fa-briefcase"></i> Featured Projects</h2>
            <p class="section-description">Detailed case studies of major implementations</p>
        </div>
        <div class="projects-grid">
            <div class="project-card">
                <div class="project-content">
                    <div class="project-header">
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
                    </div>
                    <p class="project-description">
                        Implementation of FHIR standards for healthcare data interoperability, including patient and practitioner resource management.
                    </p>
                    <div class="project-tags">
                        <span class="project-tag">FHIR</span>
                        <span class="project-tag">Healthcare</span>
                        <span class="project-tag">API</span>
                    </div>
                    <div class="project-footer">
                        <a href="/projects/fhir-implementation" class="project-link">View Details <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="project-content">
                    <div class="project-header">
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
                    </div>
                    <p class="project-description">
                        Scalable API gateway implementation with advanced security features and monitoring capabilities.
                    </p>
                    <div class="project-tags">
                        <span class="project-tag">API Gateway</span>
                        <span class="project-tag">Security</span>
                        <span class="project-tag">Microservices</span>
                    </div>
                    <div class="project-footer">
                        <a href="/projects/api-gateway" class="project-link">View Details <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="project-content">
                    <div class="project-header">
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
                    </div>
                    <p class="project-description">
                        Real-time analytics platform for healthcare data with predictive modeling and visualization capabilities.
                    </p>
                    <div class="project-tags">
                        <span class="project-tag">Analytics</span>
                        <span class="project-tag">Machine Learning</span>
                        <span class="project-tag">Visualization</span>
                    </div>
                    <div class="project-footer">
                        <a href="/projects/healthcare-analytics" class="project-link">View Details <i class="fas fa-arrow-right"></i></a>
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

    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style> 
