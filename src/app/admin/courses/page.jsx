'use client'

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/src/components/layouts/AdminLayout';
import Link from 'next/link';
import firebase_app from "../../../firebase/config";
import { getFirestore } from "firebase/firestore";
import AdminCourse from '@/src/components/cards/AdminCourse';
import { fetchAllCourses } from '@/src/data/courses';

const db = getFirestore(firebase_app);

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const getData = async () => {
    const all = await fetchAllCourses(db);
    setCourses(all);
  };

  useEffect(() => {
    getData();
  }, []);

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
          {courses.map((course) => (
            <AdminCourse getData={getData} key={course.id} course={course} />
          ))}
        </div>
      </section>
    </AdminLayout>
  );
};

export default Courses;
