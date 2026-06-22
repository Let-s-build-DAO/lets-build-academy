# Let's Build Academy — Interactivity Design System

> **Core principle:** The interaction type is not decoration — it *is* the lesson. The format must be chosen because it is the most natural way for a human to discover that specific concept. Every time we use the same format twice in a row, we risk losing the learner. Variety is not a UX choice. It is a pedagogical requirement.

---

## V1 Scope vs. V2.1 (Post-Feedback)

### V1 — What Ships First
Focus: Get users through the foundations. Prove the learning model works. Collect feedback on where people drop off and why.

| Layer | Tracks in V1 |
|---|---|
| **Layer 0** | All 5 modules |
| **Layer 1** | Tracks A (partial: 1.1–1.5), B (all), D (1.15–1.16 visual only), E (1.19–1.20) |
| **Layer 2** | Tracks A (2.1–2.2), B (2.4–2.6), C (2.7–2.10 PoW + forks only) |
| **Layer 3** | 3.1 (L2s overview), 3.3 (Oracles), 3.4 (DeFi Primitives) |
| **Layer 4** | 2 Build Challenges only (Escrow + Governance) |

### V2.1 — After User Feedback
- Layer 1: Tracks C (Key Exchange, DH, Discrete Log), Full Track D (ECC depth), Track F (Merkle trees), Track G (ZKPs, SNARKs/STARKs, MPC, VRFs)
- Layer 2: Full Track C (PoS, finality, slashing, delegation), Full Track D (MEV, SVM, Cosmos)
- Layer 3: DIDs, AI Agents, Cross-chain infrastructure
- Layer 4: All remaining Thinking Modules and Build Challenges
- Advanced simulation types (attack simulators, full network simulators)

---

## The Interaction Type Library

These are the interaction formats available on the platform. Each has a specific cognitive job. They are not interchangeable.

---

### Type 1 — Scenario Multiple Choice (SMC)
**What it is:** A real-world or hypothetical situation is described. The user selects one answer from 3–5 options. The wrong answers are plausible — not obviously ridiculous. The reveal explains *why* the correct answer is right and *why each wrong answer fails.*

**Cognitive job:** Forces commitment to a position before receiving information. Activates prior knowledge. Creates productive discomfort.

**When to use:** Abstract concepts, system behaviour, decision making, governance, adversarial thinking.

**When NOT to use:** Mathematical operations, visual concepts, sequential processes. (Wrong tool — passive reading in disguise.)

**Brilliant equivalent:** Their primary interaction type. Used extensively in Physics, Logic, and CS courses.

**Example:**
> A validator proposes a block. 49% of the network agrees. 51% disagrees. What happens?
> - A. The block is rejected and the validator is slashed
> - B. The block is rejected but the validator keeps their stake
> - C. The network forks and both versions persist
> - D. The block is added after a 24-hour delay

---

### Type 2 — Live Simulation Input
**What it is:** The user types or adjusts an input and sees the output change in real time. No "submit" button — the feedback is immediate and continuous.

**Cognitive job:** Builds intuition through direct manipulation. The learner discovers the relationship between input and output themselves, without being told.

**When to use:** Hash functions (change one character, watch the hash flip), binary/hex conversion, modular arithmetic, gas cost calculation, EIP-1559 fee mechanics.

**When NOT to use:** Conceptual or strategic questions. The learner needs a thinking task, not a typing task.

**Brilliant equivalent:** Their interactive formula cells and slider-based equation explorers.

**Example:**
> Type anything in the box below. Now change one character. Watch what happens to the SHA-256 hash.
> [Input field] → [Live hash output]
> *Notice: A completely different hash. Now try to predict what the hash of "hello1" will look like before you type it. You can't. That's the avalanche effect.*

---

### Type 3 — Visual Manipulation
**What it is:** The user drags, clicks, or moves elements on an interactive visual. The system responds with updated state. The learner is doing geometry or topology with their hands, not reading about it.

**Cognitive job:** Translates abstract mathematical structures into spatial/physical intuition. Bypasses the symbol layer entirely.

**When to use:** Elliptic curve point addition, Merkle tree construction, P2P network topology, block chain structure (linking blocks), key derivation pipeline.

**When NOT to use:** Anything that doesn't have a natural spatial representation. Forcing a visual onto a non-visual concept creates confusion, not clarity.

