# LB Academy — Tech Stack

> This document defines the technology decisions for the platform — the full interactive learning engine built around the Journey Engine and Widget Library defined in INTERACTIVITY.md.

---

## Framework Decision: Next.js + React (App Router)

**We are NOT switching to Vue.js or any other framework.**

### Why

1. **Existing codebase.** Auth, Firebase, course data model, and all components are already built in Next.js. Switching means a full rewrite — no gain, only lost time.
2. **React's ecosystem advantage.** The libraries needed for our interaction types — D3, Framer Motion, dnd-kit — have first-class React support.
3. **Next.js App Router** gives us server components, streaming, and suspense — which means interactive lessons can load progressively without full-page waits.
4. **We already have the right state management.** Jotai (already in the package) is perfect for lesson-level state.

### What We Removed (Dead Weight)

- `jquery` — no reason for this in a React app
- `react-bootstrap` — replaced by Tailwind
- `react-owl-carousel`, `owl.carousel`, `react-owl-carousel2` — 3 carousel libraries
- `react-elastic-carousel` — another carousel
- `styled-components` — we use Tailwind; two styling systems is a liability
- `reactflow` — was for the old Visual Canvas model; replaced by D3/SVG
- `md-editor-rt` — replaced by Shiki for code display

**Keep:**
- `antd` — **Legacy only**. Used solely in Admin/User dashboard tables and progress bars. The V2 interactive engine does not use it.

---

## Architecture: The Journey Engine

The core learning loop lives in `src/components/engine/LessonJourneyEngine.jsx`.

### Component Structure

```
src/
  app/                    # Next.js App Router pages
    api/
      atlas/              # POST /api/atlas — Socratic AI mentor LLM route
  components/
    engine/
      LessonJourneyEngine.jsx   # Orchestrates lesson steps; owns step progression state
    steps/
      HookStep.jsx              # Step 1 — narrative + free text commit
      ChallengeStep.jsx         # Step 2 — unguided problem
      PredictionStep.jsx        # Step 3 — "What do you predict?"
      SimulationStep.jsx        # Step 4 — mounts a widget by name
      ObservationStep.jsx       # Step 5 — free text description
      ReflectionStep.jsx        # Step 6 — Atlas Socratic question
      ExplanationStep.jsx       # Step 7 — concept named after discovery
      MicroBuildStep.jsx        # Step 8 — constrained build task
      FinalChallengeStep.jsx    # Step 9 — strict gate, must pass to progress
    widgets/
      HashLiveInput.jsx         # hash-live-input widget (from HashAvalancheLab.jsx)
      NonceScrubber.jsx         # nonce-scrubber widget
      BlockChainVisual.jsx      # block-chain-visual widget
      CommitReveal.jsx          # commit-reveal widget
      GasAuction.jsx            # gas-auction widget
      EccPointAdd.jsx           # ecc-point-add widget
      MerkleBuilder.jsx         # merkle-builder widget
    lesson/
      LessonPlayerShell.jsx     # Shell chrome, progress bar, Atlas panel
    views/
      V2CourseEngine.jsx        # Legacy — being migrated
      WorldMap.jsx              # World/lesson selector
    simulations/                # Standalone simulations (pre-Journey Engine)
    interactions/               # Legacy ICS interaction types (being migrated out)
  hooks/
  store/
  firebase/
```

### Deprecation Status

| Component | Status |
|---|---|
| `InteractiveCodeScenario.jsx` | ❌ Deprecated — replaced by `LessonJourneyEngine.jsx` + step components |
| `ScenarioMultipleChoice.jsx` | ❌ Deprecated — replaced by `SimulationStep.jsx` + widgets |
| `ProgressiveReveal.jsx` | ❌ Deprecated — replaced by `ExplanationStep.jsx` |
| `HashAvalancheLab.jsx` | ✅ Preserved — converted into `HashLiveInput.jsx` widget |
| `options: [A, B, C]` data model | ❌ Deprecated — replaced by `steps: [...]` with `widget` config |

---

## Library Stack: Mapped to Interaction Types

