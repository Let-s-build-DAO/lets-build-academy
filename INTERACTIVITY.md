# Let's Build Academy — Interactivity Design System

> **Core principle:** The interaction type is not decoration — it *is* the lesson. The format must be chosen because it is the most natural way for a human to discover that specific concept.

---

## The Pivot: From Reading to Problem-Solving

The original V2.1 model was too text-heavy. Users were still reading instead of doing. The new trajectory is a full pivot to a **Problem-Solving Scenario** model.

Instead of explaining concepts, we drop users into a broken system and force them to fix it.

**The core loop:**
1. See a visual of a real system (wallet, contract, block, network)
2. See the code that represents the system's logic
3. Select the code snippet that correctly patches, fixes, or attacks it
4. Click "Run Code" — see the consequences play out visually
5. Explanation reveals only after the user has committed to a choice and seen the result

This eliminates passive reading entirely. The user is always doing.

---

## V1 (Legacy App)
The existing "Web3 for Everyone" course. Untouched.

## V2.1 — The Code Scenario MVP
**Goal:** Prove the new Problem-Solving Scenario model works. Ship the highest-impact topics first.

### What Ships in V2.1
| Layer | Topics |
|---|---|
| **Layer 0** | Trust Assumptions, Adversarial Incentives, Finality, Byzantine Generals |
| **Layer 1 Track A** | Large Numbers, Binary/Hex, Randomness, One-Way Functions |
| **Layer 1 Track B** | Hash Functions, Hash Properties, Commitment Schemes, Proof of Work |
| **Layer 2 Track B** | Block Structure, Blockchain Immutability, Transaction Lifecycle |

**Every lesson in V2.1 uses the `InteractiveCodeScenario` engine.** No passive reveals. No plain text steps. Every lesson is a problem to solve.

## V2.2 — Cryptography Depth
Track C (Key Exchange), Track D (Elliptic Curves), Track E (Digital Signatures).

## V2.3 — Protocol Mechanics
Layer 2 Tracks A, C, D (Networks, Consensus, EVM, MEV).

## V2.4 — Application Stack & Advanced Crypto
Layer 3 (DeFi, Oracles, Bridges), Layer 1 Track G (ZKPs, SNARKs, VRFs), Layer 4 Build Challenges.

---

## The Interaction Type Library

---

### Type 0 — Interactive Code Scenario (ICS) ⭐ PRIMARY FORMAT
**What it is:** The flagship interaction type for Let's Build Academy. A real blockchain system is presented through a 4-part layout. The user must identify the correct code snippet to solve the problem, then execute it to see the outcome.