**Brilliant equivalent:** Their geometry courses, interactive proofs, and some of their CS visualisations.

**Example:**
> [Interactive canvas with an elliptic curve plotted]
> Drag Point A and Point B. A line is drawn through them. Watch it intersect the curve at a third point. That third point (reflected) is their sum.
> *Now drag one point until both are at the same location. What happens to the line? (Tangent line → same point doubled.)*

---

### Type 4 — Step-Through Debugger
**What it is:** A process is broken into discrete steps. The user advances through each step manually — clicking "next" or answering a micro-question at each stage before seeing what comes next. The sequence cannot be skipped.

**Cognitive job:** Forces active attention at every stage of a process. Prevents the learner from passively watching an animation.

**When to use:** Transaction lifecycle, mining process, ECDSA signing/verification, Merkle proof verification, block validation sequence, consensus round.

**When NOT to use:** Concepts where the steps are obvious or the sequence is not the point.

**Brilliant equivalent:** Their step-by-step proof walkers in the Math courses.

**Example:**
> Let's trace a transaction from your wallet to the blockchain. You control the pace.
>
> Step 1: You create a transaction object. [What fields does it contain? → User selects from a list]
> Step 2: You sign it with your private key. [What does the signature prove? → User answers]
> Step 3: You broadcast it. [Where does it go first? → User answers]
> ...and so on through mempool → block → confirmation → finality.

---

### Type 5 — Ordering & Ranking
**What it is:** The user arranges a set of items into the correct order (sequence) or ranks them according to a specified criterion (e.g., most to least secure, fastest to slowest to finalize). After submitting, the correct order is revealed with explanations for each position.

**Cognitive job:** Forces the learner to explicitly reason about relative relationships, not just identify correct facts.

**When to use:** Comparing consensus mechanisms (by security, speed, decentralization), comparing stablecoin types by collateralization risk, ordering the steps of a process before the step-through debugger covers it in depth.

**When NOT to use:** When there is no meaningful ranking or ordering. Do not force this format onto flat lists.

**Example:**
> Rank these four chains from slowest to fastest to achieve economic finality. Drag to reorder.
> [ Ethereum | Bitcoin | Cosmos/Tendermint | Solana ]
> *Then: why does Cosmos achieve finality instantly when Ethereum takes 12 minutes?*

---

### Type 6 — Tradeoff Mapper
**What it is:** The user is given a design decision and must explicitly map out what is gained and what is lost. A structured table or radar chart where the user fills in the tradeoffs before seeing the correct analysis.

**Cognitive job:** Forces the learner to think in multiple dimensions simultaneously. Prevents false binary thinking ("which one is better?"). The core skill of a systems designer.

**When to use:** Any Layer 2 or Layer 4 content where a design decision involves competing priorities. PoW vs PoS, Optimistic vs ZK Rollup, UTXO vs Account model, on-chain vs off-chain DA.

**When NOT to use:** Layer 0 and Layer 1 foundational content where the answer is more objective.

**Brilliant equivalent:** Their Physics "tradeoff" questions where changing one variable always costs another.

**Example:**
> You're choosing between an Optimistic Rollup and a ZK Rollup for your protocol. Map the tradeoffs.
>
> | Property | Optimistic Rollup | ZK Rollup |
> |---|---|---|
> | Time to finality | [User fills in] | [User fills in] |
> | Complexity to build | [User fills in] | [User fills in] |
> | Trust assumption | [User fills in] | [User fills in] |
> | Withdrawal time | [User fills in] | [User fills in] |
>
> *→ Reveal: filled-in table with explanations for each cell.*

---

### Type 7 — Spot the Flaw
**What it is:** The user is shown a piece of code, a protocol design, a smart contract, or a system diagram. Something is wrong. The user must identify it before being shown the answer.

**Cognitive job:** Activates adversarial thinking. Trains the instinct to look for what could go wrong rather than what seems to work. This is the auditor's mindset.

**When to use:** Security content (Layer 1 Track G, Layer 4 Thinking Modules), smart contract design, oracle design, governance design.

**When NOT to use:** Foundational content where the learner doesn't yet have the vocabulary to spot flaws meaningfully.