### 1. Animations & Transitions — All Interaction Types
**Primary: [Framer Motion](https://www.framer.com/motion/) — ✅ Installed**

Every lesson step transition, success state, failure animation, and micro-interaction uses Framer Motion. Execution animations (chain breaking, attacker winning, funds draining) are orchestrated with Framer Motion variants.

---

### 2. Live Crypto Primitives — Widget Simulations
**Primary: @noble/hashes + @noble/curves — 🔧 To install**

```bash
npm install @noble/hashes @noble/curves
```

- `@noble/hashes` — SHA-256 for `HashLiveInput` and `NonceScrubber` (live PoW puzzle)
- `@noble/curves` — secp256k1 for `EccPointAdd` and key derivation widgets

**Performance:** Heavy computation (PoW brute-force, nonce searching) runs in **Web Workers via Comlink** so the UI never freezes.

```bash
npm install comlink
```

---

### 3. Visual Manipulation — ECC, Merkle Trees, Chain Visualiser
**Primary: [D3.js](https://d3js.org/) + React — 🔧 V2.2+**

```bash
npm install d3
```

Used for:
- Plotting elliptic curves with draggable points (`EccPointAdd`)
- Rendering interactive Merkle tree structures (`MerkleBuilder`)
- Animating the `BlockChainVisual` cascade

D3 operates on SVG directly inside `useEffect` hooks; React owns component structure.

---

### 4. Drag & Drop — Commit-Reveal, Merkle Builder
**Primary: [dnd-kit](https://dndkit.com/) — ✅ Already installed**

Used for:
- `CommitReveal` — drag hash (not raw bid) to blockchain
- `MerkleBuilder` — drag leaves into tree position

---

### 5. Code Display — Explanation Steps, Build Challenges
**Primary: [Shiki](https://shiki.style/) — 🔧 To install**

```bash
npm install shiki
```

Produces VS Code-quality syntax highlighting for Solidity, JavaScript, and pseudocode. Used in `ExplanationStep` and `MicroBuildStep`. We do NOT use Monaco Editor (too heavy).

---

### 6. Math Rendering — Cryptographic Formulas
**Primary: [KaTeX](https://katex.org/) via react-katex — 🔧 V2.2+**

```bash
npm install katex react-katex
```

For modular arithmetic, elliptic curve equations, and hash function notation in `ExplanationStep` components covering Worlds 2–3.

---

### 7. Atlas AI Mentor — `/api/atlas`
**Route:** `src/app/api/atlas/route.js`

- POST endpoint receiving `{ lessonId, stepType, learnerHistory, message }`
- Calls LLM with a Socratic system prompt — Atlas never gives the direct answer
- Hint escalation: Level 0 (think longer) → Level 6 (full solution, rare)
- Response stored per lesson per user in Firestore
- Available at every step via floating panel (bottom-right of `LessonPlayerShell`)

---

### 8. Charts — Tradeoff Mapper (V2.3+)
**Primary: [Recharts](https://recharts.org/) — ✅ Already installed**

Radar charts comparing consensus mechanisms across multiple axes.

---

### 9. Rich Text Input — Build Challenges (V2.4+)
**Primary: [Tiptap](https://tiptap.dev/) — 🔧 V2.4+**

```bash
npm install @tiptap/react @tiptap/starter-kit
```

For `MicroBuildStep` and `FinalChallengeStep` where learners write architectural design responses.

---

### 10. State Management

**Lesson state: [Jotai](https://jotai.org/) — ✅ Already installed**
- Current step index within a lesson
- Widget success/failure state
- Atlas panel open/closed

**Server state: TanStack Query — ✅ Already installed**
For fetching and caching lesson data from Firestore.

---

## Full Stack at a Glance

| Category | Library | Status |
|---|---|---|
| Framework | Next.js 14 + React 18 | ✅ Installed |
| Animations | Framer Motion | ✅ Installed |
| Crypto primitives | @noble/hashes + @noble/curves | 🔧 To install |
| Background computation | Comlink + Web Workers | 🔧 To install |
| SVG / Canvas visuals | D3.js | 🔧 V2.2+ |
| Drag & drop | dnd-kit | ✅ Installed |
| Code display | Shiki | 🔧 To install |
| Math rendering | KaTeX | 🔧 V2.2+ |
| Charts (tradeoffs) | Recharts | ✅ Installed |
| Rich text input | Tiptap | 🔧 V2.4+ |
| State (lesson) | Jotai | ✅ Installed |
| State (server) | TanStack Query | ✅ Installed |
| Auth + DB | Firebase + Firestore | ✅ Installed |
| Legacy dashboard UI | antd | ✅ Installed (legacy only) |
| Styling | Tailwind CSS | ✅ Installed |

---

## Build Order

Before writing any lesson content, the infrastructure must be in place:

1. **Install** `@noble/hashes`, `@noble/curves`, `comlink`, `shiki`
2. **Build `LessonJourneyEngine`** — step progression, step router, progress persistence
3. **Build step components** — `HookStep`, `SimulationStep`, `ExplanationStep`, `FinalChallengeStep` as priority
4. **Convert `HashAvalancheLab` → `HashLiveInput` widget** — first widget live
5. **Build `NonceScrubber` widget** — second widget live (PoW)
6. **Wire `/api/atlas`** — Socratic system prompt + lesson context injection
7. **Seed World 3, Lesson 1** — "The Fingerprint Machine" as end-to-end proof of concept
8. **Build remaining widgets** per world priority

---

## Performance Non-Negotiables

1. **Web Workers for all heavy computation.** Any hash computation, PoW puzzle, or brute-force operation must run in a Worker thread. The UI must never freeze.
2. **Lazy loading for all simulation widgets.** Large interactive components load on-demand with a skeleton placeholder.
3. **Optimistic UI for progress saving.** Firebase progress write happens in the background. No loading spinner between lesson steps.
4. **No full-page reloads within a lesson.** `LessonJourneyEngine` is a single-page experience — all step transitions happen in-component via state, not page navigation.
