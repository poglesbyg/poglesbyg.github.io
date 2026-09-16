---
layout: post
title: "Five results that did not replicate"
date: 2026-08-19
categories: [machine-learning, evaluation]
tags: [knowledge-graphs, link-prediction, replication, graphrag, biomedical]
description: "I spent a week measuring a biomedical knowledge graph system. Five separate results looked solid at a single configuration and dissolved under a second one. Here is each mechanism, and the one that nearly shipped as a feature."
---

*Updated September 2026. Two more results failed, the interval under "What
survived" turned out to be too narrow, one real improvement nearly got thrown
away by the rule this post ends on, and the headline claim came back in a much
smaller form. The update is at the end.*

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
withdrawn rather than offering one. A re-run with the improved model later
brought back a smaller version of it, and suggested what made 2016 special; see
the update.

## What survived

Replication isn't only a way to lose results. Three held up under the same
scrutiny that killed the others:

- **Link prediction at AUC 0.752 ± 0.007**, eight seeds, intervals disjoint from
  the 0.692 structural baseline. That interval was too narrow, for reasons in
  the update below.
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

## Update, September 2026: seven, and one that went the other way

I kept working on the project for a few more weeks, and the rule above got
tested harder than I expected. It caught two more results, both mine. It also
came close to discarding the largest real improvement the project has had, and
the headline claim it withdrew came back smaller.

### Numbers six and seven were mine

Six: I added protein-interaction edges from STRING and fed them to the hybrid
model. Four seeds showed AUC up 0.025. Eight seeds showed nothing, because one
seed in the four-seed baseline had landed at 0.676 and dragged its mean down. I'd
done that shortly after publishing a post about exactly this.

Seven: the model carrying the headline number turned out to have the same input
problem described above, text features at a mean pairwise cosine of 0.927. I
predicted it explained that model's wide seed spread. Centring the features
tightened the spread 4.2x at the 2016 cutoff. At 2020 it didn't change it, and
for the GNN on its own the spread got wider.

### The interval under "What survived" was too narrow

Two separate problems were inflating confidence.

Runs weren't reproducible for a fixed seed, which the repo had recorded as a
fact of life rather than a bug. The training graph was built from a Python set,
so edge order changed with the hash seed between processes. Many edges share a
publication year and the temporal sort was stable, so that arbitrary order
decided which edges landed in the validation slice. Separately, multi-threaded
aggregation summed floats in whatever order the threads finished. Sorting the
edges and training on one thread made three separate processes agree to six
decimal places. Every variance figure before that mixed seed variance with
process noise.

The hybrid's blend weight was also chosen on a validation slice that leaked.
Validation positives were scored while their own edges were still in the graph,
so a path counter could walk the edge it was being asked to predict. That
inflated length-3 path scores 3.48x, and the negatives got no such boost. With
the leak fixed, choosing a weight at all did worse than not choosing one: a
fixed even blend reached 0.7451 ± 0.0123 against 0.7404 ± 0.0214. The leaky
version had reported ± 0.0066. It looked stable because the leak pushed every
seed toward the same answer.

### The rule nearly discarded the biggest win

The training loop took one optimizer step per epoch, and early stopping fired
after 75 to 135 epochs, so the model was fitted in about 150 gradient updates.
Eight steps per epoch looked better in every configuration, and in every
configuration its seed range overlapped the baseline's. By the rule this post
ends on, that's no difference.

Both arms used the same seeds, though, and comparing ranges throws that pairing
away. Compared seed by seed, eight steps beat one on AUC in **29 of 32** pairs
across two models and two cutoffs, and on average precision in 31 of 32. The
worst loss was 0.009 and the best win 0.101. Sixteen and thirty-two steps didn't
beat eight (6 of 16 and 8 of 16 pairs), so eight is where it levels off.

Overlapping intervals are a reasonable test for independent samples. When the
runs share seeds it's the wrong test, and it fails in the direction of finding
nothing.

