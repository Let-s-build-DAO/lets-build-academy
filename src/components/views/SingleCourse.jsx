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
import ShareAndReviewModal from "../ShareAndReviewModal";
import VisualCanvas from "../VisualCanvas";
import { translateLogicToCode } from "../../utils/logicTranslator";

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
  const [open, setOpen] = useState(false);
  const [visualLogic, setVisualLogic] = useState({ nodes: [], edges: [] });
  const [showCanvas, setShowCanvas] = useState(true);
  const [aiFeedback, setAiFeedback] = useState("Architectural canvas ready. Start connecting nodes to define your logic.");
  const [isAiThinking, setIsAiThinking] = useState(false);

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
      // Validate visual logic if present
      if (active?.handsOn && showCanvas && visualLogic.edges.length === 0) {
        toast.warning("Please connect some logic nodes in the Visual Canvas before proceeding.");
        return;
      }

      // Validate hands-on tasks if present
      if (active?.task && codeEditorRef.current && !showCanvas) {
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
        // router.push("/user/courses");
        setOpen(true)
      }
    } catch (error) {
      console.error("Error navigating to next lesson:", error);
      toast.error("Failed to proceed to next lesson. Please try again.");
    } finally {
      setIsNavigating(false);
    }
  };

  const handleLogicChange = (nodes, edges) => {
    setVisualLogic({ nodes, edges });
    const translated = translateLogicToCode(nodes, edges);
    
    // Proactively update the code editor boilerplate
    if (codeEditorRef.current) {
        // For MVP, we'll primary update the 'solidity' or first available editor
        const primaryLang = data?.lessons[lesson - 1]?.editor[0] || 'solidity';
        if (translated[primaryLang]) {
            codeEditorRef.current.updateCode(primaryLang, translated[primaryLang]);
        }
    }

    // AI Feedback Simulation
    setIsAiThinking(true);
    setTimeout(() => {
        setIsAiThinking(false);
        if (edges.length === 0) {
            setAiFeedback("Empty architecture. Try connecting an 'Input' node to a 'Process' node.");
        } else if (edges.length < 3) {
            setAiFeedback("Good start. The logic flow is forming, but you need a 'Value Sink' to ensure economic stability.");
        } else {
            setAiFeedback("Architecture looks robust! The generated Solidity reflects your intent. Proceed to the Code Editor to finalize.");
        }
    }, 1500);
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
              <div className="lg:flex justify-between gap-6">
                <div className={`${active?.handsOn ? "lg:w-[45%]" : "w-full"}`}>
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
                  <div className="w-full lg:w-[52%] flex flex-col gap-4">
                    {/* Layer Toggles */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowCanvas(true)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${showCanvas ? 'bg-purple text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-purple/10'}`}
                      >
                         Layer 1: Visual Canvas
                      </button>
                      <button 
                        onClick={() => setShowCanvas(false)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${!showCanvas ? 'bg-purple text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-purple/10'}`}
                      >
                         Layer 2: Code Editor
                      </button>
                    </div>

                    <div className="relative min-h-[500px]">
                      {showCanvas ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <VisualCanvas 
                            initialNodes={active?.visualNodes || []} 
                            onLogicChange={handleLogicChange} 
                          />
                        </div>
                      ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <CodeEditor
                            ref={codeEditorRef}
                            editors={data?.lessons[lesson - 1]?.editor || []}
                            task={data?.lessons[lesson - 1]?.task || {}}
                          />
                        </div>
                      )}
                    </div>

                    {/* Agentic Co-Pilot / AI Feedback */}
                    <div className="bg-white border-2 border-purple/10 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-2">
                          <div className={`w-2 h-2 rounded-full ${isAiThinking ? 'bg-purple animate-pulse' : 'bg-gray-200'}`}></div>
                       </div>
                       <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center text-xl shrink-0">🤖</div>
                          <div>
                             <div className="text-[10px] font-bold text-purple uppercase tracking-widest mb-1">Agentic Co-Pilot</div>
                             <p className="text-sm text-gray-700 font-medium leading-relaxed italic">
                                {isAiThinking ? "Analyzing architectural topology..." : aiFeedback}
                             </p>
                          </div>
                       </div>
                    </div>
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

      <ShareAndReviewModal open={open} userId={userId} onClose={() => setOpen(false)} title={data?.title} courseId={courseId} />
    </>
  );
};

export default SingleCourse;