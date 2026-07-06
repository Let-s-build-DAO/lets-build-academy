# Let's Build Academy — Curriculum Structure

> **Philosophy:** Code is cheap. Thinking is expensive.
>
> **Approach:** Chain-agnostic. We draw from Bitcoin, Ethereum, Solana, Cosmos, Avalanche, and beyond — because strong thinking about distributed systems transcends any single chain.
>
> **On real-world history:** Real events, exploits, and case studies are used as *illustration tools* throughout — not as the starting point. A real exploit lands much harder after a user already understands the primitives being abused.

> **On the learning model (V2.1+):** Every lesson is a problem to solve — not a passage to read. The user sees a broken or incomplete system, selects how to fix it, and witnesses the consequence of their choice before any explanation is given. Explanation is the *reward* for committing to a position.

---

## Lesson Unit Template *(every lesson must follow this shape)*

```
1. Scene        — a visual of a real system in a specific state (wallet, contract, block, network)
2. The Problem  — a code block representing the system's logic, with a gap, flaw, or decision point
3. The Options  — three code snippets (A / B / C); only one correctly solves the problem
4. Execution    — the user clicks "Run Code"; the visual animates the consequence of their choice
5. Reveal       — what the correct reasoning is and why each wrong option fails
6. Follow-up    — one deeper scenario or simulation that extends the concept
```

No lesson ships without this structure. The failure animation for wrong answers is mandatory — it is not optional polish. If a concept cannot be turned into an executable scenario, it is not ready to be built.

---

## Layer 0 — Mental Model Boot Camp
*Always the entry point. No technical knowledge required. This rewires how users reason before we teach them anything specific.*

**Focus:** Trust, adversarial thinking, decentralization as a spectrum, and distributed systems intuition.

---

**0.1 — What is a trust assumption?**
- Everything in software trusts something. Most people never make this explicit.
- *Decision:* You open a website. List everything you're trusting before the page loads.
- *Reveal:* DNS, ISP, CDN, TLS certificate authority, the server, the code itself — every layer is an assumption.
- *Follow-up:* Which of these can be attacked? Which can blockchain eliminate? Which does it just move?
- *Real illustration:* MetaMask's RPC provider — you trust it to show you the real chain state, not a fabricated one.

**0.2 — What does "decentralized" actually mean — mechanically?**
- Not a philosophy. A measurable spectrum with real thresholds.
- *Decision:* Rank these four systems from most to least decentralized and justify each: Bitcoin, Ethereum, Solana, Binance Smart Chain.
- *Reveal:* Decentralization has multiple independent axes — validator count, geographic spread, client diversity, who can run a node, who controls the upgrade process.
- *Follow-up:* Which axis matters most in a crisis? (Hint: it depends on what kind of crisis.)

**0.3 — How do adversarial incentives work?**
- If you design a system assuming everyone is honest, you've already failed.
- *Decision:* You're designing a voting system. What stops someone from voting 1,000 times?
- *Reveal:* Every defense is itself a trust assumption. Blockchain systems don't assume honesty — they design around rational self-interest.
- *Real illustration:* The Luna/UST collapse. No one hacked it. Rational actors did exactly what the incentives told them to do.

**0.4 — What is finality — and why does it matter?**
- When is a transaction truly irreversible? The answer differs across every chain.
- *Decision:* You've received a payment on-chain. After how many confirmations do you ship the physical goods? Justify your answer.
- *Reveal:* Finality is probabilistic in some chains, absolute in others. The right threshold depends entirely on the value at risk.
- *Cross-chain comparison:* Bitcoin (6-block convention), Ethereum (checkpointed finality), Solana (optimistic confirmation).

**0.5 — What is a distributed system and why is it hard?**
- The internet is already distributed. Why is blockchain different?
- *Decision:* Three servers need to agree on a value. One of them lies. Design a rule for reaching agreement.
- *Reveal:* This is the foundation of the Byzantine Generals Problem — covered in full in Layer 2.
- *Follow-up:* What if two of the three lie? Is there a threshold beyond which agreement is impossible?

---

## Layer 1 — Cryptographic Foundations
*The mathematics and logic beneath everything. Not formal proofs — intuition built through decisions and simulations. Every lesson in every later layer rests on this one.*

---

### Track A — Number Theory & The Language of Cryptography
*Before any cryptographic primitive — the mathematical environment they operate in.*

**1.1 — What is a "large number" in cryptography?**
- *Hook:* Your private key is a number. Specifically, a number between 1 and 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936. Why does the size matter?
- *Decision:* If you could check one billion private keys per second, how long would it take to guess a random one?
- *Reveal:* Longer than the age of the universe. The security of cryptography is not magic — it is scale.
- *Key concepts:* 2^256, computational infeasibility, entropy.

