# Curriculum Design: "Code is Cheap, Thinking is Expensive"

## The design principle behind every lesson

Brilliant's real trick isn't gamification — it's that **every lesson opens with a wrong intuition**, lets you act on it, shows you it breaks, then rebuilds the correct mental model. Code, when it appears, is the *proof* of the mental model, not the lesson itself.

So every unit in every track below follows the same four-beat structure:

1. **Bait** — a concrete scenario where the naive/intuitive answer feels obviously right
2. **Break** — an interactive sandbox where the learner acts on that intuition and watches it fail (a hack succeeds, gas runs out, a fork resolves the "wrong" way, an AI agent does something unintended)
3. **Model** — the abstraction that explains *why* it failed, taught with a diagram/simulation, not code
4. **Prove** — now select the minimum patch/parameter needed to demonstrate mastery of the model, from a closed set of options (never a free-typed line of code, never a full app)

If a lesson can be passed by pattern-matching syntax without engaging step 3, it's a bad lesson. The quiz/challenge at the end of each unit should be answerable by someone who read no code but built the correct mental model, and *un*-answerable by someone who memorized syntax but has the wrong model.

---

## Track 0 — Prerequisites: "What problem is this even solving?"

**Core abstraction to install:** trust is a resource, and every system (banks, Git, blockchains) is a different strategy for economizing on it. Before touching any blockchain concept, the learner needs to feel *why* centralized trust breaks down, not just be told it does.

| Unit | Bait (naive belief) | Break | Model | Prove |
|---|---|---|---|---|
| Why not just use a database? | "A shared spreadsheet with a login system would solve this" | Simulate 3 mutually distrusting parties editing a shared ledger — one always wins by editing last, or the admin (you) can silently rewrite balances | Introduce the concept of a system with **no privileged writer** — what has to be true for that to even be possible | **Predictor toggle**: "If the admin key is removed, does the ledger still update correctly? Yes/No" — then watch the sandbox simulate the removal live |
| Hashing as a trust primitive | "A checksum is just for detecting typos" | Learner tries to forge a document and match a given hash by trial-and-edit — watch it be computationally hopeless | One-way functions, avalanche effect, why "hard to reverse" is a *feature* not a limitation | Compute a hash of a doc, then tamper 1 character and observe total change |
| Merkle trees | "To prove a transaction is in a huge list, you'd need the whole list" | Try verifying membership in a 10,000-item list naively (slow) vs. via a path of hashes (fast) — interactive tree the learner clicks up | Logarithmic proof of inclusion; commitments over data you don't have to hold | Verify a Merkle proof by hand-computing 3 hash concatenations |
| Digital signatures | "A signature is like a scanned image of your handwriting" | Signature-forging sandbox: try to fake a signature without the private key | Public/private key asymmetry: signing proves possession, not identity of a person | Sign a message, then modify 1 byte and watch verification fail |
| Consensus, informally | "Majority vote settles disagreements" | Simulate 5 nodes with network delay disagreeing on order of two events arriving at different times | Why *time* itself is ambiguous in a distributed system — the real problem consensus solves | Predict the outcome of a given message-delay scenario before revealing it |

**Placement test:** a diagnostic of 8–10 of these "predict the outcome" questions (no code) — anyone who already codes can skip straight to Track 1 if they pass it, but can't skip Track 0 by claiming prior blockchain experience, since this track tests conceptual foundations specifically, not syntax familiarity.

---

## Track 1 — Blockchain Foundations: "What is actually being agreed upon?"

**Core abstraction to install:** a blockchain is a replicated state machine; "the blockchain" is not a ledger of transactions, it's a ledger of **state transitions**, and the chain of blocks is just the mechanism for getting everyone to agree on the *order* of those transitions.

