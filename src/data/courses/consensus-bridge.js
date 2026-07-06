/** Built-in interactive course — simulations (hash, puzzle, blockchain) */
export const consensusBridgeCourse = {
  id: "consensus-demo",
  title: "Consensus Bridge",
  description:
    "Master blockchain fundamentals through hands-on simulations — hashing, digital signatures, and chain integrity.",
  author: "Academy",
  timeframe: "1.5 Hours",
  skill: "Beginner",
  imgUrl:
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80",
  enabled: true,
  version: "2.0",
  lessons: [
    {
      title: "Primal Cryptography",
      subtitle: "The Hashing Engine",
      interactionType: "hash",
      challengePrefix: "00",
      body: "The Hash is the DNA of the blockchain. As you type, the engine computes a 256-bit fingerprint. Changing a single character completely alters the output — the Avalanche Effect.",
      instruction:
        "Find any input that produces a hash starting with 00, or use Brute Force Nonce to mine one.",
      tags: ["Hashing", "SHA-256", "PoW"],
    },
    {
      title: "The Logic of Ownership",
      subtitle: "Public / Private Keys",
      interactionType: "puzzle",
      body: "You do not need a central bank because you have math. Private keys prove identity without revealing it.",
      instruction: "Select the correct answer to proceed.",
      puzzleData: {
        question:
          "Alice wants Bob to verify she sent a message. Which key must she use to sign it?",
        options: [
          "Alice's Public Key",
          "Alice's Private Key",
          "Bob's Public Key",
          "Bob's Private Key",
        ],
        correctIndex: 1,
        explanation:
          "Alice uses her Private Key to create a signature. Anyone with her Public Key can verify that only she could have created it.",
      },
      tags: ["Cryptography", "Identity", "Keys"],
    },
    {
      title: "The Immutable Ledger",
      subtitle: "Why Blockchains Don't Break",
      interactionType: "blockchain",
      body: "Each block contains the hash of the block before it. This mathematical link ensures the past cannot be changed without breaking the present.",
      instruction:
        "Edit the data in Block #1 and watch the chain turn red — then continue when you understand why.",
      tags: ["Immutability", "Chaining", "Security"],
    },
  ],
};
