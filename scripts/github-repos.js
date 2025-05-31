// GitHub API configuration
const GITHUB_USERNAME = 'poglesbyg';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

// DOM Elements
const reposContainer = document.getElementById('repos');
const searchInput = document.querySelector('.search');
const categoryFilter = document.getElementById('category-filter');
const featuredProjectsContainer = document.getElementById('featured-projects');

// Show loading state
function showLoading() {
    reposContainer.innerHTML = `
        <div class="container has-text-centered">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="notification is-info">
                        <p>Loading repositories...</p>
                        <progress class="progress is-small is-primary" max="100"></progress>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Show error state
function showError(message) {
    reposContainer.innerHTML = `
        <div class="container has-text-centered">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="notification is-danger">
                        <p>${message}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fetch repositories from GitHub
async function fetchRepositories() {
    showLoading();

    try {
        const response = await fetch(GITHUB_API_URL);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();

        // Filter out forks and archived repositories
        const filteredRepos = repos.filter(repo =>
            !repo.fork &&
            !repo.archived &&
            repo.owner.login === GITHUB_USERNAME
        );

        if (filteredRepos.length === 0) {
            showError('No repositories found. Please check your GitHub username configuration.');
            return [];
        }

        // Sort Python projects first, then by date
        return filteredRepos.sort((a, b) => {
            const aIsPython = a.language === 'Python';
            const bIsPython = b.language === 'Python';
            if (aIsPython && !bIsPython) return -1;
            if (!aIsPython && bIsPython) return 1;
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
    } catch (error) {
        console.error('Error fetching repositories:', error);
        showError('Failed to load repositories. Please try again later.');
        return [];
    }
}

// Create repository card
function createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'card mb-4';

    const topics = repo.topics || [];
    const isFeatured = topics.includes('featured');
    const isPython = repo.language === 'Python';

    card.innerHTML = `
        <div class="card-content">
            <div class="content">
                <h3 class="title is-4">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    ${isFeatured ? '<span class="tag is-primary ml-2">Featured</span>' : ''}
                    ${isPython ? '<span class="python-badge"><i class="fab fa-python"></i> Python</span>' : ''}
                </h3>
                <p class="subtitle is-6">${repo.description || 'No description available'}</p>
                <div class="tags">
                    ${repo.language ? `<span class="tag ${isPython ? 'is-python' : 'is-info'}">${repo.language}</span>` : ''}
                    ${topics.map(topic => `<span class="tag is-light">${topic}</span>`).join('')}
                </div>
                <div class="level is-mobile mt-2">
                    <div class="level-left">
                        <div class="level-item">
                            <span class="icon-text">
                                <span class="icon">
                                    <i class="fas fa-star"></i>
                                </span>
                                <span>${repo.stargazers_count}</span>
                            </span>
                        </div>
                        <div class="level-item">
                            <span class="icon-text">
                                <span class="icon">
                                    <i class="fas fa-code-branch"></i>
                                </span>
                                <span>${repo.forks_count}</span>
                            </span>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <span class="text is-size-7">Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return card;
}

// Filter repositories
function filterRepositories(repos, searchTerm, category) {
    return repos.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = category === 'all' ||
            (category === 'python' && repo.language === 'Python') ||
            (repo.topics && repo.topics.includes(category));

        return matchesSearch && matchesCategory;
    });
}

// Display repositories
function displayRepositories(repos) {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filteredRepos = filterRepositories(repos, searchTerm, category);

    // Clear existing content
    reposContainer.innerHTML = '';

    // Create container for filtered repos
    const reposList = document.createElement('div');
    reposList.className = 'columns is-multiline';

    // Add filtered repos
    filteredRepos.forEach(repo => {
        const column = document.createElement('div');
        column.className = 'column is-half';
        column.appendChild(createRepoCard(repo));
        reposList.appendChild(column);
    });

    reposContainer.appendChild(reposList);
}

// Display featured projects
function displayFeaturedProjects(repos) {
    const featuredRepos = repos.filter(repo => repo.topics && repo.topics.includes('featured'));

    if (featuredRepos.length > 0) {
        const featuredList = document.createElement('div');
        featuredList.className = 'columns is-multiline';

        featuredRepos.forEach(repo => {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            column.appendChild(createRepoCard(repo));
            featuredList.appendChild(column);
        });

        featuredProjectsContainer.appendChild(featuredList);
    }
}

// Initialize
async function initialize() {
    const repos = await fetchRepositories();

    // Display featured projects
    displayFeaturedProjects(repos);

    // Display all repositories
    displayRepositories(repos);

    // Add event listeners
    searchInput.addEventListener('input', () => displayRepositories(repos));
    categoryFilter.addEventListener('change', () => displayRepositories(repos));
}

// Start the application
document.addEventListener('DOMContentLoaded', initialize); 