**1.2 — Binary, Hexadecimal, and Why Blockchains Speak Hex**
- *Hook:* Every Ethereum address, every transaction hash, every private key is a string of seemingly random letters and numbers. What is that, and why?
- *Decision:* Convert the number 255 to binary. Now convert it to hex. Notice anything?
- *Reveal:* Hex is a compact representation of binary. Computers think in binary. Humans read hex. 32 bytes of binary data = 64 hex characters = your private key.
- *Interactive simulation:* Toggle bits and watch the hex value update in real time.
- *Real use:* Ethereum addresses are 20 bytes = 40 hex characters. Transaction hashes are 32 bytes = 64 hex characters.

**1.3 — Randomness and Why Computers Struggle With It**
- *Hook:* Ask a computer for a random number. It can't truly give you one. Why?
- *Decision:* A wallet app generates private keys using the current timestamp as a seed. What could go wrong?
- *Reveal:* Computers are deterministic. "Random" output requires genuinely unpredictable input (entropy). Without true entropy, keys become predictable.
- *Real illustration:* The Android Bitcoin wallet bug (2013) — weak random number generation allowed private key theft from hundreds of wallets.

**1.4 — Prime Numbers and Why They Matter in Cryptography**
- *Hook:* Why do mathematicians care so much about prime numbers? And why does blockchain?
- *Decision:* Factor the number 91. Now factor 9,007,199,254,740,997. Notice the difficulty difference?
- *Reveal:* Multiplying two large primes is fast. Factoring their product is computationally infeasible. That asymmetry is the foundation of RSA cryptography — and the intuition behind all public-key cryptography.
- *Key concepts:* Prime factorization, one-way functions, computational complexity.

**1.5 — What is a One-Way Function?**
- *Hook:* Is there a mathematical operation that's easy to do but almost impossible to undo?
- *Decision:* Design a mathematical operation that produces the same output for a given input every time, but from which you cannot reconstruct the input. What properties does it need?
- *Reveal:* A one-way function. The existence of practical one-way functions is the entire foundation of modern cryptography. Without them, none of this works.
- *Key concepts:* Pre-image resistance, determinism, one-way vs. trapdoor functions.

---

### Track B — Hash Functions
*One-way functions made concrete and applied.*

**1.6 — Hash Functions: The Fingerprint Machine**
- *Hook:* You need to prove a document hasn't been altered — without sending the document itself. How?
- *Decision:* You send a hash of a document. Someone alters one word. What happens to the hash?
- *Reveal:* A completely different output. Hash functions are designed so that any small change produces a completely unpredictable new hash. This is the avalanche effect.
- *Key concepts:* Determinism, avalanche effect, fixed-length output.
- *Interactive simulation:* Type a sentence. Change one letter. Watch the entire SHA-256 hash flip.

**1.7 — Properties of a Secure Hash Function**
- *Decision series:* For each property, ask — what attack does it prevent?
  - Pre-image resistance: Given a hash, you can't find the input.
  - Second pre-image resistance: Given an input, you can't find a different input with the same hash.
  - Collision resistance: You can't find any two inputs that produce the same hash.
- *Real illustration:* MD5 was broken (collisions found). SHA-1 was broken. Why SHA-256 is still trusted — and for how long?

**1.8 — Commitment Schemes: Proving You Know Something Without Saying It**
- *Hook:* Two countries must simultaneously reveal nuclear launch codes to verify they match — without either seeing the other's code first. Design a protocol.
- *Decision:* What do you send first that proves you have the code, without revealing the code?
- *Reveal:* Hash your code, exchange hashes, then reveal. The hash is your commitment. This is a commitment scheme.
- *Key concepts:* Binding (can't change your answer), hiding (doesn't reveal your answer).
- *Real use:* On-chain commit-reveal patterns in auctions, randomness generation, voting.

**1.9 — Hash Functions as Puzzles: Proof of Work**
- *Hook:* What if the only way to "earn" the right to add a block was to solve a puzzle involving hashes?
- *Decision:* You need to find a number that, when added to a block and hashed, produces an output starting with four zeros. How would you approach this?
- *Reveal:* Trial and error — there's no shortcut. That's the point. The difficulty is adjustable by changing how many leading zeros are required.
- *Interactive simulation:* A simple proof-of-work puzzle. Find the nonce. Experience why it takes effort but is trivially verifiable.
- *Real use:* Bitcoin's mining process. Why energy expenditure is the security model.

---

### Track C — The Key Exchange Problem & Modular Arithmetic

**1.10 — The Key Exchange Problem**
- *Hook:* Alice and Bob have never met. Eve listens to every message they send. Alice and Bob need to agree on a secret that Eve can't figure out. Is this possible?
- *Decision:* Propose a method. (Most attempts will fail because Eve sees everything.)
- *Reveal:* Yes — and the solution is a mathematical magic trick. Diffie and Hellman solved this in 1976.

