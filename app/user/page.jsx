"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../_layouts/AdminLayout";
import { Progress } from "antd";
import UserCountCard from "../_components/cards/UserCountCard";
import ProfileCard from "../_components/cards/ProfileCard";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "../store";
import {
  collection,
  query,
  getDocs,
  getFirestore,
  where,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../firebase/config";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const twoColors = { "0%": "#40196C", "100%": "#40196C" };
  const [user] = useAtom(userAtom);

  const fetchEnrolledCourses = async (userId) => {
    
    const coursesRef = collection(db, "courses");
    const querySnapshot = await getDocs(coursesRef);
    const courses = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.enrolledStudents &&
        Array.isArray(data.enrolledStudents) &&
        data.enrolledStudents.some((student) => student.userId === userId)
      ) {
        courses.push({ id: doc.id, ...data });
      }
    });

    return courses;
  };

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        const courses = await fetchEnrolledCourses(userId);
        setEnrolledCourses(courses);
      } catch (error) {
        console.error("Error fetching enrolled courses: ", error);
      }
    };

    getEnrolledCourses();
  }, [userId]);

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

  return (
    <AdminLayout>
      <section className="my-6 lg:flex justify-between">
        <div>
          <h1 className="text-4xl capitalize font-bold">
            Hey {user?.username} 👋{" "}
          </h1>
          <p className="text-sm">Let’s Learn something new today!!</p>
        </div>
        <Link href={"/user/courses "}>
          <button className="text-purple sm:my-3 flex my-auto">
            <p className="text-sm">Courses</p>
            <img
              className="h-3 w-3 my-auto ml-3"
              src="/images/icons/arrow.svg"
              alt=""
            />
          </button>
        </Link>
      </section>
      <section className="lg:flex">
        <div className="lg:w-[75%]">
          <div className="p-4 lg:flex justify-between bg-white rounded-md mb-3">
            <div className="flex">
              <img
                className="h-4 w-4 my-auto mx-4"
                src="./images/icons/local_library.svg"
                alt=""
              />
              <div className="my-auto w-44">
                <h4 className="font-bold my-3 text-sm">Learn Solidity</h4>
                <p className="text-xs my-3">By Great Adams</p>
              </div>
              <Progress
                type="circle"
                percent={90}
                strokeColor={twoColors}
                size={70}
              />
            </div>
            <button className="p-3 sm:mt-4 h-12 my-auto px-6 bg-purple text-white rounded-md ">
              Continue
            </button>
          </div>
          <div className="my-3 lg:flex justify-between">
            {/* <UserCountCard text={"Total Courses"} count={"50"} /> */}
            <UserCountCard text={"Completed Courses"} count={"19"} />
            <UserCountCard text={"Courses in progress"} count={"22"} />
          </div>
          {/* <div className='my-3 bg-white p-4 rounded-md'>
            <h3 className='text-sm mb-4 font-bold'>Leaderboard</h3>
            <table className='w-full'>
              <tr className='text-sm text-[#5C555E]'>
                <th className='lg:w-40 w-10'>Rank</th>
                <th className=''>Name</th>
                <th className='text-center'>Percentage</th>
              </tr>
              <tr className='text-sm'>
                <td className='py-4'>1</td>
                <td className='font-bold text-center'>Sunday Kingsley</td>
                <td className='text-purple text-center'>95%</td>
              </tr>
              <tr className='text-sm'>
                <td className='py-2'>1</td>
                <td className='font-bold text-center'>Sunday Kingsley</td>
                <td className='text-purple text-center'>95%</td>
              </tr>
              <tr className='text-sm'>
                <td className='py-2'>1</td>
                <td className='font-bold text-center'>Sunday Kingsley</td>
                <td className='text-purple text-center'>95%</td>
              </tr>
            </table>
          </div> */}
        </div>
        <div className="lg:w-[25%] ml-4">
          <ProfileCard />
          {/* <div className='mt-4 bg-white p-4 rounded-md'>
            <h3 className='text-sm font-bold'>Performance</h3>

            <div className='flex my-4 justify-between'>
              <img className='w-6 h-6 my-auto' src="/images/disappointed-face.png" alt="" />
              <Progress type="dashboard" percent={75} strokeColor={twoColors} />
              <img className='w-6 h-6 my-auto' src="/images/savouring-food.png" alt="" />
            </div>
            <p className='text-xs text-center'>Your Progress: 80%</p>
          </div> */}
        </div>
        
      </section>
      <section>
        <h2>My Enrolled Courses</h2>
        {enrolledCourses.length === 0 ? (
          <p>No courses enrolled yet.</p>
        ) : (
          <ul>
            {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-md p-4 lg:w-[49%] my-3">
                  <div className="flex justify-between">
                    <div className="flex">
                      <img
                        className="h-4 w-4 my-auto mx-4"
                        src="../images/icons/local_library.svg"
                        alt=""
                      />
                      <div className="my-auto w-44">
                        <h4 className="font-bold my-3 text-sm">{course.title}</h4>
                        <p className="text-xs my-3">By {course.author}</p>
                      </div>
                    </div>
                   
                  </div>
               
                </div>
            ))}
          </ul>
        )}
      </section>
    </AdminLayout>
  );
};

export default Dashboard;
