import Link from "next/link";
import React, { useState, useEffect } from "react";
import { doc, deleteDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { Switch } from 'antd';
import firebase_app from "../../firebase/config";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(firebase_app);
import { toast } from "react-toastify";

const AdminCourse = ({ course, getData }) => {
  const [enrollment, setEnrollment] = useState([]);
  const [enabled, setEnabled] = useState(course.enabled || false);

  const deleteCourse = async () => {
    await deleteDoc(doc(db, "courses", course.id));
    getData();
  };

  const getEnrolledStudents = async (courseId) => {
    try {
      const enrolledRef = collection(db, `courses/${courseId}/enrolledStudents`);
      const snapshot = await getDocs(enrolledRef);

      const enrolledList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log("Enrolled students:", enrolledList);
      return enrolledList;
    } catch (error) {
      console.error("Error fetching enrolled students:", error);
      return [];
    }
  };

  const getCoursesWithEnrollment = async () => {
    const enrolled = await getEnrolledStudents(course.id);
    setEnrollment(enrolled);
  };

  useEffect(() => {
    getCoursesWithEnrollment();
  }, [course.id]);

  const toggleCourseEnabled = async () => {
    try {
      const courseRef = doc(db, "courses", course.id);
      await updateDoc(courseRef, {
        enabled: !course.enabled,
      });
      getData()
      setEnabled(!course.enabled);
      toast.success(`Course ${!course.enabled ? "enabled" : "disabled"} successfully`);
    } catch (error) {
      console.error("Error toggling course:", error);
      toast.error("Failed to toggle course status.");
    }
  };

  return (
    <div className="bg-white rounded-md p-4 my-3 lg:w-[49%]">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src={course.imgUrl}
            className="rounded-full object-cover w-14 h-14 mr-4"
            alt=""
          />
          {/* <img className='h-4 w-4 my-auto mx-4' src="../images/icons/local_library.svg" alt="" /> */}
          <div className="my-auto w-44">
            <h4 className="font-bold my-3 text-sm capitalize">
              {course.title}
            </h4>
            {/* <p className='text-xs my-3'>By Great Adams</p> */}
          </div>
        </div>
        <div className="w-20">
          <h1 className="text-4xl font-bold">
            {enrollment?.length}
          </h1>
          <p className="text-xs">Erolled</p>
        </div>
      </div>
      <div className="flex mt-4 justify-between">
        <div className="flex w-[60%] justify-between">
          {/* <Link href={`/admin/courses/single?id=${course.id}`} >
          </Link> */}
          <Link href={`/admin/courses/new?id=${course.id}`}>
            <button className="p-2 lg:w-20 h-10 my-auto bg-white text-purple border rounded-full text-sm">
              Edit
            </button>
          </Link>
          <Link href={`/admin/courses/single?id=${course.id}`} >
            <button className="p-2 lg:w-20 h-10 my-auto text-white bg-purple rounded-full text-sm">
              View
            </button>
          </Link>
          <button
            onClick={() => deleteCourse()}
            className="p-2 lg:w-20 h-10 my-auto bg-white border border-[#FF0000] rounded-full text-[#FF0000] text-sm"
          >
            Delete
          </button>

        </div>
        <div className="w-[10%] my-auto">
          <Switch checked={enabled} onChange={toggleCourseEnabled} />
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
