'use client'

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/src/components/layouts/AdminLayout';
import Link from 'next/link';
import { collection, query, getDocs, addDoc } from "firebase/firestore";
import firebase_app from "../../../firebase/config";

import { getFirestore } from "firebase/firestore";
import AdminCourse from '@/src/components/cards/AdminCourse';
const db = getFirestore(firebase_app);
const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const all = []
    
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

    const data = await getDocs(collection(db, "courses"))
    data.forEach((doc) => {
      all.push({ ...doc.data(), id: doc.id })
    });
    setCourses(all)
  }
  useEffect(() => {

    getData()
  }, [])

  

  // console.log(courses)
  return (
    <AdminLayout>
      <section className='my-8'>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold'>Courses</h1>
          <div className='flex gap-4'>
            <Link href={'/admin/courses/new'}>
              <button className='bg-purple p-3 rounded-full px-6 text-white font-bold shadow-lg shadow-purple/20 hover:scale-105 transition-transform'>Add New</button>
            </Link>
          </div>
        </div>
        <div className='flex mt-4 flex-wrap justify-between'>
          {courses.map((course, index) => <AdminCourse getData={() => getData()} key={index} course={course} />)}
        </div>
      </section>
    </AdminLayout>
  );
};

export default Courses;