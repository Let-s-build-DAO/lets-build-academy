"use client";

import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";

const db = getFirestore(firebase_app);

const SingleCourse = ({ data, userId, courseId }) => {
  // const [text] = useState('# Hello Editor ');
  const [id] = useState("preview-only");
  const [active, setActive] = useState(data?.lessons[0]);
  const [lesson, setLesson] = useState(0);
  const router = useRouter;

  // useEffect(() => {
  //   updateCourseProgress();
  // });

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
          const lastLesson = enrollmentData.lastLesson || 1;
          setLesson(lastLesson);
          setActive(data?.lessons[lastLesson - 1]);
        } else {
          setLesson(1);
          setActive(data?.lessons[0]);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
        setLesson(1);
        setActive(data?.lessons[0]);
      }
    };

    fetchProgress();
  }, [courseId, userId, data?.lessons]);

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
    } catch (error) {
      console.error("Error updating course progress:", error);
    }
  };

  useEffect(() => {
    setActive(data?.lessons[parseInt(lesson) - 1]);
  }, [lesson]);

  const handleNextLesson = async () => {
    if (lesson < data?.lessons.length) {
      const nextLesson = lesson + 1;
      setLesson(nextLesson);
      setActive(data?.lessons[nextLesson - 1]);
      await updateCourseProgress(courseId, nextLesson);
    } else {
      toast.success("Congratulations! You have completed the course.");
      router.push("/user/courses");
    }
  };

  const handlePreviousLesson = async () => {
    if (lesson > 1) {
      const prevLesson = lesson - 1;
      setLesson(prevLesson);
      setActive(data?.lessons[prevLesson - 1]);
      await updateCourseProgress(courseId, prevLesson);
    }
  };

  useEffect(() => {
    console.log(lesson);
  }, [lesson]);

  return data && lesson ? (
    <section className="mt-4">
      <div className="flex justify-between relative">
        <div className={`${active?.handsOn ? "w-1/2" : "w-full"}`}>
          <div className="flex my-3 justify-between">
            <button onClick={handlePreviousLesson} disabled={lesson === 1}>
              <img src="/arrow_circle_left.png" alt="Previous Lesson" />
            </button>
            <div className="text-center lg:w-[60%] w-[70%]">
              <p className="font-bold">Lesson {lesson}</p>
              <h1 className="font-bold lg:text-xl">{active?.title}</h1>
              <p>{active?.subtitle}</p>
            </div>
            <button
              onClick={handleNextLesson}
              // disabled={lesson === data?.lessons.length}
            >
              <img src="/arrow_circle_right.png" alt="Next Lesson" />
            </button>
          </div>
          {active?.videoUrl && (
            <video
              className="custom-video w-full"
              src={active.videoUrl}
              controls
              height={300}
            ></video>
          )}
          <MdPreview editorId={id} modelValue={active?.body} />
        </div>
        {active?.handsOn ? (
          <div className="w-[38%] fixed right-5 top-10">
            <CodeEditor editors={data?.lessons[lesson - 1]?.editor || []} />
          </div>
        ) : null}
      </div>
      {/* <MdCatalog editorId={id} scrollElement={scrollElement} /> */}
    </section>
  ) : (
    <section>
      <div className="lg:flex justify-between">
        <div className="lg:w-[48%]">
          <h1 className="text-4xl font-bold">{data?.title}</h1>
          <div className="my-3">
            <img
              className="w-full h-52 object-cover"
              src={data?.imgUrl}
              alt=""
            />
            {/* <video controls>
              <source src="/images/video.mp4" type="video/mp4" />
            </video> */}
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
            {/* <Link href={'&lesson=0'}> */}
            <button
              onClick={() => setLesson(lesson || 1)}
              className="p-3 rounded-md bg-purple text-white px-10"
            >
              Start
            </button>
            {/* </Link> */}
          </div>
        </div>
        <div className="lg:w-[48%] mt-10">
          <h3 className="font-bold text-lg my-2">Introduction</h3>
          <p className="text-sm">{data?.description}</p>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl my-4 font-bold text-center">Syllabus</h3>
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

          {/* <div className='p-4 rounded-md bg-white flex justify-between sm:my-3 lg:w-[48%]'>
            <p className='font-bold'>Lesson 1</p>
            <div>
              <h3 className='font-bold text-lg'>The Basics</h3>
              <p className='text-xs'>The basics of Javascript</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SingleCourse;
