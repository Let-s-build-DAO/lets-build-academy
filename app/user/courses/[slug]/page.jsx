'use client'

import SingleCourse from '@/app/_components/views/SingleCourse';
import AdminLayout from '@/app/_layouts/AdminLayout';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import firebase_app from "../../../firebase/config";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(firebase_app);

const CoursesPage = () => {
  const [data, setData] = useState()
  const params = useParams();
  const { slug } = params;

  const getCourse = async () => {
    const docRef = doc(db, "courses", slug);
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
    <AdminLayout header={false}>
      <SingleCourse data={data} />
    </AdminLayout>
  );
};

export default CoursesPage;