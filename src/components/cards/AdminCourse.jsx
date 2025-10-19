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

      // console.log("Enrolled students:", enrolledList);
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
      <div className="bg-white rounded-xl shadow-lg p-6 my-4 lg:w-[49%] transition-transform hover:scale-[1.02] hover:shadow-2xl duration-200 border border-purple/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-purple/20 bg-purple/5 flex items-center justify-center">
              <img
                src={course.imgUrl}
                className="object-cover w-full h-full"
                alt={course.title}
              />
            </div>
            <div>
              <h4 className="font-bold text-lg capitalize text-purple-900 mb-1 truncate max-w-[180px]">{course.title}</h4>
              <p className="text-xs text-gray-500">Tutor: {course.author || "-"}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-3xl font-extrabold text-purple-700">{enrollment?.length}</span>
            <span className="text-xs text-gray-500">Enrolled</span>
          </div>
        </div>
        <div className="flex mt-6 justify-between items-center">
          <div className="flex gap-3">
            <Link href={`/admin/courses/new?id=${course.id}`}>
              <button className="px-4 py-2 bg-purple/10 text-purple-700 border border-purple/30 rounded-full text-sm font-semibold hover:bg-purple/20 transition-colors">Edit</button>
            </Link>
            <Link href={`/admin/courses/single?id=${course.id}`}>
              <button className="px-4 py-2 bg-purple text-white rounded-full text-sm font-semibold hover:bg-purple/80 transition-colors">View</button>
            </Link>
            <button
              onClick={deleteCourse}
              className="px-4 py-2 bg-white border border-red-400 rounded-full text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${enabled ? 'text-green-600' : 'text-gray-400'}`}>{enabled ? 'Enabled' : 'Disabled'}</span>
            <Switch checked={enabled} onChange={toggleCourseEnabled} />
          </div>
        </div>
      </div>
    );
};

export default AdminCourse;