| Unit | Bait | Break | Model | Prove |
|---|---|---|---|---|
| State vs. history | "A blockchain records all transactions, like a bank statement" | Show two different transaction histories that produce the *same* final state; ask which one is "correct" | State-machine model: history matters only insofar as it determines final state; the ledger is a means, not the end | Given a set of txs, compute final balances without needing the ordering — see when order *does* matter (insufficient balance case) |
| Why blocks, why chains | "You could just timestamp each transaction individually" | Sandbox where individually-timestamped, unlinked transactions get reordered/censored with no one able to prove it | Chaining via hash-pointers makes tampering with history detectable and expensive; a block is a *batch commitment*, not a filing cabinet | Given a chain of hash-linked blocks, detect which one was tampered with |
| Consensus: PoW vs PoS | "Whichever chain is 'longest' wins, arbitrarily" | Simulate a fork: two blocks mined simultaneously, learner picks which branch "wins" and watches network reconverge (or not) | Fork-choice rules as a way to make convergence *inevitable* rather than a matter of taste; cost-to-attack as the real security parameter, not the algorithm's name | Given hash power/stake distribution, calculate cost of a 51% attack |
| Accounts, nonces, gas | "Gas is just a transaction fee, like a stamp" | Try to replay an already-executed signed transaction; try to front-load 1000 free operations | Gas as a **halting-problem workaround** (bounding computation) and nonces as **replay prevention**, not bureaucracy | Predict whether a given tx will succeed/fail from its nonce and gas limit alone, before submitting it to a live testnet |
| Wallets & keys | "My wallet holds my coins" | Send funds to an address with no known private key ("burn"), watch it vanish irrecoverably | A wallet holds *authority to sign*, not funds — funds are just entries in global state your key can authorize changes to | Derive a public address from a keypair and verify by signing a testnet transaction |

**Capstone:** learner is given a broken toy blockchain (bad fork-choice rule) and a **multi-select checklist** of candidate attacks (double-spend, censorship, replay, indefinite fork) — must select which one applies, then watches the sandbox execute that exact attack live against the broken rule before being shown the fix.

---

## Track 2 — Smart Contract Development: "Code as an immutable, adversarial-facing state machine"

**Core abstraction to install:** a smart contract isn't "a program on a blockchain" — it's a public state machine that a hostile, economically-motivated crowd will interact with in every way you didn't intend. Every language feature (visibility, modifiers, storage layout) exists because of that adversarial framing.

| Unit | Bait | Interaction (closed) | Sim behavior | Model taught |
|---|---|---|---|---|
| EVM mental model | "Solidity runs top to bottom like Python" | **Click-target**: click the storage slot in a rendered layout diagram where a given variable actually lives | Engine highlights the *actual* slot after the guess, animates a write to that slot | Storage/memory/calldata are address spaces, not syntax |
| Public state = public attack surface | "`private` means hidden" | **Predictor toggle**: "Can this private variable's value be read off-chain? Yes/No" then **click-target** on the raw storage slot that holds it | Engine performs a raw `eth_getStorageAt`-style read live, shows the value in plain sight | Visibility keywords are compiler-level, not cryptographic |
| Functions as public doors | "I'll add access control later" | **Fragment select**: pick which modifier (of 4 shown) prevents an unauthorized caller from draining `withdraw()` | Engine swaps bytecode variant matching the choice, replays the fixed attacker script, shows drain succeeding or failing | Every public function is an open door; permission is enforced inside, not implied |
| Tokens as accounting conventions | "Tokens sit in my wallet" | **Click-target**: click the correct line in a rendered `mapping(address => uint256)` view that represents "your" balance | Engine cross-highlights the matching `Transfer` event in the log | A token balance is a ledger entry, not a stored object |
| Testing as adversarial simulation | "Passing tests = safe" | **Drag-to-order**: reorder 4 given test-case descriptions from "least adversarial" to "most adversarial" | Engine reveals which of the 4 actually catches the seeded bug by running each against the vulnerable variant | Good tests model an attacker's incentive, not just the spec |

**Capstone:** deploy a fixed-scaffold ERC-20 + vault to a public testnet where the *only* learner input is a sequence of **fragment-select** choices (which modifiers, which ordering, which guard clauses) assembled into the final contract from a closed menu — then a **multi-select checklist**: "Select every attack vector below that this configuration is protected against," graded against the exact bytecode variant produced by their choices.

---

## Track 3 — Security & Auditing: "Thinking like the adversary, not the auditor checklist"