**The 4-Part Layout:**
1. **Visual Context** — An SVG diagram or illustration showing the current state of the system (e.g., Alice's wallet, a treasury contract, two miners competing, a mempool filling up).
2. **The Code Block** — A beautifully syntax-highlighted code block (Solidity, JavaScript, or pseudocode) showing the relevant function or protocol logic. It may have a gap, a flaw, or a missing piece.
3. **The Options (A / B / C)** — Three code snippets. Only one correctly solves the problem. The wrong ones are plausible — they *look* right but will fail or introduce a vulnerability.
4. **The Execution Engine** — The user selects a snippet and clicks "Run Code":
   - **Wrong choice:** The visual diagram animates the failure (funds drain, chain breaks, attacker wins).
   - **Correct choice:** The visual resolves successfully. The explanation is then revealed.

**Cognitive job:** Forces active analysis of code logic before committing. Creates visceral understanding of consequences. The failure animation is the lesson — not the text.

**When to use:** Every lesson in V2.1+. This is the default format.

**Example:**
> **Scene:** Alice's contract holds 10 ETH. An attacker is calling `withdraw()`.
> ```solidity
> function withdraw(uint amount) public {
>   require(balance[msg.sender] >= amount);
>   // ← INSERT CODE HERE
>   balance[msg.sender] -= amount;
> }
> ```
> **Option A:** `msg.sender.transfer(amount);`
> **Option B:** `(bool sent,) = msg.sender.call{value: amount}("");`
> **Option C:** `payable(msg.sender).send(amount);`
>
> *[User selects B and clicks Run. The visual shows the attacker calling withdraw() recursively, draining the contract before the balance is updated.]*
>
> *Reveal: Option B enables reentrancy. Options A and C are safer — but the real lesson is why the balance must be updated BEFORE the call, not after.*

---

### Type 1 — Scenario Multiple Choice (SMC)
**What it is:** A real-world situation is described. The user selects one answer from 3–5 options. Wrong answers are plausible. The reveal explains why each is right or wrong.

**Cognitive job:** Forces commitment before explanation. Good for governance decisions, adversarial thinking, and design trade-offs where there is no code to write.

**When to use:** Supplementary to ICS. Used when the problem is a strategic decision, not a code-execution problem. Maximum 1 SMC per lesson.

**When NOT to use:** Any concept that can be demonstrated through code execution. Never use SMC as a substitute for a proper ICS.

---

### Type 2 — Live Simulation Input
**What it is:** The user types or adjusts an input and sees the output change in real time. No submit button.

**Cognitive job:** Builds intuition through direct manipulation. Best for hash avalanche effect, binary-to-hex conversion, gas cost estimation.

**When to use:** Supplementary to ICS. Used for building raw intuition before the scenario is introduced.

**When NOT to use:** Conceptual or strategic questions.

---

### Type 3 — Visual Manipulation
**What it is:** The user drags, clicks, or moves elements on an interactive visual. Used for elliptic curve point addition, Merkle tree construction, network topology.

**When to use:** V2.2+ (ECC, Merkle Trees). Where the concept is inherently spatial.

---

### Type 4 — Step-Through Debugger
**What it is:** A process is broken into discrete steps. The user advances through each step, answering a micro-question before seeing the next.

**When to use:** V2.2+ (ECDSA signing, validator attestation sequences, transaction lifecycle deep-dives). Where the sequence itself is the insight.

---

### Type 5 — Ordering & Ranking
**When to use:** Supplementary. For comparing consensus mechanisms, ordering protocol steps before the step-through debugger covers them.

---

### Type 6 — Tradeoff Mapper
**When to use:** V2.3+ (PoW vs PoS, Optimistic vs ZK Rollup, UTXO vs Accounts). Where there is no single right answer and the tradeoff is the lesson.

---

### Type 7 — Spot the Flaw
**When to use:** Layer 4 Build Challenges. For auditing protocol designs. Variant of ICS where the flaw is already deployed — the user finds it rather than choosing the fix.

---

### Type 8 — Experiential Puzzle
**When to use:** Very sparingly. Maximum once per track. For mining a toy block, factoring a small prime, solving a discrete log by hand. Only when "doing it by hand" creates irreplaceable intuition.

---

### Type 9 — Progressive Reveal with Checkpoints
**Deprecated as primary format.** Replaced by the Interactive Code Scenario for V2.1+. May be used within an ICS as the "explanation reveal" phase after execution.

---

### Type 10 — Open Design Challenge with Expert Reveal
**When to use:** Layer 4 Build Challenges exclusively. The capstone format.

---

## Interaction Consistency Rules

1. **ICS is the default.** Every V2.1+ lesson starts with an Interactive Code Scenario. Other types are supplementary.
2. **Consistency within a module.** If a module is about Proof of Work, every lesson in that module uses an ICS framed around mining, hashing, or block validation. Do not switch the scenario universe mid-module.
3. **Form follows function.** The code language in the ICS matches what is actually used on-chain. Solidity for EVM topics, pseudocode for protocol-level topics.
4. **The failure animation is mandatory.** Wrong answers must visually demonstrate *why* they fail. A static error message is not enough.
5. **Explanation follows execution.** Never show the explanation before the user has run their chosen code.

---

## What Brilliant Does vs. What We Do

| Brilliant | Let's Build Academy |
|---|---|
| Multiple choice with explanations | Interactive Code Scenarios with animated execution outcomes |
| Interactive formula cells | Live hash simulators, binary togglers |
| Step-by-step proofs | Step-Through Debuggers for protocol lifecycles |
| No passive video | No passive reading — every lesson requires execution |
| Explanation after commitment | Explanation ONLY after code execution |

## What We Add That No One Else Has

| Addition | Reason |
|---|---|
| Animated failure states | The failure teaches more than the success |
| Code-execution as the primary format | Users must analyze logic, not just read it |
| Real exploit teardowns as lesson endings | Connects every concept to a real financial consequence |
| Chain-agnostic cross-comparison | Most platforms are EVM-only |
| Spot the Flaw auditing format | Nobody teaches security thinking this way |
