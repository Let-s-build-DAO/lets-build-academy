# LB Academy — Interactivity Design System

> **Core principle:** The interaction IS the lesson. The format must be the most natural way for a human to discover that specific concept. Multiple choice is never the answer.

---

## What Brilliant Does (and Why We Must Match It)

Brilliant does not ask you what happens. They make you *do* it.
- They give you a slider. You move it. The system reacts. You discover the concept.
- They give you a live cell. You type. The output changes. You feel the relationship.
- They give you a puzzle. You solve it by operating a system — not by selecting an option.

**We must do the same for blockchain.**

---

## What We Had (And Why It Failed)

Our previous `InteractiveCodeScenario` engine was a **multiple-choice engine** dressed up with a dark UI. Asking a user to click Option A/B/C is passive. It tests memorisation, not intuition.

The only component that was truly Brilliant-style: `HashAvalancheLab.jsx` — where you press "Tamper one letter" and physically watch the hash explode. That pattern is the entire engine. We extend it to every concept.

---

## The Journey Engine

Every lesson is a journey through **steps**. Each step is a full-screen component.

| Step | Type | What Happens |
|------|------|--------------|
| 1 | `hook` | Large narrative drop. Learner is placed in a scenario. Free text response to commit to a position. |
| 2 | `challenge` | Unguided problem. No hints. Learner must attempt before continuing. |
| 3 | `prediction` | Before running the simulation — "What do you predict?" |
| 4 | `simulation` | **The core step.** A live widget the learner directly manipulates. |
| 5 | `observation` | "Describe in your own words what just happened." |
| 6 | `reflection` | Atlas asks one Socratic question. |
| 7 | `explanation` | Concept is named and explained — AFTER discovery. |
| 8 | `micro-build` | Apply it. Constrained build task. |
| 9 | `final-challenge` | Strict gate. Must pass to unlock next lesson. |

---

## The Widget Library

The `simulation` step mounts a **widget** — a bespoke interactive system. No multiple choice. No static diagrams.

### Widget: `hash-live-input`
**What:** A text input field. Below it, a live SHA-256 hash visualisation that updates on every keystroke.
**Task given to learner:** "Change exactly one character. Watch the fingerprint."
**Success condition:** `inputChanged` — learner has edited the input and observed the avalanche.
**Concept taught:** Avalanche Effect, determinism, one-way functions.
**Source:** Converted from `HashAvalancheLab.jsx`.

### Widget: `nonce-scrubber`
**What:** A slider (or scrubbable number) controlling a nonce. Block data is fixed. Hash output is displayed live. Hash turns green when it meets the difficulty target.
**Task given to learner:** "Drag the nonce until the hash starts with `0000`."
**Success condition:** `hashMeetsTarget` — learner has found a valid nonce.
**Concept taught:** Proof of Work — there is no shortcut, only trial and error.

### Widget: `block-chain-visual`
**What:** A chain of 3 blocks. Learner edits the data in block 2. All subsequent hashes cascade-update and turn red.
**Task given to learner:** "Change one word in block 2. What happens to blocks 3 and 4?"
**Success condition:** `observedCascade` — learner has seen the chain break.
**Concept taught:** Blockchain immutability — why altering one block invalidates all subsequent blocks.

### Widget: `commit-reveal`
**What:** A two-phase drag-and-drop. Phase 1: hash a bid. Phase 2: drag the hash (not the raw bid) to the blockchain. Phase 3: reveal the original.
**Task given to learner:** "Submit your bid to the auction without revealing the amount."
**Success condition:** `sequenceCompleted` — learner completes all three phases.
**Concept taught:** Cryptographic commitment schemes — binding and hiding.

### Widget: `gas-auction`
**What:** 50 simulated users bid on the next block. Learner sets their gas price. The network confirms. Learner sees their transaction included or not.
**Task given to learner:** "Set your gas price. Get your transaction confirmed before the others."
**Success condition:** `transactionIncluded`.
**Concept taught:** Gas fees, MEV, transaction ordering.

### Widget: `ecc-point-add`
**What:** Two draggable points on an elliptic curve. Line drawn through them, intersects curve, reflects — showing point addition geometrically.
**Task given to learner:** "Drag the points. Watch where their sum lands."
**Concept taught:** Elliptic curve point addition — the geometric operation behind ECC.

### Widget: `merkle-builder`
**What:** 8 data blocks. Learner pairs and hashes them up to a Merkle root. Then tampers with one leaf and watches the root change.
**Task given to learner:** "Build the Merkle tree. Then tamper with leaf 3 and see what breaks."
**Concept taught:** Merkle trees, tamper evidence, efficient membership proofs.

---

## The Data Model

Each lesson in Firestore is a `steps` array, not an `options` array.

```js
{
  id: "world-3-lesson-1",
  title: "The Fingerprint Machine",
  world: 3,
  steps: [
    {
      type: "hook",
      prompt: "You need to prove a document wasn't altered — without sending the document. How?",
    },
    {
      type: "simulation",
      widget: "hash-live-input",
      config: {
        initialText: "Transfer $100 to Alice",
        task: "Change exactly one character. Watch the fingerprint.",
        successCondition: "inputChanged"
      }
    },
    {
      type: "explanation",
      title: "The Avalanche Effect",
      body: "One bit changes in the input → ~128 of 256 output bits flip. This is deliberate. It makes hash outputs unpredictable and tamper-evident."
    },
    {
      type: "final-challenge",
      widget: "hash-live-input",
      config: {
        task: "Find any input that produces a hash starting with the letter 'a'.",
        successCondition: "hashStartsWith:a"
      }
    }
  ]
}
```

---

## Deprecated

The following are **removed from all new lessons**:

| Removed | Replaced By |
|---|---|
| `options: [A, B, C]` data model | `steps: [...]` with `widget` config |
| `InteractiveCodeScenario.jsx` | `LessonJourneyEngine.jsx` + step components |
| `ScenarioMultipleChoice.jsx` | `SimulationStep.jsx` + widgets |
| `ProgressiveReveal.jsx` | `ExplanationStep.jsx` |
| ICS multiple-choice format | Direct manipulation widgets |

`HashAvalancheLab.jsx` is **preserved and converted** into the `hash-live-input` widget.

---

## Atlas Integration

Atlas is available at any step via a floating panel (bottom-right).

- Context-aware: knows lesson, step, learner history, mistakes, mastery
- Socratic: always responds with a question or hint, never the direct answer
- Hint escalation: learner presses "I still don't get it" to go deeper
- API route: `/api/atlas` — LLM call with Socratic system prompt + lesson context
- Conversation stored per lesson per user in Firestore

---

## LB Academy vs. Brilliant

| Brilliant | LB Academy |
|---|---|
| Sliders, live formula cells | Hash scrubbers, nonce sliders, chain visualisers |
| Step-by-step proofs | Step-through transaction lifecycle debuggers |
| Interactive geometry | ECC point addition on a real curve |
| No passive video | No passive reading — every lesson requires operating a simulation |
| Generic AI hint | Atlas — context-aware Socratic mentor with escalation levels |
| Math and science domains | Blockchain and distributed systems |
| World-class UX | World-class UX + builder community + real portfolio output |