**Example:**
> Here is a simplified withdraw function. What is wrong with it?
> ```
> function withdraw(uint amount) public {
>     require(balance[msg.sender] >= amount);
>     (bool sent, ) = msg.sender.call{value: amount}("");
>     require(sent);
>     balance[msg.sender] -= amount; // ← state updated AFTER external call
> }
> ```
> [User selects: A. Nothing is wrong | B. The balance is updated in the wrong order | C. The amount check is incorrect | D. The function should be payable]
> *→ Reveal: B. This is a reentrancy vulnerability. The 2016 DAO hack exploited exactly this pattern.*

---

### Type 8 — Proof of Work Puzzle (Experiential)
**What it is:** The learner must complete a simplified version of the actual task — not simulate or watch it, but do it. Mining a toy block. Finding a nonce. Solving a small modular arithmetic problem by hand. The learner experiences the computational effort (even in a small, fast form) before being told why it matters.

**Cognitive job:** Creates visceral understanding of computational difficulty. "I just tried 847 nonces to find one that works. Imagine doing that quadrillions of times per second."

**When to use:** Proof of work, hash puzzles, discrete log problems (small examples), VRF intuition.

**When NOT to use:** Anything where doing-by-hand adds no insight (most things).

**Example:**
> Find a number (nonce) that, when added to this block data and hashed, produces an output starting with "0000".
> Block data: "Block #1 | Alice → Bob: 5 BTC"
> Nonce: [Input field]
> [Try] button → [Output: hash result]
> *You may need many attempts. That's the point.*

---

### Type 9 — Progressive Reveal with Checkpoints
**What it is:** A complex concept is revealed in layers, with a comprehension checkpoint between each layer. The learner cannot proceed until they correctly answer the checkpoint question. Information is added piece by piece, building the full picture incrementally.

**Cognitive job:** Manages cognitive load for complex multi-part concepts. Prevents the learner from being overwhelmed by seeing everything at once.

**When to use:** Zero-knowledge proofs (the Ali Baba cave), Merkle tree construction, the full DH key exchange protocol, the LUNA collapse (each domino falling in sequence).

**When NOT to use:** Simple, single-concept lessons. Checkpoints on trivially simple content feel patronising.

**Brilliant equivalent:** Their advanced Math course progressive proof systems.

**Example:**
> ZKP — The Ali Baba Cave (5 rounds)
> Round 1: Peggy enters the cave and takes one of the tunnels. Victor waits outside.
> → [Victor calls out a direction. Peggy either emerges correctly or not.]
> *If Peggy is guessing, what is the probability she's right? [User enters: 50%]*
> Round 2: Repeat.
> *Now what's the probability she's guessed correctly twice in a row? [User enters: 25%]*
> ...after 5 rounds...
> *After 20 rounds, the probability of cheating is 1 in 1,048,576. This is zero-knowledge. Victor is convinced. Nothing about the secret was revealed.*

---

### Type 10 — Open Design Challenge with Expert Reveal
**What it is:** The learner is given a problem, constraints, and edge-case questions. They write out (in plain text or a structured form) their architectural response. Then the expert solution is revealed side-by-side with their answer, with annotation highlighting what they got right, what they missed, and what attacks they didn't consider.

**Cognitive job:** Activates full synthesis. Requires integrating knowledge from multiple layers. Exposes unknown unknowns — the learner sees exactly which attack vectors they didn't think of.

**When to use:** Layer 4 Build Challenges exclusively. This is the capstone interaction type.

**When NOT to use:** Any lesson where the learner hasn't yet built sufficient foundational knowledge. This format fails if the user doesn't have enough to draw on.

