# Let's Build Academy — V2 Tech Stack

> This document defines the technology decisions for V2 of the platform — the full interactive learning engine. It maps specific libraries to the interaction types defined in INTERACTIVITY.md.

---

## Framework Decision: Stay with Next.js + React

**We are NOT switching to Vue.js or any other framework.**

### Why

1. **Existing codebase.** Auth, Firebase, course data model, and all components are already built in Next.js. Switching means a full rewrite — no gain, only lost time.
2. **React's ecosystem advantage.** The libraries needed for our interaction types — D3, Framer Motion, dnd-kit — have first-class React support.
3. **Next.js App Router** gives us server components, streaming, and suspense — which means interactive lessons can load progressively without full-page waits.
4. **We already have the right state management.** Jotai (already in the package) is perfect for lesson-level state.

### What We ARE Changing

**Remove (dead weight, not used in V2.1):**
- `jquery` — no reason for this in a React app
- `react-bootstrap` — replaced by Tailwind
- `react-owl-carousel`, `owl.carousel`, `react-owl-carousel2` — 3 carousel libraries
- `react-elastic-carousel` — another carousel
- `styled-components` — we use Tailwind; two styling systems is a liability
- `reactflow` — was for the old Visual Canvas model; replaced by D3/SVG
- `md-editor-rt` — replaced by Shiki for code display

**Keep:**
- `antd` — **Legacy only**. Used solely in Admin/User dashboard tables and progress bars. V2 interactive engine does not use it.

---

## V2 Library Stack: Mapped to Interaction Types

---

