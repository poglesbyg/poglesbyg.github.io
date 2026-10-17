---
title: Writing
permalink: /blog
description: Writing by Paul Greenwood on model evaluation, replication, and supply-chain security, mostly about results that didn't hold up on a second check.
---

<header class="page-header">
    <h1>Writing</h1>
    <p class="lede">Mostly about results that didn't hold up when checked a second way. <a href="/feed.xml">RSS</a></p>
</header>

{% for post in site.posts %}
<article class="entry">
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time></p>
    {% if post.description %}<p>{{ post.description }}</p>{% endif %}
</article>
{% endfor %}
