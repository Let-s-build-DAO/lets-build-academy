"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebase_app from "../../../firebase/config";
import MainLayout from "@/src/layouts/MainLayout";

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
            <p className="text-center">Loading...</p>
          ) : !course ? (
            <p className="text-center text-red-500">Course not found</p>
          ) : (
            <>
              <img
                src={course.imgUrl}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h1 className="text-4xl font-bold mt-4">{course.title}</h1>
              <p className="text-gray-600 text-xl">{course.description}</p>
              <div className="mt-2">
                <p>
                  <strong>Author:</strong> {course.author}
                </p>
                <p>
                  <strong>Timeframe:</strong> {course.timeframe}s
                </p>
                <p>
                  <strong>Skill Level:</strong> {course.skill}
                </p>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold">Course Modules</h2>
                <div className="mt-4 grid lg:grid-cols-2 gap-5">
                  {course.lessons?.length > 0 ? (
                    course.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="p-4 border rounded-lg shadow-sm bg-white"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm">{index + 1}.</p>
                          <h3 className="text-lg font-medium">
                            {lesson.title}
                          </h3>
                        </div>

                        <p className="text-sm text-gray-600">
                          <strong>Subtitle:</strong> {lesson.subtitle || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Category:</strong> {lesson.category || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Hands-on:</strong>{" "}
                          {lesson.handsOn ? "Yes" : "No"}
                        </p>
                        {lesson.videoUrl && (
                          <a
                            href={lesson.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm"
                          >
                            Watch Video
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No lessons available.
                    </p>
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
