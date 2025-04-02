import Link from "next/link";
import React from "react";
import { doc, deleteDoc } from "firebase/firestore";

import firebase_app from "../../firebase/config";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(firebase_app);

const AdminCourse = ({ course, getData }) => {
  const deleteCourse = async () => {
    await deleteDoc(doc(db, "courses", course.id));
    getData();
  };

  return (
    <div className="bg-white rounded-md p-4 lg:w-[49%] my-3">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src={course.imgUrl}
            className="rounded-full w-14 h-14 mr-4"
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
        <div className="w-40">
          <h1 className="text-4xl font-bold">
            {course.enrolledStudents?.length}
          </h1>
          <p className="text-xs">Erolled</p>
        </div>
      </div>
      <div className="flex mt-4 justify-between">
        <Link href={`/admin/courses/single?id=${course.id}`}>
          <button className="p-2 w-32 h-10 float-right my-auto bg-white border border-purple rounded-full text-purple text-sm px-6">
            View
          </button>
        </Link>
        <Link href={`/admin/courses/new?id=${course.id}`}>
          <button className="p-2 w-32 h-10 float-right my-auto bg-white border border-purple rounded-full text-purple text-sm px-6">
            Edit
          </button>
        </Link>
        <button
          onClick={() => deleteCourse()}
          className="p-2 w-32 h-10 float-right my-auto bg-white border border-[#FF0000] rounded-full text-[#FF0000] text-sm px-6"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminCourse;
