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
  orderBy,
  limit,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../firebase/config";
import CoursesCard from "../_components/cards/CoursesCard";
import { toast } from "react-toastify";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentCourse, setRecentCourse] = useState(null);
  const [totalEnrolledCourses, setTotalEnrolledCourses] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [coursesInProgress, setCoursesInProgress] = useState(0);
  const [progress, setProgress] = useState(0);

  const twoColors = { "0%": "#40196C", "100%": "#40196C" };
  const [user] = useAtom(userAtom);

  const fetchEnrolledCourses = async (userId) => {
    try {
      const coursesQuery = query(collection(db, "courses"));
      const coursesSnapshot = await getDocs(coursesQuery);
      const enrolledCourses = [];

      for (const courseDoc of coursesSnapshot.docs) {
        const enrollmentsRef = collection(
          db,
          `courses/${courseDoc.id}/enrolledStudents`
        );
        const enrollmentQuery = query(
          enrollmentsRef,
          where("userId", "==", userId)
        );
        const enrollmentSnapshot = await getDocs(enrollmentQuery);

        if (!enrollmentSnapshot.empty) {
          enrolledCourses.push({ id: courseDoc.id, ...courseDoc.data() });
        }
      }

      return enrolledCourses;
    } catch (error) {
      console.error("Error fetching enrolled courses: ", error);
      return [];
    }
  };

  const fetchMostRecentEnrolledCourse = async (userId) => {
    try {
      const coursesQuery = query(collection(db, "courses"));
      const coursesSnapshot = await getDocs(coursesQuery);
      let recentCourse = null;
      let recentTimestamp = null;
      let recentProgress = 0; 

      for (const courseDoc of coursesSnapshot.docs) {
        const enrollmentsRef = collection(
          db,
          `courses/${courseDoc.id}/enrolledStudents`
        );
        const enrollmentQuery = query(
          enrollmentsRef,
          where("userId", "==", userId),
          orderBy("enrolledAt", "desc")
        );
        const enrollmentSnapshot = await getDocs(enrollmentQuery);

        if (!enrollmentSnapshot.empty) {
          const enrollmentDoc = enrollmentSnapshot.docs[0];
         
          

          const enrolledAt = enrollmentDoc.data().enrolledAt.toDate();
          const lastUpdated = enrollmentDoc.data().lastUpdate ?  enrollmentDoc.data().lastUpdated.toDate() : enrolledAt;

          const latestTimestamp = lastUpdated > enrolledAt ? lastUpdated : enrolledAt;
          // if (!recentTimestamp || enrolledAt > recentTimestamp) {
          //   recentCourse = { id: courseDoc.id, ...courseDoc.data() };
        
          //   recentTimestamp = enrolledAt;
          // }
          if (!recentTimestamp || latestTimestamp > recentTimestamp) {
            recentCourse = { id: courseDoc.id, ...courseDoc.data() };
            recentTimestamp = latestTimestamp;
            recentProgress = enrollmentDoc.data().progress;  
          }
        }
      }

      if (recentCourse) {
        setProgress(recentProgress);
      }
      return recentCourse;
    } catch (error) {
      toast.error("Error fetching most recent enrolled course: ", error);
      return null;
    }
  };

  const fetchTotalEnrolledCourses = async (userId) => {
    try {
      const coursesQuery = query(collection(db, "courses"));
      const coursesSnapshot = await getDocs(coursesQuery);
      let totalEnrolledCourses = 0;

      for (const courseDoc of coursesSnapshot.docs) {
        const enrollmentsRef = collection(
          db,
          `courses/${courseDoc.id}/enrolledStudents`
        );
        const enrollmentQuery = query(
          enrollmentsRef,
          where("userId", "==", userId)
        );
        const enrollmentSnapshot = await getDocs(enrollmentQuery);

        if (!enrollmentSnapshot.empty) {
          totalEnrolledCourses++;
        }
      }

      return totalEnrolledCourses;
    } catch (error) {
      toast.error("Error fetching total enrolled courses: ", error);
      return 0;
    }
  };

  const fetchTotalCompletedCourses = async (userId) => {
    try {
      const coursesQuery = query(collection(db, "courses"));
      const coursesSnapshot = await getDocs(coursesQuery);
      let completedCourses = 0;

      for (const courseDoc of coursesSnapshot.docs) {
        const enrollmentsRef = collection(
          db,
          `courses/${courseDoc.id}/enrolledStudents`
        );
        const enrollmentQuery = query(
          enrollmentsRef,
          where("userId", "==", userId),
          where("progress", "==", 100)
        );
        const enrollmentSnapshot = await getDocs(enrollmentQuery);

        if (!enrollmentSnapshot.empty) {
          completedCourses++;
        }
      }

      return completedCourses;
    } catch (error) {
      toast.error("Error fetching total enrolled courses: ", error);
      return 0;
    }
  };

  const fetchCoursesInProgress = async (userId) => {
    try {
      const coursesQuery = query(collection(db, "courses"));
      const coursesSnapshot = await getDocs(coursesQuery);
      let coursesInProgress = 0;

      for (const courseDoc of coursesSnapshot.docs) {
        const enrollmentsRef = collection(
          db,
          `courses/${courseDoc.id}/enrolledStudents`
        );
        const enrollmentQuery = query(
          enrollmentsRef,
          where("userId", "==", userId),
          where("progress", ">", 0)
        );
        const enrollmentSnapshot = await getDocs(enrollmentQuery);

        if (!enrollmentSnapshot.empty) {
          coursesInProgress++;
        }
      }

      return coursesInProgress;
    } catch (error) {
      toast.error("Error fetching total enrolled courses: ", error);
      return 0;
    }
  };

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        const courses = await fetchEnrolledCourses(userId);
        setEnrolledCourses(courses);
      } catch (error) {
        toast.error("Error fetching enrolled courses: ", error);
      }
    };

    getEnrolledCourses();
  }, [userId]);

  useEffect(() => {
    const getRecentEnrolledCourse = async () => {
      try {
        const course = await fetchMostRecentEnrolledCourse(userId);
        // console.log(course);
        setRecentCourse(course);
      } catch (error) {
        toast.error("Error fetching Most recent enrolled courses: ", error);
      }
    };
    getRecentEnrolledCourse();
  }, [userId]);

  useEffect(() => {
    const getTotalEnrolledCourse = async () => {
      try {
        const total = await fetchTotalEnrolledCourses(userId);

        setTotalEnrolledCourses(total);
      } catch (error) {
        toast.error("Error fetching Most recent enrolled courses: ", error);
      }
    };

    const getTotalCompletedCourse = async () => {
      try {
        const total = await fetchTotalCompletedCourses(userId);

        setCompletedCourses(total);
      } catch (error) {
        toast.error("Error fetching total courses: ", error);
      }
    };

    const getCoursesInProgress = async () => {
      try {
        const total = await fetchCoursesInProgress(userId);
        setCoursesInProgress(total);
      } catch (error) {
        toast.error("Error fetching total courses: ", error);
      }
    };

    getTotalEnrolledCourse();
    getTotalCompletedCourse();
    getCoursesInProgress();
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
            Hey {user?.username} 👋
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
          {recentCourse && (
            <div className="p-4 lg:flex justify-between bg-white rounded-md mb-3">
              <div className="flex">
                <img
                  className="h-4 w-4 my-auto mx-4"
                  src="./images/icons/local_library.svg"
                  alt=""
                />
                <div className="my-auto w-44">
                  <h4 className="font-bold my-3 text-sm">
                    {recentCourse.title}
                  </h4>
                  <p className="text-xs my-3">{recentCourse.author}</p>
                </div>
                <Progress
                  type="circle"
                  percent={progress}
                  strokeColor={twoColors}
                  size={70}
                />
              </div>
              <button className="p-3 sm:mt-4 h-12 my-auto px-6 bg-purple text-white rounded-md ">
                Continue
              </button>
            </div>
          )}
          <div className="my-3 lg:flex justify-between gap-2">
            <UserCountCard
              text={"Total Enrolled Courses"}
              count={totalEnrolledCourses}
            />
            <UserCountCard
              text={"Completed Courses"}
              count={completedCourses}
            />
            <UserCountCard
              text={"Courses in progress"}
              count={coursesInProgress}
            />
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
        {enrolledCourses.length > 0 && (
          <div>
            <h2>My Enrolled Courses</h2>
            <div className="flex flex-wrap justify-between">
              {enrolledCourses.map((course) => (
                <CoursesCard key={course.id} course={course} userId={userId} />
              ))}
            </div>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default Dashboard;