**Example:**
> Design a governance system for a protocol with a $50M treasury and 10,000 token holders.
> Questions to answer:
> - What is the quorum threshold?
> - What prevents a flash loan attack on governance?
> - Who executes passed proposals, and when?
> - What is the minimum timelock before execution?
>
> [Text area for user's design]
> [Submit → Expert solution reveals with annotation]
> [Then: The Beanstalk story — what their design was missing and what it cost them]

---

## Interaction Type Mapping by Layer and Track

*Each track is mapped to its primary interaction type (used for ~60% of lessons) and secondary type (used for ~30%). The remaining ~10% can use any other type that fits a specific lesson.*

---

### Layer 0 — Mental Model Boot Camp

| Module | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 0.1 Trust assumptions | SMC (Type 1) | Ordering (Type 5) | Abstract concept, forces commitment to a position before explanation |
| 0.2 Decentralisation spectrum | Ordering (Type 5) | Tradeoff Mapper (Type 6) | Ranking forces explicit comparison, not vague feeling |
| 0.3 Adversarial incentives | SMC (Type 1) | Spot the Flaw (Type 7) | Adversarial thinking requires scenario-based decisions |
| 0.4 Finality | SMC (Type 1) | Tradeoff Mapper (Type 6) | The decision (how many confirmations?) is the lesson |
| 0.5 Distributed systems | Progressive Reveal (Type 9) | SMC (Type 1) | BGP needs to be built up incrementally — the paradox lands harder with each new constraint |

---

### Layer 1 — Cryptographic Foundations

#### Track A — Number Theory

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 1.1 Large numbers | Experiential (Type 8) | SMC (Type 1) | The learner must *feel* the scale — a calculation they do themselves |
| 1.2 Binary & Hex | Live Simulation (Type 2) | Experiential (Type 8) | Toggle bits, watch hex change. Hand-calculation of conversions |
| 1.3 Randomness | SMC (Type 1) | Spot the Flaw (Type 7) | Identifying bad randomness requires scenario and flaw-finding |
| 1.4 Prime numbers | Experiential (Type 8) | Live Simulation (Type 2) | Factor numbers by hand to feel the difficulty asymmetry |
| 1.5 One-way functions | SMC (Type 1) | Progressive Reveal (Type 9) | Build up the definition through a series of constraints the learner rejects |

#### Track B — Hash Functions

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 1.6 Hash functions | Live Simulation (Type 2) | SMC (Type 1) | The avalanche effect must be *experienced*, not described |
| 1.7 Hash properties | Spot the Flaw (Type 7) | SMC (Type 1) | Each property is understood by identifying what attack it prevents |
| 1.8 Commitment schemes | Progressive Reveal (Type 9) | Experiential (Type 8) | The protocol emerges step by step as each naive solution fails |
| 1.9 PoW hash puzzle | Experiential (Type 8) | Live Simulation (Type 2) | The learner *mines* a toy block. The effort is the insight |

#### Track C — Key Exchange (V2.1)

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 1.10 Key exchange problem | SMC (Type 1) | Progressive Reveal (Type 9) | The impossibility-then-solution reveal drives curiosity |
| 1.11 Modular arithmetic | Live Simulation (Type 2) | Experiential (Type 8) | Arithmetic that wraps — interactive number line |
| 1.12 Discrete log problem | Experiential (Type 8) | Live Simulation (Type 2) | The learner tries to reverse it and experiences why it's hard |
| 1.13 Diffie-Hellman | Step-Through Debugger (Type 4) | SMC (Type 1) | The protocol has a defined sequence — walk through it step by step |

#### Track D — Elliptic Curves (V1: visual only; V2.1: full depth)

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 1.14 Public/private key concept | SMC (Type 1) | Progressive Reveal (Type 9) | The trapdoor intuition must build gradually |
| 1.15 Elliptic curve geometry | Visual Manipulation (Type 3) | Live Simulation (Type 2) | This is inherently geometric — must be shown, not described |
| 1.16 Scalar multiplication | Visual Manipulation (Type 3) | Experiential (Type 8) | Drag and repeat point doubling to feel the unpredictability |
| 1.17 secp256k1 | SMC (Type 1) | Tradeoff Mapper (Type 6) | Why this curve? Compare against alternatives |
| 1.18 Key derivation | Step-Through Debugger (Type 4) | Visual Manipulation (Type 3) | A defined pipeline — trace the private key through each transformation |

#### Track E — Digital Signatures (V1)

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 1.19 Auth vs encryption | SMC (Type 1) | Ordering (Type 5) | Distinguish two problems before going deeper |
| 1.20 ECDSA conceptually | Step-Through Debugger (Type 4) | Live Simulation (Type 2) | Sign → verify — the learner does it step by step |
| 1.21 Signature malleability | Spot the Flaw (Type 7) | SMC (Type 1) | Historical bug — identify what was wrong |

#### Track F — Data Integrity (V2.1)

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 1.22 Merkle trees | Visual Manipulation (Type 3) | Step-Through Debugger (Type 4) | Build the tree with your hands before the algorithm is named |
| 1.23 Merkle proofs | Step-Through Debugger (Type 4) | Experiential (Type 8) | Walk through a proof verification step by step |
| 1.24 Patricia Merkle Tries | Progressive Reveal (Type 9) | SMC (Type 1) | Complex structure — reveal one layer at a time |
| 1.25 Verkle trees | SMC (Type 1) | Tradeoff Mapper (Type 6) | Why change? Compare the tradeoffs |

#### Track G — Advanced Cryptography (V2.1)

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 1.26 ZKPs | Progressive Reveal (Type 9) | Experiential (Type 8) | The cave protocol must be run interactively across multiple rounds |
| 1.27 SNARKs vs STARKs | Tradeoff Mapper (Type 6) | SMC (Type 1) | Pure tradeoff decision — no single right answer |
| 1.28 Trusted setup | SMC (Type 1) | Progressive Reveal (Type 9) | The danger builds through the reveal |
| 1.29 Threshold signatures & MPC | Step-Through Debugger (Type 4) | Visual Manipulation (Type 3) | The secret sharing protocol has a defined sequence |
| 1.30 VRFs | SMC (Type 1) | Spot the Flaw (Type 7) | Identify bad randomness design, then understand VRFs as the fix |

---

### Layer 2 — Protocol Fundamentals

#### Track A — The Network (V1)

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 2.1 P2P networks | Visual Manipulation (Type 3) | Experiential (Type 8) | Watch gossip propagation on an interactive network graph |
| 2.2 Byzantine Generals | Progressive Reveal (Type 9) | SMC (Type 1) | The paradox must build — add one traitor at a time |
| 2.3 CAP Theorem | Tradeoff Mapper (Type 6) | SMC (Type 1) | You cannot have all three — the tradeoff is the lesson |

#### Track B — The Block & The Chain (V1)

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 2.4 Block structure | Step-Through Debugger (Type 4) | Live Simulation (Type 2) | Decode a real block field by field |
| 2.5 Blockchain data structure | Live Simulation (Type 2) | Visual Manipulation (Type 3) | Tamper with a block and watch the chain break in real time |
| 2.6 Transaction lifecycle | Step-Through Debugger (Type 4) | Ordering (Type 5) | The lifecycle is a sequence — walk through it, pause at each stage |

#### Track C — Consensus (V1: PoW + forks; V2.1: PoS full depth)

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 2.7 Proof of Work | Experiential (Type 8) | Live Simulation (Type 2) | Mine a toy block — feel the effort |
| 2.8 Difficulty adjustment | Live Simulation (Type 2) | SMC (Type 1) | Adjust hashrate slider, watch difficulty recalculate |
| 2.9 Longest chain rule & forks | Visual Manipulation (Type 3) | SMC (Type 1) | Two chains diverge — visualise the fork resolution |
| 2.10 Soft forks vs hard forks | SMC (Type 1) | Tradeoff Mapper (Type 6) | The upgrade decision is the lesson |
| 2.11 Proof of Stake (V2.1) | SMC (Type 1) | Tradeoff Mapper (Type 6) | Compare the security model against PoW |
| 2.12 Finality in PoS (V2.1) | Progressive Reveal (Type 9) | SMC (Type 1) | Build up the finality concept in stages |
| 2.13 Validators & attestations (V2.1) | Step-Through Debugger (Type 4) | Visual Manipulation (Type 3) | Walk an Ethereum epoch step by step |
| 2.14 Delegated staking (V2.1) | Tradeoff Mapper (Type 6) | SMC (Type 1) | Centralisation risk is the tradeoff to map |

#### Track D — Execution Environments (V1: EVM + gas; V2.1: MEV, SVM, Cosmos)

| Lesson | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 2.15 UTXO vs Account | Tradeoff Mapper (Type 6) | SMC (Type 1) | Two valid answers with different tradeoffs — no single correct model |
| 2.16 Ethereum account model | Step-Through Debugger (Type 4) | Live Simulation (Type 2) | Walk through account state changes |
| 2.17 The EVM | Progressive Reveal (Type 9) | Step-Through Debugger (Type 4) | Layer by layer: bytecode → opcodes → execution → state change |
| 2.18 Gas | Live Simulation (Type 2) | Experiential (Type 8) | Step through opcodes, watch gas counter tick |
| 2.19 The mempool | Step-Through Debugger (Type 4) | SMC (Type 1) | Transaction enters the mempool — trace its journey |
| 2.20 MEV (V2.1) | Spot the Flaw (Type 7) | SMC (Type 1) | You *are* the searcher — what would you do with this information? |
| 2.21 Solana SVM (V2.1) | Tradeoff Mapper (Type 6) | SMC (Type 1) | Compare against EVM |
| 2.22 Cosmos (V2.1) | Tradeoff Mapper (Type 6) | SMC (Type 1) | Sovereignty vs. shared security |

---

### Layer 3 — The Application Stack

| Module | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 3.1 L2s & Scaling (V1) | Tradeoff Mapper (Type 6) | SMC (Type 1) | Optimistic vs ZK is a pure tradeoff decision |
| 3.2 Data Availability (V2.1) | SMC (Type 1) | Tradeoff Mapper (Type 6) | On-chain vs off-chain DA — another tradeoff |
| 3.3 Oracles (V1) | Spot the Flaw (Type 7) | SMC (Type 1) | Identify the manipulation vector before understanding the fix |
| 3.4 DeFi Primitives (V1) | Progressive Reveal (Type 9) | Tradeoff Mapper (Type 6) | Each primitive revealed with its mechanism and failure mode |
| 3.5 DIDs (V2.1) | SMC (Type 1) | Open Design (Type 10) | Design a recovery system — open-ended |
| 3.6 AI Agents (V2.1) | SMC (Type 1) | Open Design (Type 10) | Many unresolved questions — frame as open design problems |
| 3.7 Cross-chain (V2.1) | Spot the Flaw (Type 7) | Tradeoff Mapper (Type 6) | Read a bridge design, find the vulnerability |

---

### Layer 4 — Thinking Modules & Build Challenges

| Module / Challenge | Primary Type | Secondary Type | Rationale |
|---|---|---|---|
| 4.1–4.6 Thinking Modules | Progressive Reveal (Type 9) | Tradeoff Mapper (Type 6) | Complex theory lands best in layers, with tradeoff mapping as the synthesis |
| Challenge 1–6 (Build) | Open Design (Type 10) | Spot the Flaw (Type 7) | Full synthesis — user designs first, expert reveals second |
| Challenge 7 (Builder's Audit) | Spot the Flaw (Type 7) | Open Design (Type 10) | The audit format reversed — find the flaws in someone else's design |

---

## Interaction Variety Rules

To prevent habituation (where learners go on autopilot because they know what's coming), these rules apply to content sequencing:

1. **No more than 2 consecutive lessons of the same interaction type.** If lessons 3 and 4 are both SMC, lesson 5 must be a different type.
2. **Every module must contain at least 3 different interaction types.**
3. **Live Simulation and Visual Manipulation should never follow each other directly** — both are input-driven. Separate with a thinking-based format (SMC, Progressive Reveal).
4. **Every track must end with its hardest interaction type** — Open Design or Spot the Flaw — to confirm genuine understanding before progression.
5. **Experiential interactions (Type 8) should be used sparingly** — maximum once per track. Overuse turns them from memorable into routine.

---

## What Brilliant Does That We're Adapting

| Brilliant Pattern | Our Adaptation |
|---|---|
| Multiple choice with plausible wrong answers | SMC (Type 1) — same, but all our distractors tie back to real misconceptions |
| Interactive formula cells | Live Simulation (Type 2) — applied to cryptography not just math |
| Step-by-step proofs | Step-Through Debugger (Type 4) — applied to protocols and transaction lifecycles |
| Progressive difficulty in problem sets | Layer 0 → 4 progression, and within each track |
| Explanation after commitment | Core to every interaction type — we never explain before the user has taken a position |
| No passive video | Replaced by Progressive Reveal (Type 9) with checkpoints — text + interaction, no passive watching |

## What We're Adding That Brilliant Doesn't Have

| Our Addition | Reason |
|---|---|
| Spot the Flaw (Type 7) | Brilliant doesn't teach security thinking. This is our differentiator |
| Experiential PoW Puzzle (Type 8) | Cryptographic effort must be felt, not described |
| Open Design with Expert Reveal (Type 10) | No other learning platform does architectural design challenges with annotated expert comparisons |
| Real exploit teardowns as lesson endings | Connects every concept to a real financial consequence |
| Chain-agnostic cross-comparison as a regular pattern | Most platforms are EVM-only. We draw from wherever the best example lives |
