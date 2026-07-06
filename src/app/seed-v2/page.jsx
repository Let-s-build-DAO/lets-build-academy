"use client";

import { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase_app from "../../firebase/config";

const icsDemo = {
  id: "layer-1-track-b-hash-functions",
  title: "Layer 1 Track B: Hash Functions",
  description: "Understand the DNA of blockchain — the one-way mathematical function that makes everything trustless.",
  author: "Academy V2.1",
  timeframe: "45 mins",
  skill: "Beginner",
  imgUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
  enabled: true,
  version: "2.0",
  lessons: [
    {
      title: "The Fingerprint Machine",
      subtitle: "Every piece of data has a unique fingerprint.",
      scenario: "A hash function takes any input — a single letter, a novel, a bank transaction — and produces a fixed-length fingerprint. Change one character in the input and the fingerprint changes completely.",
      question: "Alice changes just one letter in a document before hashing it. What happens to the hash?",
      interactionType: "ICS",
      sceneConfig: { type: "hash-avalanche" },
      options: [
        {
          id: "A",
          text: "The hash changes completely — every bit of the output is different.",
          isCorrect: true,
          successExplanation: "This is the Avalanche Effect. A single bit change in the input causes roughly 50% of the output bits to flip. This is a deliberate security property — it makes hash outputs unpredictable and tamper-evident.",
          failureReason: ""
        },
        {
          id: "B",
          text: "The hash changes slightly — just a few characters near the end.",
          isCorrect: false,
          failureReason: "If the output changed proportionally to the input, an attacker could reverse-engineer the original data by working backwards from small changes. Cryptographic hashes are designed to avoid any predictable relationship between input changes and output changes."
        },
        {
          id: "C",
          text: "The hash stays the same — a small change shouldn't matter.",
          isCorrect: false,
          failureReason: "If small changes produced the same hash, two slightly different documents could share the same fingerprint. That would break data integrity completely — you couldn't tell if a file had been tampered with."
        }
      ],
      revealText: "The Avalanche Effect is what makes SHA-256 suitable for blockchain. Even the smallest change to a block's data produces a completely different hash, which immediately breaks the chain link to the next block.",
      codeBlock: {
        language: "javascript",
        code: `import { sha256 } from "@noble/hashes/sha256";

sha256("Hello, World!") // → a591a6d40bf42040...
sha256("Hello, world!") // → 315f5bdb76d078c4...
//       ^ one char                ^ completely different`
      }
    },
    {
      title: "Collision Resistance",
      subtitle: "Can two different files share the same fingerprint?",
      scenario: "A researcher discovers that a new hash function — FastHash — produces the same output for two different documents: an innocent contract and a fraudulent one. An attacker is paying close attention.",
      question: "If FastHash produces identical outputs for two different documents, what attack does this enable?",
      interactionType: "ICS",
      sceneConfig: { type: "hash-avalanche" },
      options: [
        {
          id: "A",
          text: "Get someone to sign the innocent document, then swap it with the fraudulent one — same hash means same signature.",
          isCorrect: true,
          successExplanation: "This is a collision attack. If two inputs share a hash, a valid digital signature on one automatically validates the other. SHA-256 is collision-resistant — no one has ever found two inputs that produce the same output.",
          failureReason: ""
        },
        {
          id: "B",
          text: "Nothing serious — collisions are a normal and expected part of any hash function.",
          isCorrect: false,
          failureReason: "While collisions theoretically must exist (infinite inputs → finite outputs), a secure hash function must make finding them computationally infeasible. FastHash fails this requirement."
        },
        {
          id: "C",
          text: "The hash function is only broken for these two specific documents — all other inputs are still safe.",
          isCorrect: false,
          failureReason: "A hash function with any known collision is considered fully broken. The collision reveals that the underlying mathematical structure is flawed — it cannot be trusted for any security-critical purpose. This is what happened to MD5 and SHA-1."
        }
      ],
      revealText: "SHA-256 replaced MD5 and SHA-1 precisely because those algorithms had collision vulnerabilities found. Ethereum and Bitcoin depend on SHA-256's collision resistance for block hashing and Merkle tree integrity.",
      codeBlock: {
        language: "javascript",
        code: `// A collision means:
FastHash("Transfer $100 to Alice") === FastHash("Transfer $9999 to Eve")

// This lets an attacker:
// 1. Get Alice to digitally sign the $100 transfer
// 2. Submit the $9999 transfer — same hash = same signature
// 3. Alice's signature is now on Eve's transaction`
      }
    },
    {
      title: "Proof of Work",
      subtitle: "Why does mining cost energy?",
      scenario: "Bitcoin needs a rule for who gets to add the next block that can't be faked and is trivial to verify. The answer involves hash functions used as puzzles.",
      question: "What makes Proof of Work a fair and unfakeable rule for earning the right to add a block?",
      interactionType: "ICS",
      sceneConfig: { type: "pow-race" },
      options: [
        {
          id: "A",
          text: "Finding a valid hash requires billions of random attempts with no shortcut — but anyone can verify the answer in a single calculation.",
          isCorrect: true,
          successExplanation: "This asymmetry — hard to find, trivial to verify — is the entire point. You can't fake computational effort. And verification is instant. The energy spent is the proof.",
          failureReason: ""
        },
        {
          id: "B",
          text: "The miner with the most money buys the fastest hardware, so the richest always wins — that's what makes it fair.",
          isCorrect: false,
          failureReason: "Wealthier miners do have an advantage in practice, but this isn't the rule that makes PoW unfakeable. The rule is specifically the hash puzzle — you must find a nonce that produces a hash below the target. No amount of money skips this requirement."
        },
        {
          id: "C",
          text: "Miners vote on who should add the next block, and the majority decision wins.",
          isCorrect: false,
          failureReason: "Voting is exactly what PoW replaces. In a trustless system with anonymous participants, you can't vote — a single entity could create millions of fake identities and dominate any vote. Computational work is Sybil-resistant; voting is not."
        }
      ],
      revealText: "The 'difficulty target' is adjusted every 2016 blocks so that blocks arrive roughly every 10 minutes regardless of how much mining hardware exists. More miners = harder puzzle. Fewer miners = easier puzzle.",
      codeBlock: {
        language: "javascript",
        code: `// Find a nonce so the hash starts with enough zeros
let nonce = 0;
while (true) {
  const hash = sha256(blockData + nonce);
  if (hash.startsWith("0000")) break; // found it!
  nonce++; // try again — no shortcut exists
}
// Verification: sha256(blockData + nonce) → one calculation`
      }
    },
    {
      title: "Commitment Schemes",
      subtitle: "Prove you know something — without revealing it.",
      scenario: "Two bidders in a blind auction must submit their bids simultaneously. Neither can see the other's bid before committing. But after both commit, neither can change their answer. How do they do this on a public blockchain where everyone can see everything?",
      question: "What should each bidder send first so they can prove their bid later — without revealing it now?",
      interactionType: "ICS",
      sceneConfig: { type: "hash-avalanche" },
      options: [
        {
          id: "A",
          text: "Send a hash of their bid. Later, reveal the original bid. Anyone can verify: hash(bid) === the commitment.",
          isCorrect: true,
          successExplanation: "This is a cryptographic commitment scheme. The hash is 'binding' — you can't change your bid after committing because the hash would change. It's 'hiding' — the hash reveals nothing about your actual bid. Both properties are required.",
          failureReason: ""
        },
        {
          id: "B",
          text: "Send the first half of their bid. Reveal the second half later.",
          isCorrect: false,
          failureReason: "Sending half the information is neither hiding (it reveals information) nor binding (you could potentially change the second half). The other bidder could also infer your strategy from the partial reveal."
        },
        {
          id: "C",
          text: "Use a trusted third party to hold the bids and reveal them simultaneously.",
          isCorrect: false,
          failureReason: "A trusted third party reintroduces centralisation — and trust. The entire point of a blockchain-based auction is to eliminate the need for a trusted intermediary. A hash commitment achieves the same result mathematically, with zero trust required."
        }
      ],
      revealText: "Commit-reveal patterns are used extensively on-chain: in ENS domain auctions, in randomness generation (commit a hash of your random number, reveal later), and in on-chain voting where early votes shouldn't influence later voters.",
      codeBlock: {
        language: "solidity",
        code: `// Phase 1: Commit (hash of bid + secret salt)
bytes32 commitment = keccak256(abi.encodePacked(bidAmount, salt));
auction.commit(commitment);

// Phase 2: Reveal — anyone can verify
auction.reveal(bidAmount, salt);
// Contract checks: keccak256(bidAmount, salt) === commitment`
      }
    }
  ]
};


export default function SeedV2Page() {
  const [status, setStatus] = useState("Idle");
  const [logs, setLogs] = useState([]);

  const seedDatabase = async () => {
    setStatus("Seeding...");
    setLogs([]);
    const db = getFirestore(firebase_app);

    const courses = [icsDemo];

    try {
      for (const course of courses) {
        setLogs((prev) => [...prev, `Uploading: ${course.id}...`]);
        await setDoc(doc(db, "courses", course.id), course);
        setLogs((prev) => [...prev, `✅ Uploaded ${course.id}`]);
      }
      setStatus("Complete!");
    } catch (error) {
      setStatus("Error: " + error.message);
      setLogs((prev) => [...prev, `❌ ${error.message}`]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-400">V2.1 ICS Seeder</h1>
        <p className="text-gray-400 mb-8 text-center text-sm">
          Seeds the ICS-format hash functions course (Layer 1 Track B) into Firestore.
        </p>
        <div className="flex justify-center mb-8">
          <button
            onClick={seedDatabase}
            disabled={status === "Seeding..."}
            className="px-6 py-3 rounded-lg font-bold text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg disabled:opacity-50"
          >
            {status === "Seeding..." ? "Uploading..." : "Seed ICS Course"}
          </button>
        </div>
        <div className="bg-black p-4 rounded-lg font-mono text-sm min-h-[120px]">
          <div className="text-gray-500 mb-2 border-b border-gray-800 pb-2">Status: {status}</div>
          {logs.map((log, i) => (
            <div key={i} className={log.includes("❌") ? "text-red-400" : log.includes("✅") ? "text-green-400" : "text-gray-300"}>
              {log}
            </div>
          ))}
          {logs.length === 0 && <div className="text-gray-600 italic">Waiting...</div>}
        </div>
      </div>
    </div>
  );
}
