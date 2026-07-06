export const v2MvpCourses = [
  // LAYER 0
  {
    "id": "layer-0-mental-models",
    "title": "Layer 0: Mental Model Boot Camp",
    "description": "Before we write a single line of code, we must rewire how you reason about systems. Master adversarial thinking, trust assumptions, and decentralization.",
    "author": "Academy V2.1",
    "timeframe": "45 mins",
    "skill": "Beginner",
    "imgUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80",
    "enabled": true,
    "version": "2.0",
    "lessons": [
      {
        "title": "The Invisible Handshakes",
        "subtitle": "What are you actually trusting?",
        "interactionType": "SMC",
        "interactionData": {
          "scenario": "You open your browser and navigate to a decentralized exchange (DEX) to swap some tokens.",
          "question": "Before the page even loads, which of the following are you NOT implicitly trusting?",
          "options": [
            { "id": "A", "text": "The Domain Name System (DNS) to route you to the right server." },
            { "id": "B", "text": "The TLS Certificate Authority to verify the site's identity." },
            { "id": "C", "text": "The smart contract code deployed on the blockchain." },
            { "id": "D", "text": "The frontend hosting provider (like Vercel or AWS)." }
          ],
          "correctId": "C",
          "explanation": "You are trusting DNS, TLS, and the frontend host just to see the website! The only thing you aren't trusting BEFORE the page loads is the smart contract. A 'decentralized' app often relies on a highly centralized web stack just to reach your screen."
        }
      },
      {
        "title": "The RPC Bottleneck",
        "subtitle": "Your window into the chain",
        "interactionType": "ProgressiveReveal",
        "interactionData": {
          "steps": [
            { "text": "<h3>You made it to the real DEX.</h3><p>Now you connect MetaMask and check your balance. The balance reads <strong>100 USDC</strong>.</p>" },
            { "text": "<h3>How does MetaMask know?</h3><p>MetaMask doesn't store the blockchain. It asks an <strong>RPC Provider</strong> (like Infura or Alchemy)—a centralized server that runs an Ethereum node on your behalf.</p>" },
            { "text": "<h3>The Reality Check</h3><p>If the RPC provider lies, MetaMask lies to you. <strong>Blockchain eliminates trust at the base layer, but often just moves it to the infrastructure layer.</strong> Always know exactly who you are trusting.</p>" }
          ]
        }
      },
      {
        "title": "The Decentralization Spectrum",
        "subtitle": "It is not a philosophy. It is a metric.",
        "interactionType": "SMC",
        "interactionData": {
          "scenario": "A blockchain network has 10,000 validators spread globally. However, 100% of these validators run the exact same software client written by a single company.",
          "question": "If a critical bug is discovered in that software client, what happens to the network?",
          "options": [
            { "id": "A", "text": "The network remains secure because the validators are geographically distributed." },
            { "id": "B", "text": "The network halts or forks because of a single point of failure." },
            { "id": "C", "text": "The validators automatically switch to a backup software client." }
          ],
          "correctId": "B",
          "explanation": "Decentralization has multiple axes! You can have massive geographic decentralization (10,000 nodes) but zero client diversity. If the single software client has a bug, the entire network goes down simultaneously. Decentralization is only as strong as its weakest axis."
        }
      },
      {
        "title": "Adversarial Incentives",
        "subtitle": "Assume everyone is attacking you.",
        "interactionType": "SMC",
        "interactionData": {
          "scenario": "You design a decentralized voting system. It costs $0 to vote. Users are anonymous, identified only by a cryptographic keypair.",
          "question": "What is the primary vulnerability in this design?",
          "options": [
            { "id": "A", "text": "A malicious user could decrypt other users' votes." },
            { "id": "B", "text": "A single user could generate 100,000 keypairs and vote 100,000 times." },
            { "id": "C", "text": "The system would run too slowly due to the cryptographic overhead." }
          ],
          "correctId": "B",
          "explanation": "This is called a Sybil Attack. In a permissionless system, if an action is free, it will be abused. Blockchains do not assume people are honest; they design systems where acting dishonestly is economically unprofitable."
        }
      },
      {
        "title": "The Illusion of Finality",
        "subtitle": "When is a transaction truly irreversible?",
        "interactionType": "ProgressiveReveal",
        "interactionData": {
          "steps": [
            { "text": "<h3>You are a merchant selling a $1,000,000 yacht.</h3><p>A buyer sends you the payment on a Proof-of-Work blockchain. You see the transaction appear in the very next block. Do you hand over the keys?</p>" },
            { "text": "<h3>The Reorganization Risk</h3><p>No. In Proof-of-Work, if another miner solves a slightly longer chain that doesn't include your transaction, the network switches to that longer chain. Your block becomes an 'orphan'. Your payment vanishes.</p>" },
            { "text": "<h3>Probabilistic Finality</h3><p>Every additional block added on top of yours makes a reorganization exponentially harder. For a coffee, 1 confirmation is fine. For a yacht, you wait for 6 confirmations. Finality is a spectrum based on the value at risk.</p>" }
          ]
        }
      },
      {
        "title": "The Byzantine Generals Problem",
        "subtitle": "Why distributed systems are hard",
        "interactionType": "ProgressiveReveal",
        "interactionData": {
          "steps": [
            { "text": "<h3>The Setup</h3><p>Four generals surround an enemy city. They can only communicate via messengers. To win, they must ALL attack at the exact same time. If they attack at different times, they are destroyed.</p>" },
            { "text": "<h3>The Traitor</h3><p>One of the generals is a traitor. He sends a message to General 1 saying 'ATTACK', but a message to General 2 saying 'RETREAT'.</p>" },
            { "text": "<h3>The Paradox</h3><p>How do the honest generals reach a unified consensus when the information they are receiving from their peers is intentionally conflicting? This is the core problem every blockchain exists to solve.</p>" }
          ]
        }
      }
    ]
  },
  
  // LAYER 1 TRACK A
  {
    "id": "layer-1-track-a-number-theory",
    "title": "Layer 1 Track A: Number Theory",
    "description": "The security of blockchain is not magic. It is scale. Understand binary, hexadecimal, randomness, and the incomprehensible size of a private key.",
    "author": "Academy V2.1",
    "timeframe": "60 mins",
    "skill": "Beginner",
    "imgUrl": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80",
    "enabled": true,
    "version": "2.0",
    "lessons": [
      {
        "title": "The Scale of Cryptography",
        "subtitle": "What does 2^256 actually mean?",
        "interactionType": "ProgressiveReveal",
        "interactionData": {
          "steps": [
            { "text": "<h3>Your private key is just a number.</h3><p>Specifically, it is a number between 1 and 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936.</p>" },
            { "text": "<h3>Why does the size matter?</h3><p>If you had a supercomputer that could guess one billion private keys every single second, it would take longer than the current age of the universe to guess your specific key by chance.</p>" },
            { "text": "<h3>The Reality</h3><p>Cryptography relies on <strong>computational infeasibility</strong>. It is not theoretically impossible to guess a private key; it is just physically impossible within the constraints of time and energy in our universe.</p>" }
          ]
        }
      },
      {
        "title": "Blockchains Speak Hexadecimal",
        "subtitle": "Binary for computers, Hex for humans.",
        "interactionType": "LiveSimulation",
        "body": "<p>Computers think in <strong>binary</strong> (0s and 1s). But reading 256 bits of binary is impossible for a human.</p><p>Instead, blockchains use <strong>hexadecimal</strong> (base-16). In hex, we use numbers 0-9 and letters a-f. This compresses 4 bits of binary into a single readable character.</p>",
        "instruction": "Toggle the binary bits below to see how they instantly convert to a hexadecimal character.",
        "interactionData": {
          "simulationConfig": {
            "type": "binary-to-hex",
            "bitCount": 8,
            "successCondition": "Match the hexadecimal value 'ff'"
          }
        }
      },
      {
        "title": "The Randomness Problem",
        "subtitle": "Why computers struggle to be unpredictable.",
        "interactionType": "SMC",
        "interactionData": {
          "scenario": "A developer writes a crypto wallet app. To generate a completely random private key, the code looks at the current exact millisecond on the computer's clock and uses that number as the seed.",
          "question": "What is the catastrophic flaw in this design?",
          "options": [
            { "id": "A", "text": "The clock might be out of sync with the blockchain network." },
            { "id": "B", "text": "An attacker who knows roughly when the wallet was created can guess the seed in a few thousand attempts." },
            { "id": "C", "text": "The millisecond is not a large enough number to fill 256 bits." }
          ],
          "correctId": "B",
          "explanation": "Computers are deterministic—they cannot generate true randomness. Using a timestamp means the entropy (unpredictability) is incredibly low. In 2013, an Android Bitcoin wallet had a similar randomness bug, resulting in hundreds of stolen wallets because attackers just brute-forced the predictable timestamps."
        }
      },
      {
        "title": "The Asymmetry of Math",
        "subtitle": "Easy to do, impossible to undo.",
        "interactionType": "Experiential",
        "body": "<p>If you multiply two prime numbers together, calculating the result takes milliseconds.</p><p>But if you are only given the result, finding out which two prime numbers created it is incredibly difficult.</p>",
        "instruction": "Try to factor the number below. Experience the computational difficulty of working backwards.",
        "interactionData": {
          "puzzle": {
            "equation": "? × ? = 91",
            "target": 91,
            "operations": "multiplication",
            "successMessage": "You figured out it's 7 × 13. Now imagine factoring a number with 600 digits. That asymmetry is the foundation of RSA cryptography."
          }
        }
      },
      {
        "title": "The One-Way Function",
        "subtitle": "The holy grail of cryptography.",
        "interactionType": "SMC",
        "interactionData": {
          "scenario": "You need to design a mathematical operation for a blockchain. You input a document, and it outputs a unique fingerprint.",
          "question": "Which of these is the most critical property of this function?",
          "options": [
            { "id": "A", "text": "It must be possible to reconstruct the document from the fingerprint if you have a special key." },
            { "id": "B", "text": "It must be completely impossible to determine what the document said just by looking at the fingerprint." },
            { "id": "C", "text": "The fingerprint must be smaller than the document to save storage space." }
          ],
          "correctId": "B",
          "explanation": "This is called 'Pre-image Resistance'. A true one-way function is irreversible. You cannot un-bake a cake, and you cannot un-hash a document. If it were reversible, anyone could reconstruct private data from public fingerprints."
        }
      }
    ]
  },
  
  // LAYER 1 TRACK B
  {
    "id": "layer-1-track-b-hash-functions",
    "title": "Layer 1 Track B: Hash Functions",
    "description": "Understand the DNA of blockchain. Discover how a one-way mathematical function guarantees data integrity and forms the basis of Proof of Work.",
    "author": "Academy V2.1",
    "timeframe": "45 mins",
    "skill": "Beginner",
    "imgUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
    "enabled": true,
    "version": "2.0",
    "lessons": [
      {
        "title": "The Fingerprint Machine",
        "subtitle": "The Avalanche Effect",
        "interactionType": "HashAvalanche",
        "interactionData": {
          "originalText": "Transfer $100 to Alice",
          "tamperedText": "Transfer $100 to AlIce",
          "question": "You change one letter, then hash the document again. What happens to the fingerprint?",
          "options": [
            {
              "id": "A",
              "text": "It changes completely — unrelated to where you edited."
            },
            {
              "id": "B",
              "text": "Only the characters near your edit change in the hash."
            },
            {
              "id": "C",
              "text": "It stays the same — tiny edits shouldn't matter."
            }
          ],
          "correctId": "A",
          "explanation": "This is the Avalanche Effect. One bit of input change flips roughly half the output bits. That's why you can prove a file wasn't tampered with by comparing hashes — without sending the whole file."
        }
      },
      {
        "title": "Properties of a Secure Hash",
        "subtitle": "What makes it unbreakable?",
        "interactionType": "SMC",
        "interactionData": {
          "scenario": "A new hash function called 'FastHash' is proposed. A researcher proves that they can find two completely different input documents that produce the exact same FastHash output.",
          "question": "Which critical property of a secure hash function does FastHash violate?",
          "options": [
            { "id": "A", "text": "Pre-image Resistance (Reversibility)" },
            { "id": "B", "text": "Collision Resistance" },
            { "id": "C", "text": "The Avalanche Effect" }
          ],
          "correctId": "B",
          "explanation": "This violates Collision Resistance. If two documents have the same hash, an attacker could ask you to digitally sign the hash of a harmless contract, and then attach your signature to a malicious contract that happens to have the exact same hash!"
        }
      },
      {
        "title": "Commitment Schemes",
        "subtitle": "Proving you know something without saying it.",
        "interactionType": "ProgressiveReveal",
        "interactionData": {
          "steps": [
            { "text": "<h3>The Problem</h3><p>Two generals must simultaneously reveal nuclear launch codes to verify they match—without either seeing the other's code first. How do you do this over a public channel?</p>" },
            { "text": "<h3>The Hash Commitment</h3><p>General A hashes his code and sends the hash to General B. General B does the same.</p>" },
            { "text": "<h3>The Reveal</h3><p>Because hashes are irreversible (Hiding), neither knows the other's code. Because hashes are collision-resistant (Binding), neither can change their code after sending the hash. Once both hashes are exchanged, they reveal the original codes and verify the hashes match.</p>" }
          ]
        }
      },
      {
        "title": "Hash Functions as Puzzles",
        "subtitle": "Proof of Work",
        "interactionType": "hash",
        "interactionData": {
          "prompt": "Miners hunt for a nonce so the block hash starts with leading zeros — pure brute force, no shortcuts."
        },
        "challengePrefix": "0000"
      }
    ]
  },
  
  // LAYER 2 TRACK B
  {
    "id": "layer-2-track-b-block-and-chain",
    "title": "Layer 2 Track B: The Block & The Chain",
    "description": "How do you build a database that anyone can verify but no one can secretly alter? Connect cryptography to network architecture.",
    "author": "Academy V2.1",
    "timeframe": "45 mins",
    "skill": "Intermediate",
    "imgUrl": "https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&w=400&q=80",
    "enabled": true,
    "version": "2.0",
    "lessons": [
      {
        "title": "What's Inside a Block?",
        "subtitle": "Decoding the anatomy",
        "interactionType": "ProgressiveReveal",
        "interactionData": {
          "steps": [
            { "text": "<h3>A block is just a text file.</h3><p>There is no magic inside a block. It is simply a bundle of data, split into two main parts: the <strong>Header</strong> and the <strong>Body</strong>.</p>" },
            { "text": "<h3>The Block Body</h3><p>This contains the actual list of transactions. 'Alice sent Bob 5 BTC'. 'Charlie deployed a smart contract'. It can contain hundreds or thousands of transactions.</p>" },
            { "text": "<h3>The Block Header</h3><p>This is the metadata. It contains the time the block was mined, the 'Nonce' used for Proof-of-Work, a mathematical summary of all the transactions (the Merkle Root), and most importantly: <strong>The Hash of the Previous Block</strong>.</p>" }
          ]
        }
      },
      {
        "title": "The Blockchain Data Structure",
        "subtitle": "Why blockchains don't break",
        "interactionType": "blockchain",
        "body": "<p>You have a list of records. If you change record #2, how does everyone else in the network know you cheated?</p><p>Because each block's Header contains the unique fingerprint (Hash) of the block that came before it.</p><p>This creates a mathematical chain. If you alter data in Block 1, its hash changes. Because Block 2 contains the old hash of Block 1, Block 2 is now invalid. To fix Block 2, you have to change it, which changes its hash, which breaks Block 3. The chain is <strong>tamper-evident by structure</strong>.</p>",
        "instruction": "Experiment with the immutable ledger below. Try to secretly tamper with the data in Block 1. Notice how the entire chain collapses."
      },
      {
        "title": "The Transaction Lifecycle",
        "subtitle": "From wallet to finality",
        "interactionType": "ProgressiveReveal",
        "interactionData": {
          "steps": [
            { "text": "<h3>1. Creation & Signature</h3><p>You want to send 1 ETH. Your wallet creates a transaction object and signs it using your Private Key (ECDSA). This proves you authorized it.</p>" },
            { "text": "<h3>2. The Mempool</h3><p>Your wallet broadcasts the transaction to a node. That node shares it with other nodes (Gossip Protocol). It sits in a waiting room called the <strong>Mempool</strong> with everyone else's pending transactions.</p>" },
            { "text": "<h3>3. Block Production</h3><p>A miner (or validator) selects your transaction from the mempool (usually because you paid a high gas fee) and packages it into a new Block.</p>" },
            { "text": "<h3>4. Propagation & Verification</h3><p>The miner broadcasts the new block to the network. Every other node receives it, unpacks it, and verifies every single transaction inside it. If everything is valid, they add the block to their own copy of the ledger. Your transaction is now <strong>Confirmed</strong>.</p>" }
          ]
        }
      }
    ]
  }
];
