---
layout: home
title: Home
---

<div class="hero-section-minimal">
    <div class="hero-content-minimal">
        <div class="hero-avatar-minimal">
            <img src="{{ site.baseurl }}/assets/images/paul-greenwood-headshot.jpeg" alt="Paul Greenwood" class="hero-image" width="100" height="100" fetchpriority="high">
        </div>
        <div class="hero-text-minimal">
            <h1>Paul Greenwood</h1>
            <p class="hero-subtitle">Data Scientist — Environmental & Natural Resource Systems</p>
            <p class="hero-bio">
                Building data tools for federal natural resource work at USDA Forest Service. Background in healthcare AI — FHIR, Epic, clinical NLP. Most of what I write down is about measuring whether a result survives being checked a second way.
            </p>
            <div class="hero-cta-minimal">
                <a href="/projects" class="cta-link">Projects</a>
                <a href="/blog" class="cta-link cta-secondary">Writing</a>
                <a href="/contact" class="cta-link cta-secondary">Get in Touch</a>
            </div>
        </div>
    </div>
</div>

<div class="experience-section-minimal">
    <h2>Experience</h2>
    <div class="experience-timeline">
        <div class="experience-item">
            <h3>Data Scientist/Manager</h3>
            <p class="role-meta">Leading Solutions, LLC // USDA Forest Service · 2025–Present</p>
            <p>Environmental data science supporting federal natural resource initiatives.</p>
        </div>
        <div class="experience-item">
            <h3>Sepsis Early Warning — Independent Project</h3>
            <p class="role-meta">Clinical machine learning · PhysioNet/CinC 2019 · 2026</p>
            <p>Early sepsis prediction from ICU time series, built to measure its own failures rather than assert their absence. Moving the model from medical to surgical ICU costs almost no AUROC and 91% of its clinical value — discrimination and the operating point fail independently, and one external AUROC column hides both.</p>
        </div>
        <div class="experience-item">
            <h3>Product Manager & Developer</h3>
            <p class="role-meta">UNC Chapel Hill School of Medicine · 2023–2025</p>
            <p>Built LLM-powered tools for clinical research and healthcare delivery.</p>
        </div>
        <div class="experience-item">
            <h3>Project & Program Management</h3>
            <p class="role-meta">UNC Chapel Hill School of Medicine · 2019–2023</p>
            <p>Progressed from administrative to project management roles, building healthcare systems expertise across UNC research programs.</p>
        </div>
    </div>
</div>

<div class="experience-section-minimal">
    <h2>Recent writing</h2>
    <div class="blog-list-compact">
        {% for post in site.posts limit: 2 %}
        <article class="blog-list-item">
            <time datetime="{{ post.date | date_to_xmlschema }}" class="blog-list-date">{{ post.date | date: "%B %-d, %Y" }}</time>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            {% if post.description %}<p>{{ post.description }}</p>{% endif %}
        </article>
        {% endfor %}
    </div>
    <a href="/blog" class="view-all-link">All writing →</a>
</div>
