---
layout: default
---

<section class="intro">
    <img class="avatar" src="/assets/images/paul-greenwood-headshot-192.jpg" alt="" width="72" height="72" fetchpriority="high">
    <h1>Paul Greenwood</h1>
    <p class="lede">Health data and AI. I check whether the data and the models hold up before anyone depends on them.</p>
    <p>Most of my work has been in clinical data. At UNC Chapel Hill's School of Medicine I built LLM tools for clinical research, working from FHIR, Epic, and clinical NLP, and earned an MPS in Bioinformatics &amp; Health Informatics. I'm now a data scientist and manager on a USDA Forest Service contract.</p>
    <p>I'm skeptical of AI in the way clinical data requires. A model that scores well can still fail at its operating point, and data that looks clean can be missing what matters. I look for those failures first, and I write down what I find.</p>
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
        <li><a href="/projects#sepsis-early-warning">sepsis-early-warning</a> <span class="meta">A clinical model tested across ICUs: its AUROC held, and its alerts lost 91% of their value.</span></li>
        <li><a href="/projects#capscan">capscan</a> <span class="meta">Audits what third-party code gains the ability to do before you accept an update.</span></li>
        <li><a href="/projects#decidex">decidex</a> <span class="meta">Keeps a record of what was decided, and why, where AI tools working on the code will read it.</span></li>
    </ul>
    <p><a href="/projects">All projects &rarr;</a></p>
</section>

<section>
    <h2>Experience</h2>
    <p>At UNC Chapel Hill's School of Medicine I worked across the clinical data stack: a cloud data warehouse and the BI layer on top of it, external feeds from health information exchanges, and the data behind federal quality reporting, where a wrong number has consequences. I evaluated AI vendors, led AI pilots, and wrote the governance framework that covered them, including data classification, stewardship, and access controls.</p>
    <ul class="list">
        <li>Data Scientist / Manager <span class="meta">Leading Solutions, LLC, for the USDA Forest Service &middot; 2025&ndash;present</span></li>
        <li>Product Manager &amp; Developer <span class="meta">UNC Chapel Hill School of Medicine &middot; 2023&ndash;2025</span></li>
        <li>Project &amp; Program Management <span class="meta">UNC Chapel Hill School of Medicine &middot; 2019&ndash;2023</span></li>
        <li>MPS, Bioinformatics &amp; Health Informatics <span class="meta">UNC Chapel Hill &middot; 2021&ndash;2025</span></li>
    </ul>
</section>
