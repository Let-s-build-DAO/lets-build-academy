'use client'

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/src/components/layouts/AdminLayout';
import Link from 'next/link';
import { collection, query, getDocs } from "firebase/firestore";
import firebase_app from "../../../firebase/config";

import { getFirestore } from "firebase/firestore";
import AdminCourse from '@/src/components/cards/AdminCourse';
const db = getFirestore(firebase_app);
const Courses = () => {
  const [courses, setCourses] = useState([])

  const getData = async () => {
    const all = []
    const data = await getDocs(collection(db, "courses"))
    data.forEach((doc) => {
      all.push({ ...doc.data(), id: doc.id })
      // console.log(doc.id, " => ", doc.data());
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
          <div>
            <Link href={'/admin/courses/new'}>
              <button className='bg-purple p-3 rounded-full px-6 text-white'>Add New</button>
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