**1.11 — Modular Arithmetic: Clocks and Cycles**
- *Hook:* It is 10am. Add 5 hours. It is 3pm, not 15:00 — the clock wraps around. What if numbers worked the same way?
- *Decision:* In a modular system with base 12, what is 7 + 8? What is 5 × 4?
- *Reveal:* Modular arithmetic creates a closed, cyclic mathematical world. This wrapping behavior is what makes certain operations irreversible.
- *Interactive simulation:* A number line that wraps. Multiply in modular space and watch how quickly outputs become unpredictable.
- *Key concepts:* Modulo operation, cyclic groups, clock arithmetic.

**1.12 — The Discrete Logarithm Problem**
- *Hook:* In regular math: if 2³ = 8, then log₂(8) = 3. Easy. What if math didn't let you do that?
- *Decision:* In modular arithmetic: if 3^x ≡ 7 (mod 13), what is x? Try to find it.
- *Reveal:* You have to try values one by one. For large numbers, this is computationally infeasible — even for supercomputers. This asymmetry (easy to compute, hard to reverse) is the mathematical foundation of Diffie-Hellman and elliptic curve cryptography.
- *Key concepts:* Discrete logarithm, computational hardness assumptions, why "hard" means billions of years.

**1.13 — Diffie-Hellman Key Exchange**
- *Decision:* Using the discrete log problem, design a protocol where Alice and Bob can agree on a shared secret even though Eve sees every message they exchange.
- *Reveal:* They each pick private numbers, publish transformed versions, and combine the transformations. Eve sees the public values but cannot reverse the discrete log to reconstruct the shared secret.
- *Interactive simulation:* Walk through the protocol step by step with small numbers. See what Eve can see and why she can't combine them.

---

### Track D — Public Key Cryptography & Elliptic Curves

**1.14 — From Discrete Log to Public/Private Keys**
- *Hook:* If a one-way function can create a shared secret for two people, can it create a "personal" secret — one that only you can use?
- *Decision:* Design a system where anyone can send Alice an encrypted message, but only Alice can decrypt it.
- *Reveal:* Your private key is a secret number. Your public key is derived from it using a one-way function. Anyone can encrypt with the public key. Only you can decrypt with the private key.
- *Key concepts:* Asymmetric cryptography, key pairs, trapdoor functions.

**1.15 — Elliptic Curves: The Geometry**
- *Hook:* Why do Ethereum and Bitcoin use "elliptic curves"? What does geometry have to do with cryptography?
- *Decision:* Given a curve and two points on it, can you define a way to "add" them that stays on the curve? (Visual puzzle — no algebra.)
- *Reveal:* Draw a line through the two points. It intersects the curve at a third point. Reflect it across the x-axis. That reflection is their "sum." This geometric operation is the foundation of ECC.
- *Interactive simulation:* Drag two points on a curve. Watch the addition happen geometrically.
- *Key concepts:* Point addition, the curve equation, closure under addition.

**1.16 — Scalar Multiplication on Elliptic Curves**
- *Hook:* If you can "add" a point to itself repeatedly, where does it end up after 1,000 additions? After 10^77?
- *Decision:* Starting from a fixed generator point G, compute 2G, 4G, 8G (by doubling). Can you predict where 100G will land?
- *Reveal:* No. After enough doublings, the output appears random. And reversing it — given a point P, find the scalar k such that kG = P — is the elliptic curve discrete log problem. Computationally infeasible for large k.
- *Interactive simulation:* Watch point multiplication travel unpredictably across the curve.
- *Key concepts:* Scalar multiplication, generator point, ECDLP.

**1.17 — secp256k1: The Specific Curve Bitcoin and Ethereum Use**
- *Key concepts:* Why this curve was chosen, its parameters, its security properties.
- *Real use:* Every Ethereum address and Bitcoin address was generated using this exact curve.
- *Interesting detail:* Satoshi chose secp256k1 — not the NIST curves that the NSA recommended. Why?

**1.18 — Key Derivation: From Private Key to Address**
- *Step by step:* Private key (256-bit random number) → Public key (point on secp256k1) → Keccak-256 hash of public key → Last 20 bytes = Ethereum address.
- *Interactive simulation:* Follow a private key through each transformation step and watch the address emerge.
- *Key concepts:* Why addresses are shorter than public keys, why you can't reverse an address to find the private key.

---

### Track E — Digital Signatures

**1.19 — Authentication vs. Encryption: Two Different Problems**
- *Hook:* Encryption hides a message. Signatures prove who sent it. These are different problems requiring different solutions.
- *Decision:* Alice sends a message to Bob. You need to design a system where Bob can verify Alice sent it — not that no one else could read it. What properties does your system need?
- *Reveal:* Authentication requires non-repudiation (Alice can't deny sending it), integrity (it wasn't altered), and origin proof (it really came from Alice).

