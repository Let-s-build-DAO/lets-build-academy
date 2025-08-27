/* eslint-disable @next/next/no-img-element */

import { Progress } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  doc,
  getFirestore,
  getDocs,
  collection,
  serverTimestamp,
  setDoc,
  where,
  query,
} from "firebase/firestore";
import firebase_app from "../../firebase/config";
import { toast } from "react-toastify";
import Image from "next/image";
import Spinner from "../Spinner";

const db = getFirestore(firebase_app);


const CoursesCard = ({ course, userId }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const twoColors = { "0%": "#40196C", "100%": "#40196C" };


  useEffect(() => {
    const checkEnrollment = async () => {
      setIsLoading(true);
      try {
        const enrollmentRef = collection(
          db,
          `courses/${course.id}/enrolledStudents`
        );
        const q = query(enrollmentRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setIsEnrolled(true);
          localStorage.setItem(`enrolled_${course.id}`, "true");
          const enrollmentDoc = querySnapshot.docs[0];
          setProgress(enrollmentDoc.data().progress);
        } else {
          const enrolledStatus = localStorage.getItem(`enrolled_${course.id}`);
          if (enrolledStatus === "true") {
            setIsEnrolled(true);
          }
        }
      } catch (error) {
        toast.error("Error checking enrollment status: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkEnrollment();
  }, [course.id, userId]);


  const enrollUser = async () => {
    if (isEnrolling) return;
    setIsEnrolling(true);
    try {
      const courseRef = doc(
        db,
        `courses/${course.id}/enrolledStudents`,
        userId
      );
      await setDoc(courseRef, {
        userId: userId,
        progress: 0,
        enrolledAt: serverTimestamp(),
      });

      setIsEnrolled(true);
      localStorage.setItem(`enrolled_${course.id}`, "true");
      toast.success("Enrolled Successfully!");
    } catch (error) {
      toast.error("Error enrolling");
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full my-3 relative">
      {/* Course Header with Image Background */}
      <div className="relative h-32">
        {/* Course Image as background */}
        <Image
          src={course.imgUrl || "/images/academylogo2.png"}
          alt={course.title || "Course Image"}
          fill
          className="object-cover"
          style={{ zIndex: 1 }}
          priority
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple to-purple/80 opacity-50 z-10"></div>
        <div className="absolute top-4 left-4 flex items-center space-x-3 z-20">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            {/* Inline SVG open book icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M2 6.5V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 6.5C2 5.11929 3.11929 4 4.5 4H19.5C20.8807 4 22 5.11929 22 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-white">
            <h4 className="font-bold text-lg">{course.title}</h4>
            <p className="text-sm opacity-90">By {course.author}</p>
          </div>
        </div>

        {/* Progress Indicator for Enrolled Users */}
        {isEnrolled && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-white backdrop-blur-sm rounded-full p-3">
              <Progress
                type="circle"
                percent={progress}
                strokeColor={twoColors}
                size={50}
                className="custom-progress"
                strokeWidth={4}
              />
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Course Description */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Course Stats */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
          <span className="flex items-center capitalize">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.timeframe}
          </span>
          <span className="flex items-center capitalize">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.skill}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          {isEnrolled ? (
            <div className="w-full">
              {/* <div className="text-sm text-gray-600">
                <span className="font-medium">{progress}%</span> Complete
              </div> */}
              <Link href={`/user/courses/${course.id}`}>
                <button className="bg-purple text-white font-medium py-2 px-6 rounded-full w-full transition-all duration-200 transform hover:scale-105">
                  Continue Learning
                </button>
              </Link>
            </div>
          ) : (
            <button
              onClick={enrollUser}
              disabled={isEnrolling}
              className="bg-purple text-white flex font-medium py-2 px-6 rounded-full w-full transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isEnrolling ? (
                <>
                  <Spinner />
                  <span className="ml-2">Enrolling...</span>
                </>
              ) : (
                'Enroll Now'
              )}
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default CoursesCard;
