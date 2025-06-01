/**
 * GitHub Repositories Integration
 * Fetches and displays GitHub repositories with filtering capabilities
 */

// GitHub Repositories Integration
const GITHUB_USERNAME = 'poglesbyg';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only run on github-projects page
    if (!window.location.pathname.includes('/github-projects')) return;

    // Get elements
    const reposContainer = document.getElementById('repos');
    const searchInput = document.getElementById('projectSearch');
    const categoryFilter = document.getElementById('categoryFilter');

    if (!reposContainer) return;

    // Show loading state
    reposContainer.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading repositories...</p>
        </div>
    `;

    // Store repositories globally for filtering
    let repositories = [];

    // Function to filter and display repositories
    function displayRepositories() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : 'all';

        const filtered = repositories.filter(repo => {
            const matchesSearch = !searchTerm ||
                repo.name.toLowerCase().includes(searchTerm) ||
                (repo.description && repo.description.toLowerCase().includes(searchTerm));

            const matchesCategory = category === 'all' ||
                (category === 'python' && repo.language === 'Python') ||
                (category === 'rust' && repo.language === 'Rust') ||
                (repo.topics && repo.topics.includes(category));

            return matchesSearch && matchesCategory;
        });

        if (filtered.length === 0) {
            reposContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No repositories found matching your criteria.</p>
                </div>
            `;
            return;
        }

        reposContainer.innerHTML = filtered.map(repo => `
            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">
                        <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
                        ${repo.language === 'Python' ? '<span class="python-badge"><i class="fab fa-python"></i> Python</span>' : ''}
                        ${repo.language === 'Rust' ? '<span class="rust-badge"><i class="fas fa-cog"></i> Rust</span>' : ''}
                    </h3>
                    <p class="project-description">${repo.description || 'No description available'}</p>
                    <div class="project-meta">
                        <span><i class="fas fa-code"></i> ${repo.language || 'Other'}</span>
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    </div>
                    <div class="project-tags">
                        ${(repo.topics || []).map(topic => `<span class="project-tag">${topic}</span>`).join('')}
                    </div>
                    <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
                        View Repository <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `).join('');
    }

    // Add event listeners for filters
    if (searchInput) {
        searchInput.addEventListener('input', displayRepositories);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', displayRepositories);
    }

    // Fetch repositories
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load repositories');
            return response.json();
        })
        .then(repos => {
            // Filter out forks and archived repos
            repositories = repos.filter(repo => !repo.fork && !repo.archived);

            if (repositories.length === 0) {
                reposContainer.innerHTML = `
                    <div class="error">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>No repositories found</p>
                    </div>
                `;
                return;
            }

            // Display repositories
            displayRepositories();
        })
        .catch(error => {
            console.error('Error:', error);
            reposContainer.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Failed to load repositories</p>
                </div>
            `;
        });
});

// Add minimal styles
const style = document.createElement('style');
style.textContent = `
    .loading, .error, .no-results {
        text-align: center;
        padding: 2rem;
        color: var(--text-light);
    }
    .loading i, .error i, .no-results i {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    .project-card {
        background: var(--bg-secondary);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        border: 1px solid var(--border-color);
    }
    .project-title {
        margin: 0 0 1rem 0;
    }
    .project-title a {
        color: var(--text-color);
        text-decoration: none;
    }
    .python-badge {
        background: #306998;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
        margin-left: 0.5rem;
    }
    .rust-badge {
        background: #DEA584;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
        margin-left: 0.5rem;
    }
    .project-description {
        color: var(--text-light);
        margin-bottom: 1rem;
    }
    .project-meta {
        display: flex;
        gap: 1rem;
        color: var(--text-light);
        margin-bottom: 1rem;
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
    }
    .project-link {
        color: var(--primary-color);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style); 
