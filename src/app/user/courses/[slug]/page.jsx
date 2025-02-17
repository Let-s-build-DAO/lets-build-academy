'use client'

import SingleCourse from '@/src/components/views/SingleCourse';
import AdminLayout from '@/src/layouts/AdminLayout';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import firebase_app from "../../../../firebase/config";
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const CoursesPage = () => {
  const [data, setData] = useState()
  const params = useParams();
  const [userId, setUserId] = useState(null);
  const { slug } = params;

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
      <SingleCourse data={data} userId={userId} courseId={slug} />
    </AdminLayout>
  );
};

export default CoursesPage;