### 1. Animations & Transitions — All Interaction Types
**Primary: [Framer Motion](https://www.framer.com/motion/)**

The most critical library. Smooth, physics-based animations are what separate a premium product from a tutorial site. Every lesson transition, success state, and failure animation uses Framer Motion.

- **Execution animations:** When the user clicks "Run Code", a sequence fires — the visual diagram animates the consequence (contract drains, chain breaks, attacker is stopped).
- Lesson step transitions (fade, slide, scale)
- Correct/incorrect answer feedback (green pulse, red shake)
- Micro-interactions on hover and click

```bash
npm install framer-motion
```

---

### 2. The Interactive Code Scenario Engine — Primary Interaction Type
**Primary: Shiki + Custom SVG Diagrams + Framer Motion**

The `InteractiveCodeScenario` component is the flagship. It requires:

**Code Display — [Shiki](https://shiki.style/)**
Produces the highest-quality syntax highlighting — uses the same grammar engine as VS Code. For displaying Solidity, JavaScript, and pseudocode snippets in the 3-option selector.

```bash
npm install shiki
```

- We do NOT use Monaco Editor (too heavy — it's a full IDE, not a display library).
- Specific vulnerable or missing lines will be visually marked using custom Shiki decorators.

**SVG Visual Diagrams — Custom React + D3 (where dynamic)**
Each lesson's "Scene" visual is an SVG diagram showing the system state. For static scenes (a wallet icon, a contract box, an attacker arrow), we build these as inline React SVG components styled with Tailwind. For dynamic scenes that animate based on user selection (funds moving, chain linking), we use D3 to drive the animation.

**Execution Animation — Framer Motion**
The "Run Code" animation sequence is orchestrated by Framer Motion variants. A wrong choice triggers the failure animation. A correct choice triggers the success animation. Both must be visceral.

---

### 3. Visual Manipulation — V2.2+ (ECC, Merkle Trees)
**Primary: [D3.js](https://d3js.org/) + React**

For V2.2 (Elliptic Curves, Merkle Trees) and beyond:
- Plotting elliptic curves with draggable points
- Rendering interactive Merkle tree structures
- Animating P2P gossip propagation

```bash
npm install d3
```

D3 operates on SVG directly — we keep React for component structure and let D3 handle SVG manipulation inside `useEffect` hooks.

---

### 4. Drag & Drop — V2.2+ (Ordering, Ranking)
**Primary: [dnd-kit](https://dndkit.com/) — already installed**

Already in the package. Used for:
- Ordering/ranking lessons (drag to reorder consensus mechanisms by speed)
- Assembling Merkle tree nodes by dragging leaves into position

---

### 5. Math Rendering — Layer 1 Cryptographic Formulas
**Primary: [KaTeX](https://katex.org/) via react-katex**

For rendering mathematical notation — modular arithmetic, elliptic curve equations, hash function notation. Faster than MathJax and works well in React.

```bash
npm install katex react-katex
```

---

### 6. Crypto Primitives — Live Simulations
**Primary: @noble/hashes + @noble/curves**

For live hash simulations and actual key derivation in-browser:

```bash
npm install @noble/hashes @noble/curves
```

- `@noble/hashes` — SHA-256 for the hash avalanche simulator and PoW puzzle
- `@noble/curves` — secp256k1 for V2.2 key derivation and ECDSA live demos

**Performance:** Heavy crypto computation (PoW brute-force, nonce searching) runs in Web Workers via Comlink so the UI never freezes.

```bash
npm install comlink
```

---

### 7. Charts — Tradeoff Mapper (V2.3+)
**Primary: [Recharts](https://recharts.org/) — already installed**

For radar charts comparing consensus mechanisms across multiple axes. Already in the package.

---

### 8. Rich Text Input — Build Challenges (V2.4+)
**Primary: [Tiptap](https://tiptap.dev/)**

For Layer 4 Build Challenges where users write out their architectural design response.

```bash
npm install @tiptap/react @tiptap/starter-kit
```

---

### 9. State Management
**Lesson state: [Jotai](https://jotai.org/) — already installed**
- Current lesson index
- User's selected code snippet (A / B / C)
- Execution state (idle / running / success / failure)
- Reveal state

**Server state: TanStack Query — already installed**
For fetching and caching course data from Firebase.

---

## The Full V2 Stack at a Glance

| Category | Library | Status |
|---|---|---|
| Framework | Next.js + React 18 | ✅ Installed |
| Animations | **Framer Motion** | ✅ Installed |
| Code display | **Shiki** | 🔧 To install |
| Crypto primitives | **@noble/hashes + @noble/curves** | 🔧 To install |
| Background computation | **Comlink + Web Workers** | 🔧 To install |
| SVG / Canvas visuals | **D3.js** | 🔧 V2.2+ |
| Drag & drop | **dnd-kit** | ✅ Installed |
| Math rendering | **KaTeX** | 🔧 V2.2+ |
| Charts (tradeoffs) | **Recharts** | ✅ Installed |
| Rich text input | **Tiptap** | 🔧 V2.4+ |
| State (lesson) | Jotai | ✅ Installed |
| State (server) | TanStack Query | ✅ Installed |
| Auth + DB | Firebase | ✅ Installed |
| Legacy dashboard UI | antd | ✅ Installed (legacy only) |
| Styling | Tailwind CSS | ✅ Installed |

---

## The V2.1 Build Order

Before writing any lesson content, the infrastructure must be in place:

1. **Install Shiki** — the code display engine
2. **Build `InteractiveCodeScenario` component** — the flagship engine shell
   - Left panel: scene visual (SVG)
   - Middle panel: code block (Shiki)
   - Bottom panel: option selector (A / B / C)
   - Execution button + animation sequence (Framer Motion)
   - Reveal panel (shows after execution)
3. **Seed the first demo lesson** — one complete ICS payload in Firestore
4. **Wire up V2CourseEngine** to render `InteractiveCodeScenario` for `interactionType: "ICS"`
5. **Test the end-to-end flow** — select a wrong answer, see the failure animation; select the right answer, see the success animation and reveal.

Only after the engine works end-to-end do we write the remaining V2.1 lesson content.

---

## Performance Non-Negotiables

1. **Web Workers for all heavy computation.** Any hash computation, PoW puzzle, or brute-force operation must run in a Worker thread. The UI must never freeze.
2. **Lazy loading for all simulation components.** Large interactive components load on-demand with a skeleton placeholder.
3. **Optimistic UI for progress saving.** Firebase progress write happens in the background. No loading spinner between lesson steps.
4. **No full-page reloads within a course.** The V2CourseEngine is a single-page experience — all lesson transitions happen in-component via state, not page navigation.
