"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Progress } from "antd";
import UserCountCard from "../../components/cards/UserCountCard";
import ProfileCard from "../../components/cards/ProfileCard";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "../../store";
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
import firebase_app from "../../firebase/config";
import CoursesCard from "../../components/cards/CoursesCard";
import { toast } from "react-toastify";
// import UserLeaderboard from "@/src/components/UserLeaderboard";

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
          const enrollmentDoc = enrollmentSnapshot.docs[0];
          const progress = enrollmentDoc.data().progress || 0;
          enrolledCourses.push({
            id: courseDoc.id,
            ...courseDoc.data(),
            progress,
          });
        }
      }

      if (enrolledCourses.length > 0) {
        const total = enrolledCourses.reduce(
          (sum, course) => sum + course.progress,
          0
        );
        const average = Math.round(total / enrolledCourses.length);
        setProgress(average); 
      } else {
        setProgress(0); 
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
          const lastUpdated = enrollmentDoc.data().lastUpdate
            ? enrollmentDoc.data().lastUpdated.toDate()
            : enrolledAt;

          const latestTimestamp =
            lastUpdated > enrolledAt ? lastUpdated : enrolledAt;
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

      // if (recentCourse) {
      //   setProgress(recentProgress);
      // }
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
        console.log(enrolledCourses);
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
        <div className="mt-10 lg:mt-0">
          <h1 className="text-4xl capitalize font-bold">
            Hey {user?.username} 👋
          </h1>
          <p className="text-sm mt-5">Let’s Learn something new today!!</p>
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
      <section>
        <div className="lg:flex mt-10">
          <div className="lg:w-[65%]">
            <section>
              {/* <h3 className="font-semibold mb-3">Most Recent Course</h3> */}
              {enrolledCourses.length > 0 && (
                <div>
                  <div className="p-6 lg:flex justify-between items-center bg-white rounded-lg mb-3">
                    <div className="flex gap-3 items-center">
                      <img
                        className="h-8 w-8 my-auto mx-4"
                        src="./images/icons/local_library.svg"
                        alt=""
                      />
                      <div className="my-auto w-44">
                        <h4 className="font-bold my-3 text-lg">
                          {enrolledCourses[0].title}
                        </h4>
                        <p className="text-xs my-3">
                          {enrolledCourses[0].author}
                        </p>
                      </div>
                      <Progress
                        type="circle"
                        percent={enrolledCourses[0].progress}
                        strokeColor={twoColors}
                        size={60}
                      />
                    </div>
                    <Link href={`/user/courses/${enrolledCourses[0].id}`}>
                      <button className="py-3 sm:mt-4 my-auto px-7 bg-purple text-white rounded-full">
                        Continue
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </section>

            <div className="my-3 mt-5 grid lg:grid-cols-2 gap-4">
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
            {/* <UserLeaderboard /> */}
          </div>
          <div className="lg:w-[35%] mt-10 lg:mt-0 lg:ml-4">
            <ProfileCard user={user} />
            <div className="mt-4 bg-white p-4 rounded-md">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold">Performance</h3>
                {/* <select
                  // value={selectedOption}
                  // onChange={(e) => setSelectedOption(e.target.value)}
                  className="text-sm py-2 px-4 rounded-mg"
                >
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                  <option value="yearly">Yearly</option>
                </select> */}
              </div>

              <div className="flex my-4 justify-between">
                <img
                  className="w-6 h-6 my-auto"
                  src="/images/disappointed-face.png"
                  alt=""
                />
                <Progress
                  type="dashboard"
                  percent={progress}
                  strokeColor={twoColors}
                />
                <img
                  className="w-6 h-6 my-auto"
                  src="/images/savouring-food.png"
                  alt=""
                />
              </div>
              <p className="text-xs text-center">Your Progress: {progress}%</p>
            </div>
          </div>
        </div>

        {enrolledCourses.length > 1 && (
          <div className="lg:mt-2 mt-6">
            <p className="font-semibold">Enrolled Courses</p>
            <div className="flex flex-wrap justify-between">
              {enrolledCourses.slice(1).map((course) => (
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
