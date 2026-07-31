---
title: Writing
layout: default
description: Writing by Paul Greenwood on Rust supply-chain security, developer tooling, and data science.
---

<div class="page-hero">
    <div class="page-hero-content">
        <h1>Writing</h1>
        <p class="page-hero-description">Notes on developer tooling, supply-chain security, and whatever I've been measuring lately.</p>
    </div>
</div>

<div class="blog-list">
    {% for post in site.posts %}
    <article class="blog-list-item">
        <time datetime="{{ post.date | date_to_xmlschema }}" class="blog-list-date">{{ post.date | date: "%B %-d, %Y" }}</time>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        {% if post.description %}<p>{{ post.description }}</p>{% endif %}
        <a href="{{ post.url | relative_url }}" class="view-all-link">Read →</a>
    </article>
    {% endfor %}
</div>
