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
    <AdminLayout>
      <SingleCourse data={data} userId={user.id} courseId={page} />
    </AdminLayout>
  );
};

export default Single;