**Core abstraction to install:** vulnerabilities aren't a fixed list to memorize (reentrancy, overflow, etc.) — they're all instances of a smaller number of *root failure patterns*: assuming order, assuming atomicity, assuming honest inputs, assuming your code has final say over control flow. Teach the patterns, and any specific CVE becomes a special case the learner can derive.

| Unit | Bait | Interaction (closed) | Sim behavior | Model taught |
|---|---|---|---|---|
| Reentrancy | "Checking balance first is enough" | **Drag-to-order**: reorder 3 given statements (external call, balance check, state update) into execution order | Engine runs the attacker's recursive-call script against whichever order was chosen, animates the recursive drain if order is wrong | External calls are a handoff of control, not a subroutine |
| Integer issues | "Overflow is a solved problem" | **Bounded slider**: set `amount` to withdraw, choose from a fixed range that includes values exceeding balance | Engine executes the exact chosen value against a vulnerable vs. patched variant, shows wrapped value or revert | Fixed-width types have edges; behavior at the edge is the whole risk |
| Oracle manipulation | "Price feed = ordinary data source" | **Predictor toggle + click-target**: predict if a flash-loan attack liquidates a position, then click the line that trusts a spot price | Engine runs a scripted flash-loan sandwich against the chosen price-source variant (spot vs. TWAP) | Trusting a manipulable-within-one-tx source violates the "honest input" assumption |
| Front-running / MEV | "Txs execute in submission order" | **Drag-to-order**: arrange 3 mempool transactions (victim, attacker-front, attacker-back) into the order a searcher would actually submit them for max profit | Engine computes and animates the actual profit-maximizing block ordering, compares to learner's guess | Mempool order is an economically contested resource, not FIFO |
| Access control / governance attacks | "Multisig = decentralized = safe" | **Click-target** on the single malicious line within a rendered governance-proposal diff (4 candidate lines shown) | Engine executes the proposal as passed, animates the unauthorized action it actually authorizes | Security is about *what an action authorizes*, not just who can sign it |

**Capstone:** learner is given **read-only access** to a deployed, deliberately-vulnerable contract on a testnet (no source shown) and a **fixed console of pre-built probe actions** (call this view function, submit this specific crafted transaction template with a slider-bound parameter, inspect this storage slot) — never arbitrary calldata. The exploit is found entirely through this closed probe console, and completion is graded the moment their probe sequence reproduces the seeded exploit's state change, with a final **multi-select checklist**: "Which of these root-cause patterns does this vulnerability belong to?"

---

## Track 4 — Protocol-Level & Systems Thinking: "Zooming out from one contract to the whole network"

**Core abstraction to install:** most advanced blockchain concepts are really just **trade-off triangles** (security/scalability/decentralization; speed/cost/trust) — the goal isn't memorizing "what a rollup is," it's building the instinct to locate any new system on these trade-off axes on sight.

| Unit | Bait | Break | Model | Prove |
|---|---|---|---|---|
| Layer 2s / rollups | "L2s are just 'faster Ethereum'" | Learner is shown an L2's throughput claims, then asked "what did you give up to get this?" and can't answer | Rollups move *computation* off-chain but keep *data availability/verification* on-chain — the trilemma didn't disappear, it moved | Given a new L2's whitepaper claims, classify what it traded away (interactive matching exercise, not code) |
| Optimistic vs. ZK proofs | "A rollup either 'trusts' or 'proves,' full stop" | Simulate a withdrawal from an optimistic rollup during the challenge window vs. a ZK rollup — timing difference made visceral | Optimistic = assume honesty, punish fraud after the fact (needs a challenge window); ZK = prove honesty upfront (no window, but proving cost) — different points on the same trust/latency trade-off | Predict withdrawal finality time for a given rollup design before it's revealed |
| Bridges | "A bridge moves tokens between chains" | Learner watches a simulated bridge hack where "burned" tokens on chain A were never actually verified before "minting" on chain B | Nothing moves between chains — a bridge is a *cross-chain consensus problem in miniature*, and most bridge hacks are fake-verification bugs, not cryptography bugs | Identify the missing verification step in a simplified bridge contract diff |
| MEV & block building | "Miners just process transactions in the order received" | Simulate a PBS (proposer-builder separation) auction where the learner is a searcher choosing bids | Block space is an auction market with its own economics — "the network" has emergent economic actors most tutorials never mention | Given a set of pending transactions and their MEV value, construct the most profitable block ordering |
| Tokenomics / mechanism design | "Token price reflects the project's usefulness" | Simulate a bonding-curve token where early sellers extract value from later buyers regardless of "usefulness" | Tokenomics is applied game theory/mechanism design — incentive structure determines outcomes independent of the underlying tech's merit | Design an incentive structure to prevent a specific gameable behavior shown in the sandbox |

