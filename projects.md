---
layout: default
title: Portfolio Projects
description: AI, healthcare, and systems projects.
---

<div class="page-hero">
    <div class="page-hero-content">
        <h1>Projects</h1>
        <p class="page-hero-description">AI, healthcare systems, and infrastructure work.</p>
    </div>
</div>

<div class="projects-container">
    <!-- Featured AI/ML Projects -->
    <section id="featured-ai" class="projects-section">
        <div class="section-header">
            <h2>AI / ML</h2>
        </div>
        <div class="featured-projects-grid">
            <div class="project-card featured ai-project">
                <div class="project-image">
                    <div class="project-overlay">
                        <div class="project-tech-stack">
                            <span class="tech-badge python">Python</span>
                            <span class="tech-badge">TensorFlow</span>
                            <span class="tech-badge">FHIR</span>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">Clinical NLP Assistant</h3>
                        <div class="project-badges">
                            <span class="badge ai">AI</span>
                            <span class="badge healthcare">Healthcare</span>
                        </div>
                    </div>
                    <p class="project-description">
                        NLP system for processing clinical notes with diagnostic suggestion.
                        Integrated with Epic EHR via FHIR R4.
                    </p>
                    <div class="project-footer">
                        <a href="https://github.com/poglesbyg" class="project-link" target="_blank" rel="noopener">
                            <i class="fab fa-github"></i>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>

            <div class="project-card featured ml-project">
                <div class="project-image">
                    <div class="project-overlay">
                        <div class="project-tech-stack">
                            <span class="tech-badge">PyTorch</span>
                            <span class="tech-badge">AWS</span>
                            <span class="tech-badge">Kubernetes</span>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">Patient Risk Stratification</h3>
                        <div class="project-badges">
                            <span class="badge ml">ML</span>
                            <span class="badge enterprise">Enterprise</span>
                        </div>
                    </div>
                    <p class="project-description">
                        Ensemble ML models for 30-day readmission prediction.
                        Processes health records at scale on AWS.
                    </p>
                    <div class="project-footer">
                        <a href="https://github.com/poglesbyg" class="project-link" target="_blank" rel="noopener">
                            <i class="fab fa-github"></i>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>

            <div class="project-card featured automation-project">
                <div class="project-image">
                    <div class="project-overlay">
                        <div class="project-tech-stack">
                            <span class="tech-badge">Docker</span>
                            <span class="tech-badge">Airflow</span>
                            <span class="tech-badge">React</span>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">Healthcare Workflow Automation</h3>
                        <div class="project-badges">
                            <span class="badge automation">Automation</span>
                            <span class="badge integration">Integration</span>
                        </div>
                    </div>
                    <p class="project-description">
                        Automation platform for patient interactions using rule-based routing and decision trees.
                    </p>
                    <div class="project-footer">
                        <a href="https://github.com/poglesbyg" class="project-link" target="_blank" rel="noopener">
                            <i class="fab fa-github"></i>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Healthcare Innovation Projects -->
    <section id="healthcare" class="projects-section">
        <div class="section-header">
            <h2>Healthcare</h2>
        </div>
        <div class="projects-grid">
            <div class="project-card healthcare-focus">
                <div class="project-header">
                    <div class="project-title-section">
                        <h3 class="project-title">EPDS Screening System</h3>
                        <div class="project-badges">
                            <span class="badge clinical">Clinical</span>
                            <span class="badge fhir">FHIR R4</span>
                        </div>
                    </div>
                </div>
                <p class="project-description">
                    Edinburgh Postnatal Depression Scale implementation with FHIR integration.
                    Automated scoring, risk stratification, and clinical decision support.
                </p>
                <div class="project-highlights">
                    <div class="highlight"><span>FHIR R4 Compliant</span></div>
                    <div class="highlight"><span>Real-time Scoring</span></div>
                    <div class="highlight"><span>Clinical Alerts</span></div>
                </div>
                <div class="project-footer">
                    <a href="/epds_app.html" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                </div>
            </div>

            <div class="project-card healthcare-focus">
                <div class="project-header">
                    <div class="project-title-section">
                        <h3 class="project-title">Provider Management System</h3>
                        <div class="project-badges">
                            <span class="badge system">System</span>
                            <span class="badge crud">CRUD</span>
                        </div>
                    </div>
                </div>
                <p class="project-description">
                    Healthcare provider management with SMART on FHIR authentication.
                    Practitioner resource management and clinical workflow integration.
                </p>
                <div class="project-highlights">
                    <div class="highlight"><span>SMART on FHIR</span></div>
                    <div class="highlight"><span>OAuth2 Security</span></div>
                    <div class="highlight"><span>Role-based Access</span></div>
                </div>
                <div class="project-footer">
                    <a href="/smartapp.html" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                        View Application
                    </a>
                </div>
            </div>

            <div class="project-card healthcare-focus">
                <div class="project-header">
                    <div class="project-title-section">
                        <h3 class="project-title">Patient Data Platform</h3>
                        <div class="project-badges">
                            <span class="badge platform">Platform</span>
                            <span class="badge integration">Integration</span>
                        </div>
                    </div>
                </div>
                <p class="project-description">
                    Unified patient data platform with search, filtering, and analytics.
                    RESTful API with CRUD operations and audit logging.
                </p>
                <div class="project-highlights">
                    <div class="highlight"><span>RESTful API</span></div>
                    <div class="highlight"><span>Advanced Search</span></div>
                    <div class="highlight"><span>Audit Logging</span></div>
                </div>
                <div class="project-footer">
                    <a href="/crud_pt.html" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                        View Platform
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Enterprise Solutions -->
    <section id="enterprise" class="projects-section">
        <div class="section-header">
            <h2>Infrastructure</h2>
        </div>
        <div class="projects-grid">
            <div class="project-card enterprise-focus">
                <div class="project-header">
                    <div class="project-title-section">
                        <h3 class="project-title">Multi-Cloud Infrastructure</h3>
                        <div class="project-badges">
                            <span class="badge cloud">Cloud</span>
                            <span class="badge devops">DevOps</span>
                        </div>
                    </div>
                </div>
                <p class="project-description">
                    Hybrid cloud architecture spanning AWS and Azure with automated deployments,
                    monitoring, and disaster recovery. Kubernetes orchestration for microservices.
                </p>
                <div class="project-highlights">
                    <div class="highlight"><span>Auto-scaling</span></div>
                    <div class="highlight"><span>Disaster Recovery</span></div>
                </div>
                <div class="project-footer">
                    <a href="/architecture" class="project-link">
                        <i class="fas fa-sitemap"></i>
                        Architecture Details
                    </a>
                </div>
            </div>

            <div class="project-card enterprise-focus">
                <div class="project-header">
                    <div class="project-title-section">
                        <h3 class="project-title">Security & Compliance Framework</h3>
                        <div class="project-badges">
                            <span class="badge security">Security</span>
                            <span class="badge compliance">HIPAA</span>
                        </div>
                    </div>
                </div>
                <p class="project-description">
                    Security framework with SSO, MFA, and HIPAA compliance.
                    Automated scanning and vulnerability management.
                </p>
                <div class="project-highlights">
                    <div class="highlight"><span>HIPAA Compliant</span></div>
                    <div class="highlight"><span>Zero Trust</span></div>
                    <div class="highlight"><span>Automated Scanning</span></div>
                </div>
                <div class="project-footer">
                    <a href="/architecture" class="project-link">
                        <i class="fas fa-shield-alt"></i>
                        Architecture Details
                    </a>
                </div>
            </div>

            <div class="project-card enterprise-focus">
                <div class="project-header">
                    <div class="project-title-section">
                        <h3 class="project-title">API Gateway & Management</h3>
                        <div class="project-badges">
                            <span class="badge api">API</span>
                            <span class="badge gateway">Gateway</span>
                        </div>
                    </div>
                </div>
                <p class="project-description">
                    Enterprise API gateway with rate limiting, authentication, and monitoring.
                    Advanced analytics and reporting.
                </p>
                <div class="project-highlights">
                    <div class="highlight"><span>Rate Limiting</span></div>
                    <div class="highlight"><span>Real-time Analytics</span></div>
                </div>
                <div class="project-footer">
                    <a href="/architecture" class="project-link">
                        <i class="fas fa-tachometer-alt"></i>
                        Architecture Details
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Technology Stack -->
    <section class="tech-stack-section">
        <div class="section-header">
            <h2>Technology Stack</h2>
        </div>
        <div class="tech-stack-grid">
            <div class="tech-stack-category">
                <h3>AI & Machine Learning</h3>
                <div class="tech-items">
                    <span class="tech-item">Python</span>
                    <span class="tech-item">TensorFlow</span>
                    <span class="tech-item">PyTorch</span>
                    <span class="tech-item">Scikit-learn</span>
                    <span class="tech-item">Transformers</span>
                    <span class="tech-item">LangChain</span>
                </div>
            </div>
            <div class="tech-stack-category">
                <h3>Healthcare</h3>
                <div class="tech-items">
                    <span class="tech-item">FHIR R4</span>
                    <span class="tech-item">HL7</span>
                    <span class="tech-item">SMART on FHIR</span>
                    <span class="tech-item">OAuth2</span>
                    <span class="tech-item">DICOM</span>
                    <span class="tech-item">Epic APIs</span>
                </div>
            </div>
            <div class="tech-stack-category">
                <h3>Cloud & DevOps</h3>
                <div class="tech-items">
                    <span class="tech-item">AWS</span>
                    <span class="tech-item">Azure</span>
                    <span class="tech-item">Kubernetes</span>
                    <span class="tech-item">Docker</span>
                    <span class="tech-item">Terraform</span>
                    <span class="tech-item">GitLab CI</span>
                </div>
            </div>
            <div class="tech-stack-category">
                <h3>Data & Analytics</h3>
                <div class="tech-items">
                    <span class="tech-item">PostgreSQL</span>
                    <span class="tech-item">MongoDB</span>
                    <span class="tech-item">Apache Spark</span>
                    <span class="tech-item">Apache Airflow</span>
                    <span class="tech-item">Elasticsearch</span>
                    <span class="tech-item">Grafana</span>
                </div>
            </div>
        </div>
    </section>
</div>
