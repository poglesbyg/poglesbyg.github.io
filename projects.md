---
title: Projects
permalink: /projects
description: Projects by Paul Greenwood, including clinical model evaluation, Rust dependency capability scanning, AI-assisted engineering decision tracking, a lightweight Rust tracer, and a macOS meditation app.
---

<header class="page-header">
    <h1>Projects</h1>
    <p class="lede">Open-source work on clinical model evaluation, AI-assisted engineering workflows, and Rust supply-chain security.</p>
</header>

<article class="project" id="sepsis-early-warning">
    <h2>sepsis-early-warning</h2>
    <p class="meta">Python &middot; Research</p>
    <p>Early sepsis prediction from ICU time series (PhysioNet/CinC 2019), built to measure the failures instead of asserting their absence. Moving the model from medical to surgical ICU costs almost no AUROC and 91% of its clinical value. Discrimination and the operating point fail independently, and a single external AUROC column hides both. The pipeline enforces admission-level splits and strictly causal features, commits the leakage mistake deliberately to measure what it would have bought, and pins every published number to a regression check.</p>
    <p class="links"><a href="https://github.com/poglesbyg/sepsis-early-warning">Code</a> <a href="/blog/2026/08/28/your-model-transferred-your-alerts-didnt/">Write-up</a></p>
</article>

<article class="project" id="capscan">
    <h2>capscan</h2>
    <p class="meta">Rust &middot; CLI</p>
    <p><code>cargo update</code> can silently hand a dependency new abilities: a build script, a new <code>unsafe fn</code>, a socket. capscan does a structural pass over a crate's source and reports what capabilities changed between two versions, so you know before you approve the update. Ships as a cargo subcommand, plus an MCP server (<a href="https://github.com/poglesbyg/capscan-mcp">capscan-mcp</a>) for agent-driven audits and a scheduled <a href="https://poglesbyg.github.io/capscan-leaderboard/">leaderboard</a> tracking capability drift across popular crates.io packages.</p>
    <p class="links"><a href="https://github.com/poglesbyg/capscan">Code</a> <a href="/blog/2026/07/31/whats-actually-in-the-top-100-rust-crates/">Write-up</a></p>
</article>

<article class="project" id="decidex">
    <h2>decidex</h2>
    <p class="meta">TypeScript &middot; CLI</p>
    <p>AI coding tools forget everything between sessions. decidex extracts engineering decisions from git history and surfaces them in <code>CLAUDE.md</code>, Cursor rules, and GitHub Copilot instructions, so agents know what's already been decided, what's been rejected, and why.</p>
    <p class="links"><a href="https://github.com/poglesbyg/decidex">Code</a></p>
</article>

<article class="project" id="tracelet">
    <h2>tracelet</h2>
    <p class="meta">Rust &middot; Library</p>
    <p>A minimal, embeddable Rust tracer built on the <code>#[tracing::instrument]</code> spans you already use, without pulling in the OpenTelemetry dependency tree.</p>
    <p class="links"><a href="https://github.com/poglesbyg/tracelet">Code</a></p>
</article>

<article class="project" id="stillpoint">
    <h2>Stillpoint</h2>
    <p class="meta">Swift &middot; macOS app</p>
    <p>A meditation timer and mindfulness bell that lives in the Mac menu bar. Timed sits with interval bells, a history of streaks and minutes sat, and an optional bell through the day at irregular intervals so it doesn't fade into background noise. Free and open source, and installable with Homebrew.</p>
    <p class="links"><a href="https://github.com/poglesbyg/MindfulBell">Code</a> <a href="/stillpoint/">Download &amp; support</a></p>
</article>
