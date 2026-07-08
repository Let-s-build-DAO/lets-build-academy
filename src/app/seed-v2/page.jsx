"use client";

import { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase_app from "../../firebase/config";

const db = getFirestore(firebase_app);

// ── Track 0: Prerequisites ────────────────────────────────────────────────
// The new 4-beat structure: Bait -> Break -> Model -> Prove
// ─────────────────────────────────────────────────────────────────────────
const track0Course = {
  id: "track-0-prerequisites",
  title: "Track 0: Prerequisites",
  description:
    "Trust is a resource. Every system is a different strategy for economizing on it. Feel why centralized trust breaks down before touching a blockchain.",
  author: "LB Academy",
  timeframe: "45 mins",
  skill: "Beginner",
  imgUrl:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
  enabled: true,
  version: "4.0", // 4-beat structure
  lessons: [
    {
      title: "Hashing as a Trust Primitive",
      subtitle: "Why 'hard to reverse' is a feature, not a bug.",
      steps: [
        {
          type: "bait",
          scenario: "You need to ensure a critical legal document hasn't been altered in transit.",
          context: "Most people think of checksums as just a way to detect accidental typos during a download. If a malicious actor intentionally edits the document, couldn't they just edit it in a way that produces the same checksum?",
          options: [
            "Yes, if they know the math, they can reverse-engineer an edit to match the checksum.",
            "No, a good checksum makes reverse-engineering mathematically impossible."
          ],
        },
        {
          type: "break",
          task: "Try to forge this payment document",
          context: "The original document used $100. Drag different amounts into the document and try to find one that produces the same hash as the original. Can you change the amount without the hash noticing?",
          config: {
            widget: "hash-forge",
            documentTemplate: "Pay Alice: ___",
            options: ["$500", "$200", "$100"],
            originalAmount: "$100",
          },
          reveal: "The only amount that produces the correct hash is the original: $100. Every other amount \u2014 even $99 or $101 \u2014 creates an entirely different fingerprint. You cannot forge a document and keep the same hash. This is what makes hash functions a trust primitive.",
        },
        {
          type: "model",
          title: "The One-Way Function",
          body: [
            "A cryptographic hash function is fundamentally different from a simple checksum.",
            "If a checksum is a word count, it's easy to write a new essay with the exact same word count. But a hash function is an irreversible fingerprint.",
            "It relies on the Avalanche Effect: changing a single bit of the input changes approximately 50% of the output bits in an unpredictable way.",
            "This asymmetry — trivial to compute forward, impossible to compute backward — is the bedrock of all trustless systems. It turns verifying integrity from a 'trust' problem into a 'math' problem."
          ],
          keyConcepts: [
            "One-Way Function: Easy to compute, computationally infeasible to reverse.",
            "Avalanche Effect: A tiny input change causes a massive, unpredictable output change.",
            "Collision Resistance: It's effectively impossible to find two different inputs that produce the same hash."
          ],
        },
        {
          type: "prove",
          task: "Demonstrate the Avalanche Effect",
          context: "To prove you understand the model, compute the hash of the document, then tamper with exactly one character to observe the total cascade change.",
          config: {
            widget: "hash-live-input",
            initialText: "The quick brown fox jumps over the lazy dog",
            successCondition: "inputChanged",
          },
          reveal: "Mastery demonstrated. You changed one character and the entire fingerprint became unrecognizable. You can now rely on this primitive to detect tampering without trusting a third party.",
        },
      ],
    },
    // We will add the other Track 0 units here as we build the widgets
  ],
};

// ── Seed page component ──────────────────────────────────────────────────
export default function SeedV2Page() {
  const [status, setStatus] = useState("idle");
  const [log, setLog] = useState([]);

  const addLog = (msg) => setLog((prev) => [...prev, msg]);

  const handleSeed = async () => {
    setStatus("seeding");
    setLog([]);

    try {
      const { id, ...rest } = track0Course;
      await setDoc(doc(db, "courses", id), { ...rest, id });
      addLog(`✅ Seeded: ${id}`);
      addLog(`   → ${track0Course.lessons.length} lessons`);
      const totalSteps = track0Course.lessons.reduce(
        (acc, l) => acc + l.steps.length,
        0
      );
      addLog(`   → ${totalSteps} beats total (4-beat structure)`);
      addLog(`   → Engine: LessonJourneyEngine (Bait, Break, Model, Prove)`);
      addLog(``);
      addLog(`🎉 Done! Open /user/courses/${id} to test.`);
      setStatus("done");
    } catch (err) {
      addLog(`❌ Error: ${err.message}`);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center p-8">
      <div className="max-w-lg w-full space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Seed — Track 0</h1>
          <p className="text-gray-400 text-sm mt-1">
            Seeds Track 0 using the new strict 4-Beat architecture (Bait → Break → Model → Prove).
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-5 space-y-2 border border-white/5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">What gets seeded</p>
          <div className="space-y-1 text-sm text-gray-300">
            <p>📦 <span className="font-mono text-indigo-400">track-0-prerequisites</span></p>
            <p>📖 Unit 2: Hashing as a Trust Primitive (4 beats)</p>
          </div>
        </div>

        <button
          onClick={handleSeed}
          disabled={status === "seeding"}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
            status === "seeding"
              ? "bg-white/10 text-white/40 cursor-not-allowed"
              : status === "done"
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
          }`}
        >
          {status === "seeding" ? "Seeding…" : status === "done" ? "✓ Seeded!" : "Seed Track 0 →"}
        </button>

        {log.length > 0 && (
          <div className="bg-[#16161f] border border-white/5 rounded-2xl p-4 font-mono text-xs text-gray-400 space-y-1">
            {log.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
