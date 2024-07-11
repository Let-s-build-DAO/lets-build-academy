"use client";

import CoursesCard from "@/app/_components/cards/CoursesCard";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/_layouts/AdminLayout";
import Link from "next/link";
import { collection, query, getDocs,  getFirestore } from "firebase/firestore";
import firebase_app from "../../firebase/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useAtom } from 'jotai'
import { userAtom } from "@/app/store";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);
import { useAtom } from 'jotai'
import { userAtom } from '../../store';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [user] = useAtom(userAtom)

  const getData = async () => {
    const all = [];
    const data = await getDocs(collection(db, "courses"));
    data.forEach((doc) => {
      all.push({ ...doc.data(), id: doc.id });
      // console.log(doc.id, " => ", doc.data());
    });
    setCourses(all)
  }
  useEffect(() => {

    getData()
  }, [])

  return (
    <AdminLayout >
      <section className='my-6 lg:flex justify-between'>
        <div className='lg:w-96'>
          <h1 className='text-4xl font-bold'>Hey Alabo 👋 </h1>
          <p className='text-sm'>To gain access to all courses purchase our NFT’s and enjoy premium learning experience</p>
        </div>
        {/* <button className='bg-purple p-3 sm:mt-4 rounded-md text-white flex my-auto'>
          <p className='text-sm'>Mint our NFT</p>
          <img className='h-3 w-3 my-auto ml-3' src="../images/icons/arrow-white.svg" alt="" />
        </button> */}
      </section>
      <section>
        <div className="flex flex-wrap justify-between">
          {courses.map((course, index) => (
            <CoursesCard key={index} course={course} userId={userId} />
          ))}
        </div>
      </section>
    </AdminLayout>
  );
};

export default Courses;