**1.20 — How ECDSA Signatures Work (Conceptually)**
- *Decision:* Using a private key (known only to you) and a one-way function, design a "signature" that anyone with your public key can verify but no one can forge.
- *Reveal:* ECDSA produces two numbers (r, s) derived from your private key, the message, and a random nonce. Verification requires only the public key and the message.
- *Interactive simulation:* Sign a short message with a simplified ECDSA. Tamper with one character. Watch verification reject it.
- *Key concepts:* Signing, verification, non-repudiation.

**1.21 — Signature Malleability and the Bitcoin Bug**
- *Real illustration:* Bitcoin transactions were once malleable — the signature could be slightly altered without invalidating it, but changing the transaction ID. How Mt. Gox exploited this (or was exploited through it).
- *Key concepts:* Low-s normalization, BIP-62, why this was later fixed in SegWit.

---

### Track F — Data Integrity Structures

**1.22 — Merkle Trees: Proving Membership Without Revealing Everything**
- *Hook:* You have 1 million transactions. A user asks you to prove their specific transaction is included — without downloading the full million. How?
- *Decision:* Design a data structure that lets you prove a value is in a set using as few pieces of information as possible.
- *Reveal:* Hash pairs of data together recursively until you have a single root hash. To prove one item, you only need log₂(n) sibling hashes — not the full dataset.
- *Interactive simulation:* Build a tree with 8 leaves. Prove that leaf #3 is included. See exactly which 3 hashes are needed and which 5 are not.
- *Key concepts:* Leaf nodes, branch nodes, Merkle root, Merkle proof.
- *Real use:* Bitcoin block headers contain only a Merkle root. SPV wallets verify transactions without downloading the full blockchain.

**1.23 — Merkle Proofs in Practice**
- *Interactive simulation:* Tamper with one leaf. Watch the Merkle root change. Understand why a valid proof against a published root is tamper-evident.
- *Real use:* How exchanges prove reserves (or should). How rollups commit to off-chain transaction data.

**1.24 — Patricia Merkle Tries (Ethereum's State)**
- *Hook:* Ethereum doesn't just track transactions — it tracks the state of every account and every smart contract storage slot. How?
- *Key concepts:* Tries vs. trees, key-value storage, how Ethereum's state root, transaction root, and receipt root work together.
- *Real use:* Every Ethereum block header contains three separate roots. Understanding why requires understanding tries.

**1.25 — Verkle Trees: What Ethereum is Moving Toward**
- *Key concepts:* Why Merkle trees become too large for stateless clients. How Verkle trees use polynomial commitments to produce smaller proofs.
- *Note:* This is cutting-edge. The goal is intuition, not implementation.

---

### Track G — Advanced Cryptography

**1.26 — Zero-Knowledge Proofs: Prove It Without Revealing It**
- *Hook:* Prove you're over 18 without showing your ID. Prove you have enough funds to pay without revealing your balance. Prove you know the answer to a puzzle without giving the answer.
- *Decision:* The Ali Baba cave thought experiment — interactive version. Prove you know the secret path without walking through it in front of the verifier.
- *Reveal:* A zero-knowledge proof allows a prover to convince a verifier that a statement is true without revealing why it is true or what the underlying secret is.
- *Key concepts:* Completeness, soundness, zero-knowledge property. The difference between interactive and non-interactive proofs.
- *Interactive simulation:* Step through the cave protocol 5 times. Understand why after enough rounds, the probability of the prover cheating becomes negligible.

**1.27 — SNARKs vs. STARKs: The ZKP Landscape**
- *Hook:* "ZK rollup" is a category — not a single technology. Under the hood, zkSync and StarkNet are doing very different things. Why?
- *Key concepts:*
  - **SNARKs** (Succinct Non-interactive ARguments of Knowledge): Small proofs, fast verification, but require a "trusted setup."
  - **STARKs** (Scalable Transparent ARguments of Knowledge): Larger proofs, no trusted setup, quantum-resistant.
- *Decision:* You're building a ZK rollup. Which do you choose? What does your decision trade off?
- *Real use:* zkSync (SNARKs), StarkNet (STARKs), Polygon zkEVM (SNARKs).

**1.28 — The Trusted Setup Problem**
- *Hook:* Some ZKP systems require a special ceremony to generate parameters — and if anyone in that ceremony is dishonest, the entire system is compromised. Forever.
- *Decision:* How do you run a ceremony with 1,000 participants where the output is secure as long as at least one person is honest?
- *Reveal:* The "Powers of Tau" ceremony. Ethereum's KZG ceremony (2023) — over 140,000 participants.
- *Real illustration:* Zcash's trusted setup ceremony and the controversy around it.

**1.29 — Threshold Signatures & Multi-Party Computation**
- *Hook:* You want 3 of 5 people to be required to sign a transaction — but you don't want any one person to hold the full private key. How?
- *Key concepts:* Shamir's Secret Sharing, threshold signatures, MPC wallets.
- *Real use:* How exchanges custody assets. How bridge validators coordinate signing without any single party holding the key.
- *Real illustration:* The Ronin bridge ($625M) — 5-of-9 multi-sig where 5 keys were compromised via social engineering.

**1.30 — Verifiable Random Functions (VRFs)**
- *Hook:* A blockchain needs randomness — but who generates it? If a validator generates "random" numbers, they can manipulate them.
- *Decision:* Design a random number generation system where the output is unpredictable before it's generated, but verifiable after.
- *Reveal:* A VRF takes a private key and an input, produces a random-looking output, and a proof that anyone can verify was computed correctly from those inputs.
- *Real use:* Chainlink VRF, Solana's VRF for leader selection. On-chain NFT trait generation.
- *Real illustration:* Axie Infinity's early random number generation flaw — and how predictable randomness enabled game-breaking exploits.

---

## Layer 2 — Protocol Fundamentals
*How blockchains actually work as complete systems. Builds directly on every cryptographic primitive from Layer 1. Nothing here can be understood without Layer 1.*

---

### Track A — The Network

**2.1 — What is a Peer-to-Peer Network?**
- *Hook:* Traditional software has servers. Blockchains don't (or shouldn't). How does information spread without a central coordinator?
- *Decision:* You have 10,000 computers. None of them is in charge. A new transaction happens. Design a protocol for getting it to all of them reliably.
- *Reveal:* Gossip protocol — each node tells a random subset of its neighbors. Information spreads exponentially. This is how Bitcoin and Ethereum propagate transactions.
- *Key concepts:* Nodes, peers, gossip/flood protocols, network topology.

