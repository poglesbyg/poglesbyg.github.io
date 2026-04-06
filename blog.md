---
layout: default
title: Blog
permalink: /blog/
---

<div class="page-hero">
    <div class="page-hero-content">
        <h1>Blog</h1>
    </div>
</div>

<div class="blog-container">
    
    <div class="blog-grid">
        {% for post in site.posts %}
        <article class="blog-card">
            {% if post.image %}
            <div class="blog-image">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
            </div>
            {% endif %}
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">
                        <i class="far fa-calendar"></i>
                        {{ post.date | date: "%B %d, %Y" }}
                    </span>
                    {% if post.categories.size > 0 %}
                    <span class="blog-category">
                        <i class="fas fa-folder"></i>
                        {{ post.categories | first }}
                    </span>
                    {% endif %}
                </div>
                <h2 class="blog-title">
                    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                </h2>
                <p class="blog-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
                {% if post.tags.size > 0 %}
                <div class="blog-tags">
                    {% for tag in post.tags %}
                    <span class="blog-tag">{{ tag }}</span>
                    {% endfor %}
                </div>
                {% endif %}
                <a href="{{ post.url | relative_url }}" class="read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
        {% endfor %}
    </div>

    {% if site.posts.size == 0 %}
    <div class="no-posts">
        <i class="fas fa-newspaper"></i>
        <h2>No Posts Yet</h2>
        <p>Check back soon for new content!</p>
    </div>
    {% endif %}
</div> 