**Capstone:** learner is given a specific incentive problem (e.g., a gas auction gameable by bots) and a **fixed menu of mechanism components** (reserve price toggle, batch-auction slider, commit-reveal on/off, rate-limit stepper) to assemble via selection only. The engine runs a scripted population of simulated bidders/attackers against whichever combination was chosen, and a final **multi-select checklist** ("which exploits below does this configuration resist?") is graded against the exact mechanism produced.

---

## Track 5 — AI × Smart Contracts: "The trust boundary just got a new, unpredictable actor"

**Core abstraction to install:** everything from Tracks 1–4 (trust, adversarial inputs, oracle problems, control-flow handoffs) reappears verbatim once an AI model or agent enters the loop — the new material is smaller than it looks if the earlier mental models were actually installed. The one genuinely new abstraction: **AI outputs are a new class of untrusted, non-deterministic external input**, structurally identical to an oracle, but harder to bound.

| Unit | Bait | Break | Model | Prove |
|---|---|---|---|---|
| On-chain AI via oracles | "An AI oracle is just a fancier price feed" | Learner's contract trusts a model's output for a payout decision; sandbox shows the same output can't be reproduced/verified deterministically on-chain | AI inference is off-chain and non-deterministic by nature — you're not just trusting data, you're trusting a *process* you can't re-run to check, which is a strictly harder oracle problem | Design a dispute/verification window for an AI-oracle result, applying the optimistic-rollup pattern from Track 4 |
| AI agents with wallets | "An autonomous agent is just a bot running scheduled transactions" | Simulated agent with a funded wallet is prompt-injected via a malicious data source it reads, and drains its own funds via a "helpful" tool call | An agent's private key + broad tool access is a **new, larger attack surface for the exact reentrancy-style pattern**: the agent hands control flow to untrusted content mid-execution | Design a spending-policy/allowance contract that limits what an agent's key can authorize, regardless of what the model is tricked into deciding |
| AI-assisted auditing | "If the AI didn't flag a bug, the contract is probably safe" | Learner runs an LLM auditor on a contract with a seeded, well-known vulnerability class; the AI misses a subtle variant | LLM auditors are pattern-matchers over training data, not provers — they shift you from "reviewer" to "hypothesis generator," and *you* remain the adversarial-thinking backstop from Track 3 | Given an AI audit report, identify what class of bug it's structurally unable to catch, and check manually |
| zkML / verifiable inference | "You can't prove an AI model 'ran correctly' without re-running it" | Learner is shown a small circuit that verifies a computation's output without re-executing it — same as the Merkle-proof "verify without holding everything" idea from Track 0 | zkML extends the Track 0 idea (succinct proofs of correctness) to model inference — new application, same abstraction learners already have | Verify a toy zk-proof of a simple computation (not full ML) to feel the mechanism before trusting the ML-scale claims |
| Prompt-to-contract pipelines | "AI-generated Solidity is fine if it compiles and passes tests" | Learner accepts an AI-generated contract that compiles clean but has a subtle economic exploit (not a syntax bug) | Compiling and passing tests only proves the code does *something* consistently — it says nothing about whether that something is safe under adversarial incentives; this collapses back to Track 3's whole point | Take AI-generated contract code and apply the Track 3 audit process to it, finding the seeded flaw |

**Capstone:** learner assembles a spending-policy contract for an AI-agent-controlled treasury entirely via **fragment-select** (which limits, which approval gates, which time-lock) from a closed menu. The engine runs a scripted replay of prompt-injection attacks against whichever policy was assembled, and a **multi-select checklist** ("which of these agent-misuse scenarios does this policy block?") is graded against the exact configuration produced.

