# Let's Build Academy — Curriculum Structure

> **Philosophy:** Code is cheap. Thinking is expensive.
>
> **Approach:** Chain-agnostic. We draw from Ethereum, Solana, Cosmos, Bitcoin, Avalanche, and beyond — because good thinking about distributed systems transcends any single chain. Real events. Real failures. Real decisions.

The curriculum is divided into four layers of pedagogical depth, progressing from mental model rewiring to full architectural reasoning.

---

## Layer 0 — Mental Model Boot Camp
*Before anything else — rewire how you reason. This is the onboarding track.*

**Focus:** Building the foundational thinking primitives required to understand anything in blockchain. These lessons have no chain-specific knowledge — they're about trust, adversarial reasoning, and distributed systems thinking.

**Modules:**
- **What is a trust assumption?**
  - Everything in software trusts something. We make that visible.
  - *Real example:* Every time you use MetaMask, you're trusting its RPC provider to show you the real chain state.
- **What does "decentralized" actually mean — mechanically?**
  - Not a philosophy. A spectrum with actual thresholds.
  - *Real example:* Solana's validator set vs. Ethereum's. Neither is "fully decentralized." Where do they sit and why does it matter?
- **How do adversarial incentives work?**
  - If you design a system assuming everyone is honest, you've already failed.
  - *Real example:* The Luna/UST depeg. No one hacked it. Rational actors did exactly what the incentives told them to do.
- **What is finality and why does it matter?**
  - When is a transaction truly irreversible? The answer differs wildly across chains.
  - *Real example:* Bitcoin's 6-block confirmation convention vs. Ethereum's checkpointed finality.

---

## Layer 1 — Interactive Lessons
*Foundational concepts taught through scenario-based learning. Every lesson begins with a situation, not an explanation.*

**Format:** Scenario → Decision → Reveal → Explanation

**Approach:** We ground every lesson in a real blockchain event. Users aren't taught abstract theory — they're placed inside a moment that actually happened and asked what they would do.

---

### Track A — How Blockchains Work (Chain-Agnostic)

- **The Fee Market**
  - *Real Event (Aug 2021):* Ethereum's EIP-1559 goes live. The base fee now burns instead of going to validators.
  - *Scenario:* NFT project launches. Gas spikes 10x. You have a transaction queued. What happens?
  - *Key concepts:* Base fee, priority fee, mempool ordering.

- **Consensus Under Pressure**
  - *Real Event (May 2022):* Solana goes offline for 7+ hours due to a flood of bot transactions consuming all block space.
  - *Scenario:* You're a validator operator. The network stalls. Do you keep your node running? What do you do?
  - *Key concepts:* Liveness vs. safety, validator coordination, network restarts.

- **The Fork Decision**
  - *Real Event (2016):* The Ethereum DAO hack. ~$60M stolen. The community debates whether to fork.
  - *Scenario:* You hold ETH. You can vote on an irregular state change that rolls back the hack. Do you vote yes?
  - *Key concepts:* Immutability, social consensus, code is law vs. community governance.

- **Governance Apathy**
  - *Real Event (2022):* A governance proposal passes with 4% voter turnout on a major DeFi protocol, drastically changing fee structures.
  - *Scenario:* You're a token holder. Turnout is usually below 5%. A proposal you disagree with is passing. What levers do you have?
  - *Key concepts:* Voter apathy, quorum, delegation, governance attacks.

---

### Track B — DeFi Mechanics

- **Liquidity Crises**
  - *Real Event (June 2022):* Celsius freezes withdrawals. $8B in user funds locked overnight.
  - *Scenario:* You see on-chain data showing large withdrawals from a lending protocol. What signals would make you act?
  - *Key concepts:* Bank runs, liquidity ratios, on-chain signal reading.

- **Oracle Manipulation**
  - *Real Event (Oct 2022):* Mango Markets — Avraham Eisenberg manipulates the MNGO token price via a thin oracle, drains $114M.
  - *Scenario:* You're an auditor reviewing Mango's oracle design before launch. What do you flag?
  - *Key concepts:* Oracle design, price manipulation, spot vs. TWAP.

- **The Stablecoin Question**
  - *Real Event (May 2022):* UST loses its peg. $40B evaporates in 72 hours.
  - *Scenario:* A new algorithmic stablecoin launches. The whitepaper looks similar to UST's. What questions do you ask the team?
  - *Key concepts:* Collateralization, death spirals, reflexivity.

---

### Track C — Security & Attacks

- **Reentrancy**
  - *Real Event (2016):* The DAO hack — 3.6M ETH drained via a single reentrancy vulnerability.
  - *Scenario:* You're reviewing a withdraw function. It sends ETH before updating state. Is that a problem?
  - *Key concepts:* Call stacks, checks-effects-interactions pattern.

- **Bridge Exploits**
  - *Real Event (Feb 2022):* Wormhole bridge exploited for $320M due to a signature verification flaw.
  - *Real Event (Aug 2022):* Nomad bridge exploited for $190M due to an initialization bug.
  - *Scenario:* Bridges are consistently the highest-value exploit targets. Why? What makes them structurally vulnerable?
  - *Key concepts:* Cross-chain trust, signature verification, message replay.

