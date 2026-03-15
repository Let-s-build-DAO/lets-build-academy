"use client";

import CoursesCard from "@/src/components/cards/CoursesCard";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/src/components/layouts/AdminLayout";

import Link from "next/link";
import { collection, query, getDocs, getFirestore, where  } from "firebase/firestore";
import firebase_app from "../../../firebase/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useAtom } from "jotai";
import { userAtom } from "@/src/store";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [user] = useAtom(userAtom);

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

  const getData = async () => {
    const all = [];
    const q = query(collection(db, "courses"), where("enabled", "==", true));
    const data = await getDocs(q);

    // Inject "Consensus Bridge (Demo)" hardcoded core course
    all.push({
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
    });

    data.forEach((doc) => {
      all.push({ ...doc.data(), id: doc.id });
    });

    setCourses(all);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminLayout>
      <section className="my-6 lg:flex justify-between">
        <div className="lg:w-96">
          <h1 className="text-4xl font-bold">Hey {user?.username} 👋 </h1>
          <p className="text-sm">
            All our premium courses
          </p>
        </div>
        {/* <button className='bg-purple p-3 sm:mt-4 rounded-md text-white flex my-auto'>
          <p className='text-sm'>Mint our NFT</p>
          <img className='h-3 w-3 my-auto ml-3' src="../images/icons/arrow-white.svg" alt="" />
        </button> */}
      </section>
      <section>
        <div className="grid lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <CoursesCard key={index} course={course} userId={userId} />
          ))}
        </div>
      </section>
    </AdminLayout>
  );
};

export default Courses;