### Check whether anything can reach the new data

The STRING edges join genes to genes. Adding 1,862 of them changed the length-3
path count for **0 of 1,388** test pairs. That isn't weak signal. For a gene-gene
edge to sit on a length-3 path from a variant to a disease, some gene has to be
adjacent to that disease, and CIVIC has no gene-disease edges at all. At length
5 the same edges are reachable, and a length-5 path counter gained 0.017 AUC with
seed ranges that don't overlap.

The same check settled multi-hop retrieval before I ran anything. All 44
resolvable bridge entities in that query set are diseases, and the gene edges
add a reachable relevant passage for 0 of 55 queries at two hops. Measured
anyway, hit-rate didn't move.

STRING had one more trap. Its headline score blends seven evidence channels, and
one is co-occurrence in PubMed abstracts, the same papers CIVIC's curators read.
Among CIVIC's genes that channel alone contributes 14,380 edges, against 1,862
from lab experiments. Using the combined score would've meant predicting the
labels from the labels.

### Most of the gain is in ranking, and the limit is the data

Same harness and same seeds, before and after the optimizer change:

| cutoff | steps per epoch | AUC | average precision | Hits@100 |
|---|---|---|---|---|
| 2016 | 1 | 0.745 | 0.261 | 0.071 |
| 2016 | 8 | 0.758 | 0.287 | 0.100 |
| 2020 | 1 | 0.785 | 0.303 | 0.155 |
| 2020 | 8 | 0.813 | 0.371 | 0.206 |

The 2016 figure under "What survived" went from 0.752 to 0.758. Most of the
change is in ranking quality and at the later cutoff.

I also tried the standard knowledge-graph embedding models. The best of them,
DistMult, reached 0.664 at 2016, below the 0.694 from counting weighted length-3
paths. The graph has 5.1 triples per entity and nearly half its entities have
two edges or fewer, so the limit here is the data rather than the model family.

### The discovery claim replicates, but not at 35x

With the model improved, I re-ran the prospective check from section 5 on the
same candidate pairs. This time I wrote the pass criteria down before looking:
lift in the top 100 above 1x at every cutoff, and the highest lift no more than
five times the lowest. Both passed.

| cutoff | hits in top 100 | lift@100 | hits in top 500 | lift@500 |
|---|---|---|---|---|
| 2016 | 2 | 4.7x | 21 | 9.8x |
| 2018 | 1 | 5.3x | 12 | 12.8x |
| 2020 | 1 | 8.0x | 6 | 9.6x |

The top 500 is the part that holds up. It's about ten times the base rate at
every cutoff, and each of the fifteen single-seed rankings clears five times on
its own. That's still only 1 to 4% precision, so the output remains candidates
for a person to read, not findings.

The top 100 passed my criteria on almost nothing, one or two hits per cutoff,
where a single hit moves the lift by five to eight times. My criteria should
have required a minimum number of hits, and they didn't. Single seeds at 2016
ranged from 0 to 11 hits in the top 100, which is the likeliest account of the
original 35x: one good draw, not something special about that year.

This was also where I'd planned to settle whether to weight the blend toward
length-5 paths, which had ranked the top of the list better while losing AUC.
Its cutoffs disagreed tenfold, 2.3x at 2016 against 24.1x at 2020, so it
didn't pass the same test.

---

The project, the evaluation harnesses, and the docs recording each withdrawn
claim are on [GitHub](https://github.com/poglesbyg/LitKG). To re-run the
comparison that killed the headline result, and the two from the update:

```bash
python scripts/replicate_prospective.py --cutoffs 2016 2018 2020
make evaluate-ppi        # length-3 and length-5 paths, with and without STRING
make train-lp SEEDS=8
```

`docs/Evaluation.md` covers the temporal holdout, the degree-matched
negatives, and what each number is and isn't evidence for.
