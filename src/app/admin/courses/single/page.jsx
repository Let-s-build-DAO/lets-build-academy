"use client"

import SingleCourse from '@/src/components/views/SingleCourse';
import AdminLayout from '@/src/layouts/AdminLayout';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from 'next/navigation';
import firebase_app from "../../../../firebase/config";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(firebase_app);

const Single = () => {
  const [data, setData] = useState()
  const page = useSearchParams().get("id")

  const getCourse = async () => {
    const docRef = doc(db, "courses", page);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getCourse()
  }, [])
  return (
    <AdminLayout>
      <SingleCourse data={data} />
    </AdminLayout>
  );
};

export default Single;