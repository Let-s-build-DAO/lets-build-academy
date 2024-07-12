/* eslint-disable @next/next/no-img-element */
import { Progress } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  doc,
  getFirestore,
  getDoc, getDocs, collection, serverTimestamp, setDoc, where, query
} from "firebase/firestore";
import firebase_app from "../../firebase/config";
import { toast } from 'react-toastify';

const db = getFirestore(firebase_app);

const CoursesCard = ({ course, userId }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const twoColors = { "0%": "#40196C", "100%": "#40196C" };

  useEffect(() => {
    const checkEnrollment = async () => {   
      try {
        const enrollmentRef = collection(db, `courses/${course.id}/enrolledStudents`);
        const q = query(enrollmentRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setIsEnrolled(true);
          localStorage.setItem(`enrolled_${course.id}`, "true");
        } else {
          const enrolledStatus = localStorage.getItem(`enrolled_${course.id}`);
          if (enrolledStatus === "true") {
            setIsEnrolled(true);
          }
        }
      } catch (error) {
        toast.error("Error checking enrollment status: ", error);
      }

    };    
    checkEnrollment();
  }, [course.id, userId]);

  const enrollUser = async () => {
    try { 
         
      const courseRef = doc(db,`courses/${course.id}/enrolledStudents`, userId);;
      await setDoc(courseRef, { 
        userId: userId,
        progress: 10,
        enrolledAt: serverTimestamp(),
      }, {merge: true});

      setIsEnrolled(true);
      localStorage.setItem(`enrolled_${course.id}`, "true");
      toast.success("Enrolled Successfully!")
    } catch (error) {
      toast.error("Error enrolling");
    }
  };

  return (
    <div className="bg-white rounded-md p-4 lg:w-[49%] my-3">
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
        {isEnrolled ? (
          <Progress
            type="circle"
            percent={90}
            strokeColor={twoColors}
            size={60}
          />
        ) : (
          <button
            className="p-2 h-10 my-auto bg-white border border-purple rounded-md text-purple text-sm px-6"
            onClick={enrollUser}
            disabled={isEnrolled}
          >
            {" "}
            {isEnrolled ? "Enrolled" : "Enroll"}
          </button>
        )}
      </div>
      {isEnrolled ? (
        <Link href={"/user/courses/1"}>
          <button className="p-2 h-10 float-right my-auto bg-white border border-purple rounded-md text-purple text-sm px-6">
            Continue
          </button>
        </Link>
      ) : null}
    </div>
  );
};

export default CoursesCard;