- **Governance Attacks**
  - *Real Event (Apr 2022):* Beanstalk Farms — attacker uses a flash loan to gain 67% voting power in a single block, passes a malicious proposal, drains $182M.
  - *Scenario:* Your protocol uses token-weighted governance. A whale appears and buys 30% of supply. What do you watch for?
  - *Key concepts:* Flash loan voting, timelock mechanisms, guardian roles.

---

## Layer 2 — Thinking Modules
*Where the slogan lives. Deep dives into the mental frameworks that separate builders from copiers.*

**Format:** Theory → Real-world case study → Tradeoff mapping → Reader challenge

**Approach:** Every module is anchored to a real protocol or real event. We don't invent examples. We dissect what actually happened and extract the lesson.

---

### Module 1 — Designing Token Economies

- **Why inflation exists**
  - The bootstrapping problem: how do you pay for network security before the network has value?
  - *Real case:* Bitcoin's halving schedule — a deliberate inflation decay curve.
  - *Real case:* Solana's initial inflation (8%) and its scheduled taper. Why was it set there?
- **Incentive alignment**
  - Selfish actors are not the enemy. Misaligned incentives are.
  - *Real case:* Curve Wars — how Convex Finance turned CRV emissions into a meta-game of protocol-level influence.
- **Tradeoffs**
  - Fixed supply vs. dynamic emissions. Deflationary pressure vs. network security budget.
  - *Real case:* Ethereum post-Merge. ETH is now sometimes deflationary. What does that mean for validator incentives long-term?
- **The Vesting Problem**
  - Insiders with unlocking tokens create predictable sell pressure.
  - *Real case:* Aptos launch — large unlock schedule visible on-chain. Price impact was predictable.

---

### Module 2 — Smart Contract Thinking

- **Attack surfaces**
  - A contract is a public API with real money behind it. Every interface is a potential entry point.
  - *Real case:* Poly Network ($611M, 2021) — the attacker exploited a cross-chain message handler that had elevated privileges by design.
- **Security assumptions**
  - What are you trusting that you haven't documented? (Multi-sigs, upgradeability keys, external price feeds)
  - *Real case:* Ronin Network ($625M, 2022) — trusted a 5-of-9 multi-sig where the attacker compromised 5 keys via social engineering.
- **Failure modes**
  - How does the contract behave when inputs are at extremes? When dependencies fail?
  - *Real case:* Compound's price feed bug (2021) — DAI/USDC price reported as $1.30. $150M in liquidations in hours.
- **Upgradeability Tradeoffs**
  - Upgradeable = fixable but centralized. Immutable = trustless but permanent.
  - *Real case:* The Tornado Cash dilemma — what happens when an immutable protocol is sanctioned?

---

### Module 3 — DeFi Systems Thinking

- **Liquidity: what it is and how it moves**
  - Liquidity is not money. It's commitment. It leaves when it's needed most.
  - *Real case:* Uniswap v3's concentrated liquidity — more capital efficient, but liquidity providers fled during the LUNA crash.
- **Risks: beyond price**
  - Smart contract risk, liquidity risk, oracle risk, governance risk, regulatory risk.
  - *Real case:* Euler Finance hack (2023, $197M) — sophisticated multi-step exploit that no audit caught.
- **Cascading failures**
  - DeFi protocols are composable. So are their failure modes.
  - *Real case:* The LUNA collapse — UST depeg → Anchor protocol runs → LUNA hyperinflation → Terra ecosystem wipeout → contagion to 3AC, Celsius, Voyager, BlockFi → $2T market cap evaporates.
- **The Liquidity Mirage**
  - TVL is not a health metric. It can vanish in hours.
  - *Real case:* Iron Finance (TITAN, 2021) — first large-scale "bank run" on a DeFi protocol. Mark Cuban was a victim.

---

### Module 4 — Builder Psychology

- **Distribution: code doesn't market itself**
  - The best protocol dies without users. Distribution is product work.
  - *Real case:* How Uniswap launched with zero marketing, purely by solving a real friction point in token trading.
  - *Real case:* How Friend.tech used social virality as a go-to-market mechanism.
- **Product-market fit in Web3**
  - Most Web3 products solve problems that only exist in Web3. That is not PMF.
  - *Real case:* ENS domains — a genuine UX problem (wallet addresses are ugly) with a simple product solution.
  - *Real case:* Stablecoins — the most adopted Web3 product because they solve a real-world problem (dollar access in emerging markets).
- **Community: the organizational primitive**
  - In open-source decentralized systems, your community is your team, your users, your PR department, and your governance body simultaneously.
  - *Real case:* MakerDAO's community governance — how a DAO actually makes decisions under pressure.
- **The Attention Economy of Crypto**
  - Cycles, narrative capture, and why timing is a real advantage.
  - *Real case:* NFT summer (2021) — what drove the explosion? Who benefited? Who was left holding the bag?

