---
title: Projects
layout: default
description: Open-source developer tools by Paul Greenwood — Rust dependency capability scanning, AI-assisted engineering decision tracking, and lightweight tracing.
---

<div class="page-hero">
    <div class="page-hero-content">
        <h1>Projects</h1>
        <p class="page-hero-description">Open-source tools for AI-assisted engineering workflows and Rust supply-chain security.</p>
    </div>
</div>

<div class="recent-projects-minimal">
    <div class="projects-grid-minimal">
        <div class="project-card-minimal">
            <span class="project-status">Rust · CLI</span>
            <h3>capscan</h3>
            <p><code>cargo update</code> can silently hand a dependency new abilities — a build script, a new <code>unsafe fn</code>, a socket. capscan does a structural pass over a crate's source and reports what capabilities changed between two versions, so you know before you approve the update. Ships as a cargo subcommand, plus an MCP server (<a href="https://github.com/poglesbyg/capscan-mcp" target="_blank" rel="noopener noreferrer">capscan-mcp</a>) for agent-driven audits and a scheduled <a href="https://github.com/poglesbyg/capscan-leaderboard" target="_blank" rel="noopener noreferrer">leaderboard</a> tracking capability drift across popular crates.io packages.</p>
            <a href="https://github.com/poglesbyg/capscan" target="_blank" rel="noopener noreferrer" class="view-all-link">View on GitHub →</a>
        </div>
        <div class="project-card-minimal">
            <span class="project-status">Node · CLI</span>
            <h3>decidex</h3>
            <p>AI coding tools forget everything between sessions. decidex extracts engineering decisions from git history and surfaces them in <code>CLAUDE.md</code>, Cursor rules, and GitHub Copilot instructions — so agents know what's already been decided, what's been rejected, and why.</p>
            <a href="https://github.com/poglesbyg/decidex" target="_blank" rel="noopener noreferrer" class="view-all-link">View on GitHub →</a>
        </div>
        <div class="project-card-minimal">
            <span class="project-status">Rust · Library</span>
            <h3>tracelet</h3>
            <p>A minimal, embeddable Rust tracer built on the <code>#[tracing::instrument]</code> spans you already use — without pulling in the OpenTelemetry dependency tree.</p>
            <a href="https://github.com/poglesbyg/tracelet" target="_blank" rel="noopener noreferrer" class="view-all-link">View on GitHub →</a>
        </div>
    </div>
</div>
