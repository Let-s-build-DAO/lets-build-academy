'use client'

import SingleCourse from '@/src/components/views/SingleCourse';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import firebase_app from "../../../../firebase/config";
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { FaSpinner } from "react-icons/fa";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const CoursesPage = () => {
  const [data, setData] = useState();
  const params = useParams();
  const [userId, setUserId] = useState(null);
  const { slug } = params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const getCourse = async () => {
    setLoading(true);

    if (slug === "consensus-demo") {
      const demoData = {
        id: "consensus-demo",
        title: "Consensus Bridge (Demo)",
        description: "Master blockchain technology through active learning, first-principles reasoning, and interactive simulations. Designed for deep conceptual mastery.",
        author: "Academy",
        timeframe: "1.5 Hours",
        skill: "Beginner",
        imgUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80",
        enabled: true,
        lessons: [
          {
            title: "Primal Cryptography",
            subtitle: "The Hashing Engine",
            simulationType: "hash",
            handsOn: true,
            challengePrefix: "00",
            body: "# The One-Way Function\n\nBegin your journey with the **Hash**. It is the DNA of the blockchain. As you type, the engine computes a 256-bit fingerprint. \n\nChanging a single character completely alters the output—this is called the *Avalanche Effect*.",
            instruction: "Experiment with the hashing engine below. **Your First Challenge:** Find any input that results in a hash starting with the characters '00'.",
            tags: ["Hashing", "SHA-256", "PoW"]
          },
          {
            title: "The Logic of Ownership",
            subtitle: "Public/Private Keys Puzzle",
            handsOn: true,
            simulationType: "puzzle",
            puzzleData: {
              question: "In a decentralized network, if Alice wants Bob to verify she sent a message, which key must she use to 'sign' the message?",
              options: [
                "Alice's Public Key",
                "Alice's Private Key",
                "Bob's Public Key",
                "Bob's Private Key"
              ],
              correctIndex: 1,
              explanation: "Alice uses her **Private Key** to create a signature. Anyone with her Public Key can then verify that only she could have created it."
            },
            body: "# Digital Signatures\n\nYou don't need a central bank because you have math. Private keys prove identity without revealing it.",
            instruction: "Solve the logic challenge above to proceed.",
            tags: ["Cryptography", "Identity", "Keys"]
          },
          {
            title: "The Immutable Ledger",
            subtitle: "Why Blockchains Don't Break",
            simulationType: "blockchain",
            handsOn: true,
            body: "# Chaining Integrity\n\nEach block contains the hash of the block before it. This mathematical link ensures that the past cannot be changed without breaking the present.",
            instruction: "Tamper with Block #1. Notice how the entire chain turns RED. This is how a blockchain defends itself against fraud.",
            tags: ["Immutability", "Chaining", "Security"]
          }
        ]
      };
      setData(demoData);
      setLoading(false);
      return;
    }

    const docRef = doc(db, "courses", slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      setData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCourse();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-purple text-4xl mb-2" />

        {/* <span className="text-purple font-semibold text-xl">Loading...</span> */}
      </div>
    );
  }

  return (
    <AdminLayout collapsedProps={true} hideSidebar={true}>
      <SingleCourse data={data} userId={userId} courseId={slug} />
    </AdminLayout>
  );
};

export default CoursesPage;