**2.2 — The Byzantine Generals Problem**
- *Hook:* This is the problem that all consensus mechanisms exist to solve. Without understanding this, "proof of work" and "proof of stake" are just buzzwords.
- *Decision:* Four generals surround a city. They must all attack at the same time to win, or all retreat. They can only communicate by messenger. One general is a traitor who will send conflicting messages. Can they reach agreement?
- *Reveal:* Yes — but only under specific conditions. This 1982 paper defined the problem that Satoshi solved in 2008.
- *Key concepts:* Byzantine fault tolerance, the one-third threshold, why "honest majority" is a meaningful concept.

**2.3 — Network Partitions and the CAP Theorem**
- *Hook:* What happens when the internet between two groups of nodes is cut? Both halves keep running. Then the connection is restored. Which version of reality wins?
- *Decision:* You must choose two of three: Consistency (everyone sees the same data), Availability (the system always responds), Partition tolerance (it keeps working if the network splits). Which two?
- *Reveal:* The CAP theorem — you can't have all three. Different blockchains make different choices. Bitcoin and Ethereum prioritize consistency over availability during partitions.

---

### Track B — The Block & The Chain

**2.4 — Block Structure: What's Actually Inside a Block?**
- *Interactive breakdown:* A real Bitcoin block, decoded field by field.
  - Version, Previous block hash, Merkle root, Timestamp, Difficulty target, Nonce
  - Transaction list
- *Decision:* Which field makes the chain tamper-evident? Which field connects it to the previous block?
- *Key concepts:* Block header vs. block body, the role of the previous hash, why the nonce is there.

**2.5 — The Blockchain Data Structure**
- *Hook:* How do you build a database that anyone can verify but no one can secretly alter?
- *Decision:* You have a list of records. Change record #3. How does the observer know?
- *Reveal:* Each block's header contains the hash of the previous block's header. Changing one block invalidates every subsequent hash. The chain is tamper-evident by structure.
- *Interactive simulation:* Change one word in a block. Watch every subsequent block hash turn red in real time.

**2.6 — The Full Transaction Lifecycle**
- *Step by step — from user action to finality:*
  1. User creates and signs a transaction (uses private key, ECDSA from Layer 1)
  2. Transaction is broadcast to the P2P network
  3. Nodes validate the transaction (signature valid? sufficient balance? correct nonce?)
  4. Transaction enters the mempool
  5. A block producer selects transactions (by fee priority)
  6. Block is produced, broadcast, and validated by other nodes
  7. Additional blocks are added on top (confirmations)
  8. Finality (probabilistic or absolute, depending on the chain)
- *Interactive simulation:* Trace a single transaction through each step.

---

### Track C — Consensus Mechanisms

**2.7 — Proof of Work: Mining Step by Step**
- *Hook:* How does "doing work" prove anything? And why does it cost so much energy?
- *Decision:* Design a rule for who gets to add the next block that requires effort, is easy to verify, and cannot be faked.
- *Reveal:* Find a nonce such that Hash(block_header + nonce) starts with N zeros. The only way is brute force. Verification takes one hash.
- *Interactive simulation:* Mine a simplified block. Try different nonces. Find the one that works. Experience the asymmetry between finding and verifying.
- *Key concepts:* Nonce, difficulty target, hash rate, the 10-minute block time design.

