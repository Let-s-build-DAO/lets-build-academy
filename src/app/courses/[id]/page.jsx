"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebase_app from "../../../firebase/config";
import MainLayout from "@/src/components/layouts/MainLayout";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";
import { UserCircle2, PlayCircle } from "lucide-react";
import Link from "next/link";

const db = getFirestore(firebase_app);

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourse({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <MainLayout>
      <div>
        <div className="p-6 max-w-5xl mx-auto py-32">
          {loading ? (
            <div className="flex items-center justify-center w-full h-64">
              <FaSpinner className="animate-spin text-purple text-4xl mb-2" />
            </div>
          ) : !course ? (
            <p className="text-center text-[#EB1515]">Course not found</p>
          ) : (
            <>
              <div className="w-full overflow-hidden mb-6">
                <img
                  src={course.imgUrl || "/images/academylogo2.png"}
                  alt={course.title}
                  className="object-cover w-full rounded-xl"
                  priority
                />
                <div className="w-full py-4">
                  <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
                  <div className="flex mt-2 items-center gap-2">
                    <UserCircle2 className="" size={32} />
                    <span className="font-medium">By {course.author}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-4">{course.description}</p>
              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2 text-purple font-semibold">
                  <PlayCircle size={20} />
                  <span>{course.lessons?.length || 0} Lessons</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-semibold">⏱️</span>
                  <span>{course.timeframe || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-semibold my-auto">🏅</span>
                  <span className="my-auto capitalize">{course.skill || "N/A"}</span>
                </div>
                <div className="mt-4">
                  <Link href={'/auth'}>
                    <button
                      className="bg-purple hover:bg-purple/90 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-200"
                    >
                      Enroll
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-purple">Course Modules</h2>
                <div className="grid lg:grid-cols-2 gap-6">
                  {course.lessons?.length > 0 ? (
                    course.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="p-5 shadow-lg rounded-xl shadow bg-white transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-purple/10 text-purple rounded-full px-3 py-1 text-xs font-bold">Module {index + 1}</span>
                          <h3 className="text-lg font-semibold text-purple-900">{lesson.title}</h3>
                        </div>
                        <div className="mb-2 text-sm text-gray-600">
                          <span className="font-medium">Subtitle:</span> {lesson.subtitle || "N/A"}
                        </div>
                        {/* <div className="mb-2 text-sm text-gray-600">
                          <span className="font-medium">Category:</span> {lesson.category || "N/A"}
                        </div> */}
                        <div className="mb-2 text-sm text-gray-600">
                          <span className="font-medium">Hands-on:</span> {lesson.handsOn ? "Yes" : "No"}
                        </div>
                        {lesson.videoUrl && (
                          <a
                            href={lesson.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-purple-600 hover:underline text-sm font-medium mt-2"
                          >
                            <PlayCircle size={16} /> Watch Video
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No lessons available.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursePage;