---

### Module 5 — Cross-Chain Thinking (Chain-Agnostic by Design)

- **Why chains make different tradeoffs**
  - The blockchain trilemma is not a problem to be solved. It's a permanent design space.
  - *Comparison:* Bitcoin (security-first) vs. Solana (performance-first) vs. Cosmos (sovereignty-first).
- **Interoperability as infrastructure**
  - Chains don't operate in isolation. Bridges, messaging layers, and shared liquidity connect them.
  - *Real case:* LayerZero, Wormhole, Axelar — different trust models, different tradeoffs.
- **The Rollup Revolution**
  - Ethereum's scaling thesis is not bigger blocks — it's offloading execution.
  - *Real case:* Arbitrum, Optimism, zkSync — why are they structured differently? What does each trust?
- **Validator Economics Across Chains**
  - Running a validator on Ethereum, Solana, and Cosmos requires completely different capital commitments, hardware, and risk profiles. Why?

---

## Layer 3 — Build Challenges
*No boilerplate. No copying. Pure architectural thinking — then compare with what the experts (and history) actually built.*

**Format:** Scenario → Constraints → User's design → Edge-case questions → Expert solution → Real-world teardown

---

### Challenge 1 — Design an Escrow System
- *Constraints:* Two parties, one asset, one condition.
- *Questions to answer:* Who holds the funds? Who can trigger release? What if one party disappears for 6 months? What if the condition is disputed? What attacks exist?
- *Expert solution:* Time-lock + arbitrator multi-sig pattern.
- *Real-world teardown:* How OpenSea's escrow logic works. How it was exploited in 2022 via an old listing attack.

### Challenge 2 — Design a Governance System
- *Constraints:* Token-weighted voting, 10,000 holders, decisions affecting $50M treasury.
- *Questions to answer:* What's the quorum threshold? What prevents a flash loan attack? What prevents a 51% holder from dominating? Who executes passed proposals?
- *Expert solution:* Governor Bravo pattern with timelocks.
- *Real-world teardown:* The Beanstalk flash loan governance attack. What was missing from their design?

### Challenge 3 — Design an Oracle System
- *Constraints:* A lending protocol that accepts 5 collateral assets. Needs price feeds.
- *Questions to answer:* What happens if Chainlink goes offline? How do you handle a price that moves 50% in one block? What's your fallback?
- *Expert solution:* TWAP + Chainlink + circuit breaker pattern.
- *Real-world teardown:* The Mango Markets exploit. The Compound DAI price bug.

### Challenge 4 — Design a Token Launch
- *Constraints:* New protocol, 1B token supply, needs early adopters, team needs runway.
- *Questions to answer:* How do you distribute to real users, not bots? How do you prevent a day-1 dump? What does vesting look like for the team? What inflation rate do you set, and why?
- *Expert solution:* Retroactive airdrop + gradual emissions model.
- *Real-world teardown:* Optimism's OP airdrop (well-executed). Arbitrum's ARB airdrop controversy. The Aptos launch criticism.

### Challenge 5 — Design a Cross-Chain Bridge
- *Constraints:* Connect Ethereum and Solana. Users want to move USDC.
- *Questions to answer:* Where does the trust live? What happens if the relayer goes offline? What happens if the source chain forks? How do you prevent replay attacks?
- *Expert solution:* Lock-and-mint with guardian multi-sig + message verification.
- *Real-world teardown:* The Wormhole exploit ($320M). The Ronin bridge hack ($625M). What each was missing.

### Challenge 6 — The Builder's Audit *(Capstone)*
- *Format:* You are given a real protocol's design (simplified). Identify every trust assumption, attack surface, and incentive misalignment you can find before reading what actually happened.
- *Case studies used:*
  - UST/Luna mechanism design — before the depeg.
  - Iron Finance's TITAN token — before the bank run.
  - Euler Finance's donation mechanism — before the exploit.

---

## Progression Map

| Stage | Layer | Outcome |
|---|---|---|
| Beginner | Layer 0 + Layer 1 (Tracks A & B) | Understands how distributed systems fail and why decisions matter |
| Intermediate | Layer 1 (Track C) + Layer 2 (Modules 1–3) | Can read a protocol design and ask the right questions |
| Advanced | Layer 2 (Modules 4–5) + Layer 3 | Can architect systems, identify attack vectors, and reason across chains |
| Capstone | Builder's Audit | Can audit a real design and predict failure before it happens |

---

## Guiding Principles for Content Creation

1. **Real events first.** Every lesson draws from something that actually happened on-chain.
2. **Chain-agnostic always.** We pull from Bitcoin, Ethereum, Solana, Cosmos, Avalanche, Polkadot — wherever the best story lives.
3. **Scenarios before explanations.** Users make a decision before receiving the answer.
4. **Tradeoffs over answers.** There are no perfect designs. Every choice trades something for something else.
5. **Failure is the teacher.** The most powerful lessons come from the largest exploits and collapses.
