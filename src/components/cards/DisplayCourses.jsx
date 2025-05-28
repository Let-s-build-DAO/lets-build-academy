"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, getFirestore, where, query } from "firebase/firestore";
import firebase_app from "../../firebase/config";
import Link from "next/link";

const db = getFirestore(firebase_app);

const DisplayCourses = ({ page }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(collection(db, "courses"), where("enabled", "==", true));
        const querySnapshot = await getDocs(q);
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(coursesData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  return (
    <main className="grid lg:grid-cols-3 grid-cols-1 sm:p-4 mt-12 ">

      {page ? courses.map((course) => (
        <Link
          href={`/courses/${course.id}`}
          key={course.id}
          className="first-div text-white mb-8 sm:mb-5"
        >
          {/* <Image src={course.imgUrl} alt="Course Image" width={380} height={350} /> */}
          {/* <Link href={"/user/courses"}> */}
          <img
            src={course.imgUrl}
            alt="Course Image"
            className="w-[350px] h-[200px]"
          />
          <div className="mt-4 justify-center">
            {/* <div className="my-auto">
              <Image src="/Ellipse 1.png" alt="Instructor Image" width={40} height={50} />
            </div> */}
            <div className="">
              <h1 className="font-medium text-lg">{course.title}</h1>
              <p className="text-sm ">{course.author}</p>
            </div>
          </div>
          {/* </Link> */}
        </Link>
      )) : courses.slice(0, 3).map((course) => (
        <Link
          href={`/courses/${course.id}`}
          key={course.id}
          className="first-div text-white mb-8 sm:mb-5"
        >
          {/* <Image src={course.imgUrl} alt="Course Image" width={380} height={350} /> */}
          {/* <Link href={"/user/courses"}> */}
          <img
            src={course.imgUrl}
            alt="Course Image"
            className="w-[350px] h-[200px]"
          />
          <div className="mt-4 justify-center">
            {/* <div className="my-auto">
              <Image src="/Ellipse 1.png" alt="Instructor Image" width={40} height={50} />
            </div> */}
            <div className="">
              <h1 className="font-medium text-lg">{course.title}</h1>
              <p className="text-sm ">{course.author}</p>
            </div>
          </div>
          {/* </Link> */}
        </Link>
      ))}
    </main>
  );
};

export default DisplayCourses;
