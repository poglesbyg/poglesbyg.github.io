---
layout: default
---

<section class="intro">
    <img class="avatar" src="/assets/images/paul-greenwood-headshot-192.jpg" alt="" width="72" height="72" fetchpriority="high">
    <h1>Paul Greenwood</h1>
    <p class="lede">Data scientist. I measure whether results survive a second check.</p>
    <p>I do environmental data science for the USDA Forest Service. Before that I built LLM tools for clinical research at UNC Chapel Hill, out of a background in FHIR, Epic, and clinical NLP.</p>
</section>

<section>
    <h2>Writing</h2>
    <ul class="list">
        {% for post in site.posts limit: 3 %}
        <li>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            <time class="meta" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
        </li>
        {% endfor %}
    </ul>
    <p><a href="/blog">All writing &rarr;</a></p>
</section>

<section>
    <h2>Projects</h2>
    <ul class="list">
        <li><a href="/projects#sepsis-early-warning">sepsis-early-warning</a> <span class="meta">Sepsis prediction built to measure how it fails when it moves between ICUs.</span></li>
        <li><a href="/projects#capscan">capscan</a> <span class="meta">Shows what new capabilities a Rust dependency gained between two versions.</span></li>
        <li><a href="/projects#decidex">decidex</a> <span class="meta">Moves engineering decisions out of git history and into the files AI coding tools read.</span></li>
    </ul>
    <p><a href="/projects">All projects &rarr;</a></p>
</section>

<section>
    <h2>Experience</h2>
    <ul class="list">
        <li>Data Scientist / Manager <span class="meta">Leading Solutions, LLC, for the USDA Forest Service &middot; 2025&ndash;present</span></li>
        <li>Product Manager &amp; Developer <span class="meta">UNC Chapel Hill School of Medicine &middot; 2023&ndash;2025</span></li>
        <li>Project &amp; Program Management <span class="meta">UNC Chapel Hill School of Medicine &middot; 2019&ndash;2023</span></li>
        <li>MPS, Bioinformatics &amp; Health Informatics <span class="meta">UNC Chapel Hill &middot; 2021&ndash;2025</span></li>
    </ul>
</section>