---

## Design revision: closed interactions only, no free text

Every deliverable in this platform — including the "written memo" capstones from the original design — is replaced with **closed, structured interactions**: click, drag, toggle, slider, multi-select, ordering. No text field ever asks a learner to type out reasoning. Two reasons this is the right call, not just a constraint:

- **Determinism.** A closed interaction has a fixed, enumerable answer space, so grading is instant and exact — there's no NLP-judging-an-essay layer that can be wrong, gamed, or slow.
- **It's actually a stronger test of the "thinking" claim.** Forcing the *correct structured choice* (which line, which order, which parameter) under a ticking simulation is harder to fake than writing a plausible-sounding paragraph. Prose can hand-wave; a click can't.

This applies platform-wide, but here's the reusable **widget taxonomy** everything below is built from:

| Widget | What it captures | Example use |
|---|---|---|
| **Predictor toggle/stepper** | Learner commits to an outcome *before* running the sim (success/fail, or a bounded numeric value via +/− stepper, never a free number field) | "Will this tx revert? Yes/No" before executing |
| **Click-target** | Learner clicks a specific hotspot in rendered code/diagram/state view (hotspots are fixed coordinates mapped to a small answer set, not text selection) | "Click the line that fails to update state before the external call" |
| **Drag-to-order** | Learner reorders a fixed set of blocks/statements/events | Reorder statements into checks-effects-interactions |
| **Bounded slider** | Learner sets one numeric parameter within a designed range | Set gas limit, tx amount, price-feed delay |
| **Fragment select** | Learner picks a "patch" from a closed set of pre-written code fragments (never types code) | Choose the correct modifier from 4 options to fix access control |
| **Matching/connect** | Learner drag-connects pairs | Match vulnerability → mitigation |
| **Multi-select checklist** | Replaces the old "memo" capstones — a fixed checklist of protections/risks the learner marks present or absent, graded against an answer key | "Select all attack vectors this contract is protected against" |

---

## The simulation engine: how it actually runs

The critical constraint this creates: **learners never author arbitrary code or arbitrary transactions.** Every lesson is backed by a small, fixed set of pre-compiled contract variants and a pre-scripted transaction sequence — the learner's job is to *select* among closed options, and the engine swaps in the variant/parameter that matches their selection, then replays it against a real, deterministic execution environment.

**Architecture, per lesson:**

1. **Author-time (our side, not the learner's):** for a given lesson, we write N contract variants (e.g., "vulnerable," "checks-effects-interactions fixed," "reentrancy-guard fixed") and compile all of them ahead of time to bytecode. We also script a fixed attacker/user transaction sequence for each.
2. **Runtime environment:** a WASM-compiled local EVM (e.g., a browser build of an Anvil/revm-style interpreter) loaded with a snapshot of pre-seeded state — no live testnet round-trip needed for 90% of lessons, so feedback is instant and offline-capable. Live testnet is reserved for track capstones where a real deployed artifact matters.
3. **Learner interaction → variant selection, not code generation.** When a learner picks "Fragment select: add `nonReentrant` modifier," the front end doesn't compile anything live — it swaps in the corresponding pre-compiled bytecode variant we already built and verified.
4. **Deterministic replay.** The scripted transaction sequence (attacker calls, victim calls, block advances) runs against whichever variant/parameters the learner chose. Because both the bytecode set and the tx script are fixed and pre-tested by us, the outcome for every possible learner choice is known in advance — grading is a lookup, not a live judgment call.
5. **Event log, not chat log.** Every learner action is captured as a structured event (`{widget_id, choice, timestamp}`), which is what feeds the mastery/knowledge-graph engine — no parsing of free text ever happens, so the adaptive engine's input is 100% structured data.
6. **Reveal.** After the learner locks in a choice, the engine animates the actual simulation (state diff, balance changes, revert reason) so the "break" or "fix" is *watched*, not just told.

This also solves a real production concern: since nothing a learner submits is ever executed as arbitrary code, there's no sandbox-escape/compute-abuse surface from user-submitted programs — the "sandbox" is really a **pre-built decision tree of known-safe bytecode**, not a general-purpose compiler-as-a-service.
