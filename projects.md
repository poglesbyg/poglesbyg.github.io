---
title: Projects
layout: default
description: Projects by Paul Greenwood — clinical machine learning evaluation, Rust dependency capability scanning, AI-assisted engineering decision tracking, and lightweight tracing.
---

<div class="page-hero">
    <div class="page-hero-content">
        <h1>Projects</h1>
        <p class="page-hero-description">Open-source work on clinical model evaluation, AI-assisted engineering workflows, and Rust supply-chain security.</p>
    </div>
</div>

<div class="recent-projects-minimal">
    <div class="projects-grid-minimal">
        <div class="project-card-minimal">
            <span class="project-status">Python · Research</span>
            <h3>sepsis-early-warning</h3>
            <p>Early sepsis prediction from ICU time series (PhysioNet/CinC 2019), built to measure the failures instead of asserting their absence. Moving the model from medical to surgical ICU costs almost no AUROC and 91% of its clinical value — discrimination and the operating point fail independently, and a single external AUROC column hides both. The pipeline enforces admission-level splits and strictly causal features, commits the leakage mistake deliberately to measure what it would have bought, and pins every published number to a regression check.</p>
            <div class="project-card-links">
                <a href="https://github.com/poglesbyg/sepsis-early-warning" target="_blank" rel="noopener noreferrer" class="view-all-link">View on GitHub →</a>
                <a href="/blog/2026/08/28/your-model-transferred-your-alerts-didnt/" class="view-all-link">Read the write-up →</a>
            </div>
        </div>
        <div class="project-card-minimal">
            <span class="project-status">Rust · CLI</span>
            <h3>capscan</h3>
            <p><code>cargo update</code> can silently hand a dependency new abilities — a build script, a new <code>unsafe fn</code>, a socket. capscan does a structural pass over a crate's source and reports what capabilities changed between two versions, so you know before you approve the update. Ships as a cargo subcommand, plus an MCP server (<a href="https://github.com/poglesbyg/capscan-mcp" target="_blank" rel="noopener noreferrer">capscan-mcp</a>) for agent-driven audits and a scheduled <a href="https://github.com/poglesbyg/capscan-leaderboard" target="_blank" rel="noopener noreferrer">leaderboard</a> tracking capability drift across popular crates.io packages.</p>
            <div class="project-card-links">
                <a href="https://github.com/poglesbyg/capscan" target="_blank" rel="noopener noreferrer" class="view-all-link">View on GitHub →</a>
            </div>
        </div>
        <div class="project-card-minimal">
            <span class="project-status">Node · CLI</span>
            <h3>decidex</h3>
            <p>AI coding tools forget everything between sessions. decidex extracts engineering decisions from git history and surfaces them in <code>CLAUDE.md</code>, Cursor rules, and GitHub Copilot instructions — so agents know what's already been decided, what's been rejected, and why.</p>
            <div class="project-card-links">
                <a href="https://github.com/poglesbyg/decidex" target="_blank" rel="noopener noreferrer" class="view-all-link">View on GitHub →</a>
            </div>
        </div>
        <div class="project-card-minimal">
            <span class="project-status">Rust · Library</span>
            <h3>tracelet</h3>
            <p>A minimal, embeddable Rust tracer built on the <code>#[tracing::instrument]</code> spans you already use — without pulling in the OpenTelemetry dependency tree.</p>
            <div class="project-card-links">
                <a href="https://github.com/poglesbyg/tracelet" target="_blank" rel="noopener noreferrer" class="view-all-link">View on GitHub →</a>
            </div>
        </div>
    </div>
</div>
