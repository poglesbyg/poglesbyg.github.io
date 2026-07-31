---
layout: post
title: "What's actually in the top 100 Rust crates"
date: 2026-07-31
categories: [rust, security]
tags: [rust, supply-chain, static-analysis, capscan]
description: "I scanned the 100 most-downloaded crates on crates.io for capability surface: unsafe, FFI, process spawning, network access, build scripts. 73% of everything comes from two crates, and most of the alarming numbers are test code."
---

When you run `cargo update`, you accept whatever the new version does. Not what
it did when you vetted it. What it does now. A `build.rs` that wasn't there
before, a new `unsafe fn`, a socket, a `Command::new`. None of it shows up in a
normal diff review, because nobody reviews vendored dependency source on every
update.

I built [capscan](https://github.com/poglesbyg/capscan) to make that visible: a
structural pass over a crate's source with [`syn`](https://docs.rs/syn) that
reports what capabilities a crate has, and what changed between two versions.
Having built it, the obvious question was what the ecosystem looks like through
it. So I scanned the 100 most-downloaded crates on crates.io.

Most of the alarming numbers turn out to be noise. And counting `unsafe` across
your dependency tree, which is the metric people reach for, mostly measures
whether you target an operating system.

## The corpus

The 100 most-downloaded crates by all-time download count, pulled from the
crates.io API on 2026-07-20, sorted by `downloads` descending, no manual
filtering. So the list includes things you'd probably curate away if you were
picking by hand: seven near-empty `windows_*` linkage shims, split proc-macro
crates like `serde_derive` and `thiserror-impl`, `autocfg`. That's what the real
ranking looks like, and curating it would beg the question.

Scanning is source-level and syntactic. capscan parses each `.rs` file and
records structural facts: `unsafe` blocks, `extern "C"` blocks,
`mem::transmute`, process spawns, socket constructors, filesystem writes,
environment reads, build scripts, proc-macro declarations, `links` keys. It
doesn't run anything, and it isn't a vulnerability scanner. It answers "what can
this code do," not "is this code malicious."

Across all 100 crates, in code that actually ships to a consumer: **24,353
signals**.

## Two crates are 73% of everything

| Crate | Signals | Share |
|---|---:|---:|
| `linux-raw-sys` | 8,964 | 36.8% |
| `windows-sys` | 8,926 | 36.7% |
| `rustix` | 1,542 | 6.3% |
| `tokio` | 855 | 3.5% |
| `zerocopy` | 358 | 1.5% |
| **top 5 combined** | | **84.8%** |
| **top 10 combined** | | **90.2%** |

`linux-raw-sys` and `windows-sys` are machine-generated syscall bindings.
Between them they account for **73.5%** of every capability signal in the 100
most-depended-on crates in the Rust ecosystem. Neither is doing anything
surprising. They're a mechanical transcription of an OS ABI, and the `unsafe` is
what they're for.

The distribution is the interesting part. Median unsafe-family signals per
crate: **4.5**. Mean: **236**. A mean fifty times the median isn't a population,
it's two outliers and a lot of quiet crates. Thirteen of the hundred have *zero*
capability signals of any kind:

> `base64`, `bitflags`, `cfg-if`, `fastrand`, `fnv`, `futures-io`, `heck`,
> `miniz_oxide`, `rand_chacha`, `regex-syntax`, `strsim`, `typenum`,
> `unicode-width`

So any metric that sums `unsafe` across a dependency tree is dominated by
whether you transitively pull in platform bindings. Add `rustix` and your number
explodes. That tells you nothing about risk, only that you compile for an
operating system.

## Test code roughly doubles the scary categories

This one I got wrong in my own tool first, which I'll come back to.

`tests/`, `benches/`, and `examples/` are compiled when you work *on* a crate,
never when you depend on it. A socket opened in an integration test isn't part
of your supply chain. Counting it anyway changes the picture a lot:

| Signal | Including test code | Shipped code only | Crates affected |
|---|---:|---:|---|
| `NetworkAccess` | 227 | 92 | 7 → **3** |
| `FilesystemWrite` | 155 | 37 | 12 → 9 |
| `ProcessSpawn` | 57 | 36 | 16 → 12 |
| `UnsafeBlock` | 17,902 | 17,776 | 65 → 65 |

Note the last row. `unsafe` barely moves, because it lives in library code,
which is what you'd expect. But network access more than halves, and the number
of crates that appear to touch the network drops from seven to three.

The three left are `tokio` (49), `mio` (42), and `socket2` (1), all of which are
networking libraries. The four that drop out (`h2`, `serde_json`, `tempfile`,
`syn`) only bind sockets in their own test suites. `syn`'s single "network
access" was a `reqwest::blocking::get` in `tests/repo/mod.rs`, a test harness
that downloads a corpus of Rust source to parse against.

**In shipped code, across the 100 most-downloaded crates on crates.io, no
non-networking crate opens a socket.** That's a reassuring result, and I haven't
found anywhere it had been checked.

## `build.rs` is the scariest mechanism and the most boring in practice

A build script is arbitrary code executed on your machine, with your privileges,
at compile time. It's the most dangerous thing in the packaging model, and the
mechanism behind most practical "malicious crate" scenarios.

Twenty-one of the hundred crates ship one. Here's everything those 21 build
scripts do:

| Signal | Count |
|---|---:|
| `EnvRead` (`env::var`, `env::var_os`) | 75 |
| build script present | 21 |
| `ProcessSpawn` | 16 |
| `FilesystemWrite` | 5 |
| build-time macro | 2 |

119 signals total, 0.5% of the corpus. Three quarters of that is reading
environment variables, and the process spawns are `rustc --version` probes:
`libc`, `anyhow`, `proc-macro2`, `rustix`, `thiserror`, `quote`, `serde`, and
`zerocopy` all shell out at build time to detect the compiler version so they
can gate `cfg` flags. Seven of the 21 are `windows_*` shims whose entire build
script reads one environment variable.

So among the crates everyone depends on, the most dangerous mechanism in the
ecosystem is mostly version detection. That's useful mainly because it means
anything unusual here would be easy to spot.

## What I got wrong

Running this surfaced two real bugs in capscan, both of which inflated the
numbers I would have published.

**`clap::Command::new` is not a process spawn.** capscan matched process
spawning with `path.ends_with("Command::new")`. clap's argument-parser builder
is also called `Command` and also has `::new`. That one name collision produced
39 false positives in clap alone, more than the corpus's entire real shipped
process-spawn count of 36.

The fix is file-local resolution: read the file's `use` statements, resolve the
call path through them, and classify on what the name actually refers to. `use
clap::Command; Command::new(..)` resolves to `clap::Command` and gets dropped.
`use std::process::Command as Proc; Proc::new(..)` resolves to
`std::process::Command` and is kept. That also fixed a false *negative*, since
aliased imports were previously invisible to every detector. A bare
`Command::new` that can't be resolved at all is still flagged; for a security
tool, a false positive beats a miss.

**Test directories were being counted.** The scanner walked every `.rs` file
under the crate root. That's the section above: my own tool was producing the
distortion the finding is about. `tests/`, `benches/`, and `examples/` are now
excluded by default, and tagged `dev` if you opt back in with `--include-dev`.
`build.rs` is explicitly *not* dev-scoped, since it runs on the consumer's
machine.

Both are fixed in capscan 0.4.0, and every number here comes from the fixed
scanner.

What's still broken, and stays broken without a real compiler front end: glob
imports (`use std::process::*`) bind names capscan can't enumerate, re-export
chains the calling file doesn't import directly won't resolve, and anything a
proc-macro generates is invisible, because capscan reads the macro's own source
rather than its expansion at your call sites. This is fast heuristic triage. It
tells you where to look, not that everything else is fine.

## So what's the useful number?

Aggregate capability counts are close to useless for supply-chain risk. They're
dominated by generated bindings and inflated by code that never ships, and
there's no baseline to compare against. 17,776 `unsafe` blocks isn't something
anyone can act on.

The number that means something is the delta: what did *this* version gain over
the one you already have? When `libc` went 0.2.186 to 0.2.188 during this work,
it added 15 signals and removed 11. Fifteen things is a code review. libc's 275
total is something you scroll past.

That's what capscan does. Mostly the scan convinced me the ecosystem is quieter
than the totals make it look.

---

Reproduce any of this:

```bash
cargo install capscan
cargo capscan scan serde 1.0.229
cargo capscan diff libc 0.2.186 0.2.188
```

The corpus and the tracking pipeline are
[capscan-leaderboard](https://github.com/poglesbyg/capscan-leaderboard);
`crates.txt` documents the exact crates.io query behind the ranking. capscan
itself is [on GitHub](https://github.com/poglesbyg/capscan) and
[crates.io](https://crates.io/crates/capscan).
