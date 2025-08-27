"use client";

import React, { useEffect, useRef, useState } from "react";
import { MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";
import {
  doc,
  getFirestore,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  setDoc,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import CodeEditor from "../CodeEditor";
import firebase_app from "../../firebase/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

const db = getFirestore(firebase_app);

const SingleCourse = ({ data, userId, courseId }) => {
  const [id] = useState("preview-only");
  const [active, setActive] = useState(data?.lessons[0]);
  const [lesson, setLesson] = useState(0);
  const [hasProgress, setHasProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const codeEditorRef = useRef(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const enrollmentRef = doc(
          db,
          `courses/${courseId}/enrolledStudents`,
          userId
        );
        const enrollmentSnapshot = await getDoc(enrollmentRef);

        if (enrollmentSnapshot.exists()) {
          const enrollmentData = enrollmentSnapshot.data();
          const progress = enrollmentData.progress || 0;
          const lastLesson = enrollmentData.lastLesson || 0;

          setHasProgress(progress > 0);

          if (progress > 0) {
            setLesson(lastLesson);
            setActive(data?.lessons[lastLesson - 1]);
          } else {
            setLesson(0);
          }
        } else {
          setHasProgress(false);
          setLesson(0);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
        setHasProgress(false);
        setLesson(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (data && courseId && userId) {
      fetchProgress();
    } else {
      setIsLoading(false);
    }
  }, [courseId, userId, data]);

  const updateCourseProgress = async (courseId, completedLessons) => {
    try {
      if (!courseId || !userId) throw new Error("Missing courseId or userId");
      const enrollmentRef = doc(
        db,
        `courses/${courseId}/enrolledStudents`,
        userId
      );
      const courseProgress = {
        progress: Math.round((completedLessons / data.lessons.length) * 100),
        lastLesson: completedLessons,
        lastUpdated: serverTimestamp(),
      };

      await setDoc(enrollmentRef, courseProgress, { merge: true });
      setHasProgress(true);
    } catch (error) {
      console.error("Error updating course progress:", error);
      throw error; // Re-throw to handle in calling function
    }
  };

  const handleStartCourse = async () => {
    if (isNavigating) return;

    setIsNavigating(true);
    try {
      setLesson(1);
      setActive(data?.lessons[0]);
      await updateCourseProgress(courseId, 1);
    } catch (error) {
      console.error("Error starting course:", error);
      toast.error("Failed to start course. Please try again.");
    } finally {
      setIsNavigating(false);
    }
  };

  const handleNextLesson = async () => {
    if (isNavigating) return;

    setIsNavigating(true);

    try {
      // Validate hands-on tasks if present
      if (active?.task && codeEditorRef.current) {
        const isValid = codeEditorRef.current.hasCorrectSolution();
        if (!isValid) {
          toast.error(
            "Please complete the current task correctly before proceeding to the next lesson."
          );
          return;
        }
      }

      if (lesson < data?.lessons.length) {
        const nextLesson = lesson + 1;
        setLesson(nextLesson);
        setActive(data?.lessons[nextLesson - 1]);
        await updateCourseProgress(courseId, nextLesson);
      } else {
        toast.success("Congratulations! You have completed the course.");
        router.push("/user/courses");
      }
    } catch (error) {
      console.error("Error navigating to next lesson:", error);
      toast.error("Failed to proceed to next lesson. Please try again.");
    } finally {
      setIsNavigating(false);
    }
  };

  const handlePreviousLesson = async () => {
    if (isNavigating || lesson <= 1) return;

    setIsNavigating(true);
    try {
      const prevLesson = lesson - 1;
      setLesson(prevLesson);
      setActive(data?.lessons[prevLesson - 1]);
      await updateCourseProgress(courseId, prevLesson);
    } catch (error) {
      console.error("Error navigating to previous lesson:", error);
      toast.error("Failed to go to previous lesson. Please try again.");
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <section className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FaSpinner className="animate-spin text-purple text-4xl mb-2" />
            {/* <p className="mt-4 text-lg text-gray-600">Loading course...</p> */}
          </div>
        </section>
      ) : data ? (
        <>
          {hasProgress && lesson > 0 ? (
            <section className="mt-4">
              <div className="lg:flex justify-between">
                <div className={`${active?.handsOn ? "lg:w-1/2" : "w-full"}`}>
                  <div className="flex my-3 justify-between">
                    <button
                      onClick={handlePreviousLesson}
                      disabled={lesson === 1 || isNavigating}
                      className="disabled:opacity-50"
                    >
                      <Image src="/arrow_circle_left.png" alt="Previous Lesson" width={32} height={32} />
                    </button>
                    <div className="text-center lg:w-[60%] w-[70%]">
                      <p className="font-bold">Lesson {lesson}</p>
                      <h1 className="font-bold lg:text-xl">{active?.title}</h1>
                      <p>{active?.subtitle}</p>
                    </div>
                    <button
                      onClick={handleNextLesson}
                      disabled={isNavigating}
                      className="disabled:opacity-50"
                    >
                      {isNavigating ? (
                        <FaSpinner className="animate-spin text-purple" />
                      ) : (
                        <Image src="/arrow_circle_right.png" alt="Next Lesson" width={32} height={32} />
                      )}
                    </button>
                  </div>
                  {active?.videoUrl && (
                    <video
                      className="w-full mb-4"
                      src={active.videoUrl}
                      controls
                      height={500}
                    ></video>
                  )}
                  <MdPreview editorId={id} modelValue={active?.body} />
                </div>
                {active?.handsOn ? (
                  <div className="w-full lg:w-[38%] relative lg:fixed lg:right-5 top-15">
                    <CodeEditor
                      ref={codeEditorRef}
                      editors={data?.lessons[lesson - 1]?.editor || []}
                      task={data?.lessons[lesson - 1]?.task || {}}
                    />
                  </div>
                ) : null}
              </div>
            </section>
          ) : (
            <section>
              <div className="lg:flex justify-between">
                <div className="lg:w-[48%]">
                  <h1 className="text-4xl font-bold">{data?.title}</h1>
                  <div className="my-3">
                    <Image
                      className="w-full h-52 object-cover rounded-lg"
                      src={data?.imgUrl}
                      alt={data?.title || "Course Image"}
                      width={400}
                      height={208}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">Timeframe</p>
                      <h3 className="font-bold text-sm">{data?.timeframe}</h3>
                    </div>
                    <div>
                      <p className="text-sm">Skill Level</p>
                      <h3 className="font-bold text-sm"> {data?.skill}</h3>
                    </div>
                    <button
                      onClick={handleStartCourse}
                      disabled={isNavigating}
                      className="p-3 rounded-full bg-purple text-white px-10 disabled:opacity-50"
                    >
                      {isNavigating ? (
                        <div className="flex items-center">
                          <Spinner />
                          <span className="ml-2">Starting...</span>
                        </div>
                      ) : (
                        'Start Course'
                      )}
                    </button>
                  </div>
                </div>
                <div className="lg:w-[48%] mt-10">
                  <h3 className="font-bold text-lg my-2">Introduction</h3>
                  <p className="text-sm">{data?.description}</p>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-xl my-4 font-bold">Syllabus</h3>
                <div className="lg:flex flex-wrap justify-between">
                  {data?.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-md bg-white flex justify-between sm:my-3 lg:w-[48%]"
                    >
                      <p className="font-bold">Lesson {index + 1}</p>
                      <div>
                        <h3 className="font-bold text-lg">{lesson.title}</h3>
                        <p className="text-xs">{lesson.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : null}
    </>
  );
};

export default SingleCourse;