**2.8 — Difficulty Adjustment**
- *Hook:* What happens if mining hardware gets 100x faster? Blocks would come every 6 seconds instead of 10 minutes. How does Bitcoin prevent this?
- *Decision:* Design a self-adjusting difficulty system.
- *Reveal:* Every 2016 blocks (~2 weeks), Bitcoin recalculates the difficulty based on how fast the last 2016 blocks arrived. More miners = harder puzzles.

**2.9 — The Longest Chain Rule & Forks**
- *Hook:* Two miners find a valid block at the same time. Both broadcast it. The network is now split. Which block wins?
- *Decision:* Design a rule for resolving this without a coordinator.
- *Reveal:* Follow the chain with the most cumulative proof of work. The next block tips the balance. Temporary forks resolve naturally.
- *Key concepts:* Orphan blocks, uncle blocks, 51% attacks, chain reorganization.

**2.10 — Soft Forks vs. Hard Forks**
- *Hook:* How do you upgrade a blockchain that has no CEO?
- *Decision:* You want to add a new transaction type to Bitcoin. Old nodes don't understand it. Do you need everyone to upgrade simultaneously?
- *Reveal:* Soft fork = backwards compatible (old nodes accept new blocks, even if they don't understand new features). Hard fork = not backwards compatible (old nodes reject new blocks).
- *Real illustration:* SegWit (soft fork, 2017). The Ethereum/Ethereum Classic split (hard fork, 2016, DAO hack). Bitcoin Cash fork (hard fork, 2017).

**2.11 — Proof of Stake: The Alternative Security Model**
- *Hook:* What if instead of burning electricity to prove commitment, you locked up capital? Lose the capital if you misbehave.
- *Decision:* Design a validator selection system that is unpredictable, fair, and resistant to manipulation.
- *Reveal:* Validators stake capital. Selection is weighted by stake, randomized using a VRF (from Layer 1). Misbehavior is punished by slashing — destroying part of the stake.
- *Key concepts:* Staking, slashing, validator selection, nothing-at-stake problem and how it's solved.

**2.12 — Finality in Proof of Stake**
- *Hook:* In proof of work, there's no true "final" block — only probabilistic safety. Proof of stake can do better. How?
- *Key concepts:* Checkpointing, finality gadgets (Casper FFG), the difference between safe and live.
- *Cross-chain comparison:* Ethereum's finality (2 epochs = ~12 minutes), Cosmos/Tendermint (instant finality), Solana (optimistic + probabilistic).

**2.13 — Validators, Attestations, and Committees (Ethereum PoS)**
- *Step by step:* How Ethereum selects validator committees, how attestations accumulate, how a block is finalized.
- *Key concepts:* Epochs, slots, proposers, attesters, sync committees.

**2.14 — Delegated and Liquid Staking**
- *Hook:* 32 ETH is ~$80,000. Most people can't run a solo validator. What are their options?
- *Key concepts:* Staking pools, liquid staking tokens (stETH, mSOL), delegated proof of stake (Solana, Cosmos).
- *Tradeoff:* Convenience vs. centralization risk.
- *Real illustration:* Lido controlling ~30% of staked ETH — is this a problem?

---

### Track D — Execution Environments

**2.15 — Accounts vs. UTXO: Two Models of Ownership**
- *Hook:* How does a blockchain actually keep track of who owns what?
- *Decision:* Design a ledger system that prevents double-spending without a central bank.
- *Reveal:* Two fundamentally different answers.
  - **UTXO (Bitcoin):** You don't have a "balance." You own specific unspent outputs from previous transactions.
  - **Account (Ethereum):** You have an account with a balance, like a bank. Simpler but different tradeoffs.
- *Tradeoff comparison:* UTXO enables better privacy and parallelism. Account model enables smart contracts more naturally.

**2.16 — The Ethereum Account Model in Depth**
- *Key concepts:* EOAs (externally owned accounts) vs. contract accounts, nonces (why they prevent replay attacks), account state (balance, nonce, code hash, storage hash).

**2.17 — The EVM: A World Computer**
- *Hook:* Ethereum describes itself as a "world computer." What does that actually mean mechanically?
- *Decision:* You want to run code that everyone in the network can verify was executed correctly. How?
- *Reveal:* Every node runs the same code and produces the same output. The EVM is a deterministic virtual machine — the same input always produces the same output on every node.
- *Key concepts:* Bytecode, opcodes, stack-based architecture, determinism.

**2.18 — Gas: Why Computation Has a Price**
- *Hook:* What stops someone from deploying an infinite loop to Ethereum and grinding the entire network to a halt?
- *Decision:* Design a metering system for computation.
- *Reveal:* Every EVM opcode has a gas cost. When you run out, execution stops and state reverts. But the gas you spent is still paid.
- *Interactive simulation:* Step through a simple transaction opcode by opcode. See the gas counter tick down.
- *Key concepts:* Gas units, gas price, gas limit, base fee (post-EIP-1559), priority fee.

**2.19 — The Mempool and Transaction Ordering**
- *Hook:* You submit a transaction. It doesn't immediately appear in a block. Where is it?
- *Key concepts:* The mempool, pending vs. queued transactions, nonce gaps, replacement transactions (EIP-1559 and replace-by-fee).

**2.20 — MEV: The Dark Forest**
- *Hook:* Validators can see every pending transaction before including it in a block. What can they do with that information?
- *Decision:* You're a validator. You see a pending transaction that will push a price up. You have capital. What do you do?
- *Reveal:* Front-run it. Or sandwich it. Or censor it. This is MEV — maximal extractable value.
- *Key concepts:* Front-running, sandwich attacks, back-running, arbitrage, liquidation MEV.
- *Real illustration:* The "dark forest" — researchers who accidentally exposed private keys on-chain and had their ETH stolen by MEV bots within the same block.

**2.21 — Cross-Chain Comparison: Solana's SVM**
- *Key concepts:* Accounts model (different from Ethereum's), parallel transaction execution, why Solana can process more transactions, Sealevel.
- *Tradeoff:* Parallelism requires more complex programming model (account locking).

**2.22 — Cross-Chain Comparison: Cosmos and CosmWasm**
- *Key concepts:* Application-specific blockchains, IBC (Inter-Blockchain Communication), CosmWasm smart contracts.
- *Design philosophy:* Sovereignty over sharding. Each chain optimizes for its use case.

---

## Layer 3 — The Application Stack
*What gets built on top of the protocol layer. Every topic in this layer becomes fully understandable only because of Layers 0, 1, and 2.*

---

**3.1 — Layer 2s & Scaling**
- *Hook:* Ethereum processes ~15 transactions per second. Visa processes ~24,000. How does Ethereum scale?
- *Key concepts:* Why bigger blocks don't solve the trilemma. The rollup thesis.
  - **Optimistic Rollups:** Execute off-chain, post data on-chain, assume correct, allow fraud proofs. (Arbitrum, Optimism)
  - **ZK Rollups:** Execute off-chain, post data on-chain, prove correctness with a ZK proof. (zkSync, StarkNet, Polygon zkEVM)
- *Decision:* Which rollup type do you choose? What are you trading off?
- *Real illustration:* Why Optimistic Rollups have 7-day withdrawal windows. Why ZK Rollups are faster to finalize but harder to build.

**3.2 — Data Availability**
- *Hook:* Rollups post transaction data to Ethereum. But storing data on Ethereum is expensive. What's the alternative?
- *Key concepts:* Data availability vs. data storage, EIP-4844 (blobs), Celestia, Ethereum's danksharding roadmap.
- *Decision:* Use Ethereum for DA or a separate DA layer? What does each trust?

**3.3 — Oracles**
- *Hook:* A smart contract needs the current price of ETH. But blockchains can't access the internet. How?
- *Key concepts:* Off-chain data, oracle networks, aggregation, manipulation resistance, TWAP vs. spot.
- *Decision:* Design an oracle for a lending protocol. What happens if the feed is wrong? What's your fallback?
- *Real illustration:* Mango Markets ($114M) — oracle manipulation. Compound DAI price bug ($150M in liquidations).

**3.4 — DeFi Primitives**
- **AMMs:** How Uniswap's constant product formula works. Why liquidity providers face impermanent loss.
- **Lending/Borrowing:** How Aave and Compound determine interest rates. What triggers liquidations.
- **Stablecoins:** Collateralized (DAI), fiat-backed (USDC), algorithmic (UST) — the mechanism and failure mode of each.
- **Liquid Staking:** How stETH works. The composability and systemic risk it introduces.
- *Decision series:* For each — what is the mechanism, what is the incentive, where is the risk?

**3.5 — Decentralized Identity (DIDs)**
- *Hook:* Your passport is issued by a government. What if no government existed — or you didn't trust yours?
- *Key concepts:* Self-sovereign identity, W3C DID standard, verifiable credentials, key rotation, social recovery.
- *Decision:* Design an identity system where you control your own credentials — but losing your key doesn't mean losing your identity.
- *Real use:* ENS names, Lens Protocol, World ID, on-chain reputation systems.

**3.6 — AI Agents On-Chain**
- *Hook:* What happens when autonomous software can hold a wallet, sign transactions, and make financial decisions without a human approving each one?
- *Key concepts:* Agent wallets, intent-based architectures, autonomous DeFi execution, on-chain governance agents.
- *Decision:* An AI agent manages a DeFi portfolio autonomously. It executes a losing trade. Who is responsible? Can it be stopped?
- *Open questions:* Trust assumptions, liability, kill switches. This is emerging infrastructure with unresolved problems.
- *Real use:* Autonolas, Giza, AI-driven yield optimization, automated governance participation.

**3.7 — Cross-Chain Infrastructure**
- *Key concepts:* Bridges (lock-and-mint, liquidity networks, native verification), messaging layers, interoperability standards (IBC, LayerZero, Wormhole, Axelar).
- *Decision:* Design a bridge between Ethereum and Solana. Where does the trust live?
- *Real illustration:* Wormhole ($320M), Ronin ($625M), Nomad ($190M) — what each was missing structurally.

---

## Layer 4 — Thinking Modules & Build Challenges
*Where the slogan lives at full depth. Real history, real tradeoffs, full architectural reasoning — now that users have the foundations to truly understand them.*

---

### Thinking Modules

**4.1 — Designing Token Economies**
- Inflation, incentive alignment, vesting, supply curves, the Curve Wars, Ethereum post-Merge.

**4.2 — Smart Contract Security Thinking**
- Attack surfaces, security assumptions, failure modes, upgradeability tradeoffs.
- *Case studies:* The DAO (reentrancy), Poly Network (privilege escalation), Tornado Cash (immutability vs. sanctions).

**4.3 — DeFi Systems Thinking**
- Liquidity as commitment, cascading failures, the liquidity mirage.
- *Case studies:* LUNA collapse, Iron Finance bank run, Euler Finance exploit.

**4.4 — Governance & Coordination**
- Voter apathy, plutocracy risk, flash loan voting, timelock mechanisms.
- *Case studies:* Beanstalk governance attack, MakerDAO under pressure.

**4.5 — Cross-Chain Thinking**
- The trilemma as a permanent design space. Interoperability tradeoffs.

**4.6 — Builder Psychology**
- Distribution, product-market fit, community as organizational primitive, narrative and timing.

---

### Build Challenges

**Challenge 1 — Design an Escrow System**
- Teardown: OpenSea's escrow and the 2022 old-listing exploit.

**Challenge 2 — Design a Governance System**
- Teardown: Beanstalk's missing timelock. What one mechanism would have prevented $182M loss.

**Challenge 3 — Design an Oracle System**
- Teardown: Mango Markets. Compound's DAI price bug.

**Challenge 4 — Design a Token Launch**
- Teardown: Optimism's OP airdrop vs. Arbitrum's ARB controversy vs. Aptos criticism.

**Challenge 5 — Design a Cross-Chain Bridge**
- Teardown: Wormhole, Ronin, Nomad — what each was missing.

**Challenge 6 — Design an AI Agent Wallet System**
- Open questions: authorization, liability, kill switches.

**Challenge 7 — The Builder's Audit** *(Capstone)*
- User audits a real (simplified) protocol design before reading what happened.
- *Case studies:* UST/Luna, Iron Finance, Euler Finance.

---

## Progression Map

| Stage | Layers | What They Can Do Afterward |
|---|---|---|
| **Foundation** | Layer 0 + Layer 1 Tracks A & B | Understand why cryptographic primitives exist and how they compose |
| **Cryptographic Depth** | Layer 1 Tracks C, D & E | Understand public key cryptography, ECC, and digital signatures from first principles |
| **Advanced Crypto** | Layer 1 Tracks F & G | Understand Merkle trees, ZKPs, SNARKs, STARKs, and MPC |
| **Protocol Understanding** | Layer 2 Tracks A, B & C | Understand P2P networks, consensus, forks, and why chains differ |
| **Execution Layer** | Layer 2 Track D | Understand the EVM, gas, MEV, and cross-chain execution environments |
| **Applied** | Layer 3 | Understand L2s, Oracles, DeFi, DIDs, AI Agents as systems with specific tradeoffs |
| **Strategic Thinking** | Layer 4 Thinking Modules | Read a protocol design and ask the right questions |
| **Capstone** | Layer 4 Build Challenges | Architect systems and audit designs against real failure histories |

---

## Content Creation Principles

1. **First principles always.** Start with the problem, not the solution.
2. **No skipped steps.** Every lesson maps its prerequisites explicitly.
3. **Execution before explanation.** Users run the code and see the outcome before receiving any explanation. The failure is the lesson.
4. **Code is the medium.** Even non-programmers are shown code snippets they must analyze logically. The point is not syntax — it is reasoning about consequences.
5. **Chain-agnostic.** Draw from whichever chain best illustrates the concept.
6. **Real events as illustrations, not starting points.** History enriches understanding — it doesn't replace building it.
7. **Tradeoffs over answers.** Every design choice trades something for something else.
8. **Failure is the teacher.** Wrong answer animations must show the real consequence — funds draining, chain breaking, attacker succeeding.
9. **No passive consumption.** If a user can complete a lesson without selecting and running code, the lesson is not ready.
10. **The visual is mandatory.** Every lesson must have a diagram showing the system being manipulated. A lesson without a visual is a reading exercise.

