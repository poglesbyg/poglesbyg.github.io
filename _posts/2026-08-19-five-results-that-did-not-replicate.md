---
layout: post
title: "Five results that did not replicate"
date: 2026-08-19
categories: [machine-learning, evaluation]
tags: [knowledge-graphs, link-prediction, replication, graphrag, biomedical]
description: "I spent a week measuring a biomedical knowledge graph system. Five separate results looked solid at a single configuration and dissolved under a second one. Here is each mechanism, and the one that nearly shipped as a feature."
---

The README said Phases 1, 2 and 3 were complete. The test suite had never run:
a `pyproject.toml` misconfiguration produced an empty `.pth`, so every test
errored at collection and nobody noticed. That's where
[LitKG](https://github.com/poglesbyg/LitKG) started, a system that fuses
biomedical literature with curated knowledge graphs to propose associations
nobody's written down yet.

Getting the suite green was the easy part. The interesting part was what
happened once there was enough measurement infrastructure to check things.
Five results, each measured carefully, each looking solid, each dissolving when
I ran it a second way. One of them I was a single step from shipping as a
feature that would have made the system worse.

## 1. "The graph is too sparse for link prediction"

The first real evaluation was a temporal holdout: train on associations
published before 2016, test on what got curated afterwards. Adamic-Adar, the
standard structural baseline, reached AUC 0.543 against a random floor of 0.498.
Hits@1 was 0.000 for every predictor.

I wrote it up as a negative result. The graph was too sparse, 84.6% of held-out
pairs shared no neighbour, and adding a GNN wouldn't help, because message
passing propagates over the same sparse topology.

That was an artefact of measuring it the wrong way. The CIVIC graph is **strictly
multipartite**: zero of its 6,769 edges join two nodes of the same type, and
100% of held-out pairs are cross-type. Two nodes of different types can only
share a neighbour through some third type adjacent to both, and that's rare. So
Adamic-Adar wasn't measuring a weak graph. It was *undefined* on it, returning
exactly 0.0 for 85% of pairs.

The giveaway was the distance profile. Most "unreachable" pairs sat at distance
**3**, and only 14% were disconnected at all. In a multipartite graph, nodes of
different types meet at odd distance. Counting length-3 paths instead of
length-2 gets AUC 0.692 on the same data with no new information.

The lesson generalises past this repo: match the predictor to the topology
before blaming the data. The evaluation harness now reports what fraction of
edges join same-type nodes and warns when that fraction is near zero.

## 2. "MRR doubled"

Recovering edge attributes the pipeline was discarding, 11 relation predicates,
curator confidence, and 1,731 negation flags, moved mean reciprocal rank from
0.0072 to 0.0144. I put "MRR has doubled" in a changelog.

Then I computed a confidence interval and found it spanned [0.0066, 0.0135],
which is about as wide as the value itself.

The reason is structural. Each positive is ranked against the entire negative
pool, roughly 1,200 positives against 12,000 negatives. The top 20 positives
supply 78% of MRR and only about 26 reach the top ten at all. The metric's determined by a couple of dozen rows.

Worse, I had already been burned by variance once and introduced multi-seed
checks for AUC. I applied that discipline to the stable metric and left the
noisy one on single runs. Every metric now ships a bootstrap interval, and two
claims came back out of the docs.

## 3. An inverted precision curve, with a supporting statistic

Ranking the full candidate space, about 207,000 unobserved pairs, one run
produced a precision curve that got *better* with depth: 1 hit in the top 100,
71 more between ranks 100 and 500. That's backwards for any working ranking.

I had an explanation and a statistic to back it. The top predictions sat on
much better-connected nodes than the ones that panned out, median endpoint
degree product 189 against 49, and five drugs occupied 85 of 200 endpoint slots.
The model was ranking obviousness over novelty. It's a good story, and it's the
sort of thing that ends up as a section heading.

Five seeds showed the curve is monotonic. The inversion was one unlucky seed,
and the degree statistic was computed from that same run.

I also tested the fix that story implied, dividing scores by node degree. It
made ranking worse at every depth. Degree isn't bias to divide out here.
Well-studied genes genuinely do have more true associations.

## 4. A filter that never paid off, except at one cutoff

This is the one that nearly shipped.

Running confidence scoring over real predictions produced a clean result:
curation rates varied enormously by entity-type pair. Disease-mutation pairs
were curated 32.7% of the time. Mutation-phenotype pairs were curated **0 times
out of 147**, and they were 29% of the ranked output.

That's a one-line filter worth a six-fold precision improvement, and I was about
to ship it.

At other cutoffs:

| type pair | 2016 | 2018 | 2020 |
|---|---|---|---|
| disease-mutation | 36/80 (45%) | 1/24 (4%) | 2/31 (6%) |
| drug-mutation | 8/391 (2%) | 0/211 (0%) | 1/386 (0.3%) |
| mutation-phenotype | 1/28 (4%) | 1/265 (0.4%) | 1/79 (1%) |

The category that "never pays off" pays off at roughly the same low rate as
everything else once the cutoff moves. Shipping that filter would have degraded
results at every cutoff except the one it was derived from.

## 5. The headline claim

The best result the project produced: a model trained only on pre-2016 evidence,
ranking every unobserved pair, put later-curated associations in its top 100 at
**35 times the base rate**. That's prospective validation, and it's the claim the
whole system exists to support.

| cutoff | base rate | P@100 | lift@100 | lift@500 |
|---|---|---|---|---|
| 2016 | 0.429% | 15.0% | **35x** | 21x |
| 2018 | 0.188% | 1.0% | 5x | 2x |
| 2020 | 0.125% | 0.0% | **0x** | 6x |

2016 is an outlier at both depths. The obvious explanation, that later cutoffs
leave less subsequent curation in the data, doesn't fit. Lift is already
normalised by base rate, and 2018 is *worse* than 2020 at depth 500. I don't
have an account of what makes 2016 special, and the README now says the claim is
withdrawn rather than offering one.

## What survived

Replication isn't only a way to lose results. Three held up under the same
scrutiny that killed the others:

- **Link prediction at AUC 0.752 ± 0.007**, eight seeds, intervals disjoint from
  the 0.692 structural baseline.
- **Retrieval at MRR 0.81**, hit-rate 0.98, on 57 queries whose relevance
  judgements come from CIVIC citations rather than from me or from an LLM
  grading its own retrieval.
- **A GNN representation collapse, root-caused.** The cross-modal architecture
  the project is named for scored at chance because every node ended up the same
  vector. Over-smoothing was the obvious diagnosis, and it survived two attempted
  fixes.

That last one's worth its own paragraph, because the disconfirming evidence was
the useful part. A single message-passing layer collapsed just as completely as
three. Random input features produced almost no collapse. That pointed upstream
of the model entirely: **mean-pooled PubMedBERT vectors sit at a mean pairwise
cosine of 0.930 before the model sees them.** The collapse was 93% finished
before layer one, which is exactly why reducing depth never helped it. Centring the
feature matrix takes the input to 0.214 and the score from 0.492 to 0.633.

If you're debugging a GNN that produces identical embeddings, check your input
anisotropy before you touch the architecture.

## What I got wrong about being wrong

The pattern in all five is the same shape: I measured one configuration
carefully, got a result consistent with a plausible mechanism, and wrote the
mechanism down as though the measurement had established it.

Careful measurement isn't the same as replicated measurement, and every one of
these was careful. The bootstrap intervals were correct, the temporal split had
real leakage guards, the negatives were degree-matched to control for
popularity. None of it helps when the whole apparatus runs once.

Two kinds of noise turned out to matter independently, and I had to learn each
separately: bootstrap intervals cover sampling in the test set, seed variance
covers training. Checking one and not the other gave me a run whose confidence
interval looked conclusive while two four-seed repeats of the same configuration
disagreed by more than the effect.

The working rule the repo now states, including about its own status table: a
single-seed or single-cutoff number is a hypothesis. The harnesses that caught
all five are in the repository, and running them is cheaper than believing a
number that's about to be withdrawn.

---

The project, the evaluation harnesses, and the docs recording each withdrawn
claim are on [GitHub](https://github.com/poglesbyg/LitKG). To re-run the
comparison that killed the headline result:

```bash
python scripts/replicate_prospective.py --cutoffs 2016 2018 2020
```

`docs/Evaluation.md` covers the temporal holdout, the degree-matched
negatives, and what each number is and isn't evidence for.
