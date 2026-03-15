"use client";

import SingleCourse from "@/src/components/views/SingleCourse";
import AdminLayout from "@/src/components/layouts/AdminLayout";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import firebase_app from "../../../../firebase/config";
import { getFirestore } from "firebase/firestore";
import { userAtom } from "@/src/store";
import { useAtom } from "jotai";
const db = getFirestore(firebase_app);

const Single = () => {
  const [data, setData] = useState();
  const page = useSearchParams().get("id");
  const [user] = useAtom(userAtom);
  const getCourse = async () => {
    if (page === "consensus-demo") {
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
            title: "The Immutable Ledger",
            subtitle: "Why Blockchains Don't Break",
            simulationType: "blockchain",
            handsOn: true,
            body: "# Linking the Blocks\n\nEach block contains the hash of the previous block. This creates a chain of integrity.",
            instruction: "Try editing the data in Block #1. Notice how the subsequent blocks turn RED. This demonstrates why even a tiny change renders a blockchain invalid.",
            tags: ["Immutability", "Chaining", "Security"]
          }
        ]
      };
      setData(demoData);
      return;
    }
    const docRef = doc(db, "courses", page);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (!user.id) return;
    getCourse();
    console.log("user Data:", user.id);
    console.log(page);
  }, [user]);
  return (
    <AdminLayout hideSidebar={true}>
      <SingleCourse data={data} userId={user.id} courseId={page} />
    </AdminLayout>
  );
};

export default Single;
