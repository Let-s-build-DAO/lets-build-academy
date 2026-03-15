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
import HashVisual from "../simulations/HashVisual";
import BlockChainVisual from "../simulations/BlockChainVisual";
import LogicPuzzle from "../simulations/LogicPuzzle";
import { translateLogicToCode } from "../../utils/logicTranslator";
import { ChevronLeft, ChevronRight, Home, X, Check, BrainCircuit } from 'lucide-react';

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
  const [hint, setHint] = useState("");
  const [isHintLoading, setIsHintLoading] = useState(false);

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
      if (courseId === "consensus-demo") {
        setHasProgress(true);
        return;
      }
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

  const fetchAiHint = async () => {
    if (isHintLoading) return;
    setIsHintLoading(true);
    setHint("");
    try {
      const response = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: active?.title,
          description: active?.subtitle,
          question: active?.instruction || active?.body,
          currentProgress: lesson,
        }),
      });
      const data = await response.json();
      if (data.hint) {
        setHint(data.hint);
      } else if (data.error) {
        setHint(data.hint || "Hint unavailable. Check console.");
      }
    } catch (error) {
      console.error("Hint fetch error:", error);
      toast.error("Could not reach the Intelligent Tutor.");
    } finally {
      setIsHintLoading(false);
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
            <section className="fixed inset-0 bg-white z-[50] flex flex-col">
              {/* Top Progress Bar Component (Brilliant Style) */}
              <div className="h-14 border-b border-gray-100 flex items-center px-6 justify-between bg-white relative">
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={() => router.push('/user/courses')}
                      className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                    >
                      <Home className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="h-4 w-px bg-gray-200 hidden md:block"></div>
                    <span className="text-sm font-bold text-gray-900 hidden md:block truncate max-w-[200px]">
                      {data?.title}
                    </span>
                 </div>

                 {/* Central Progress Indicator */}
                 <div className="absolute left-1/2 -translate-x-1/2 w-1/3 flex flex-col items-center">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-purple transition-all duration-700 ease-out" 
                         style={{ width: `${(lesson / data.lessons.length) * 100}%` }}
                       ></div>
                    </div>
                    <span className="text-[10px] font-bold text-purple uppercase tracking-widest mt-1">
                      {lesson} of {data.lessons.length} Concepts
                    </span>
                 </div>

                 <button 
                    onClick={() => router.push('/user/courses')}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                 >
                    <X className="w-5 h-5 text-gray-400" />
                 </button>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                {/* Left Column: Instructions & Theory */}
                <div className="w-full lg:w-[400px] border-r border-gray-100 flex flex-col bg-white overflow-hidden shadow-2xl z-10">
                   <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                      <div className="mb-6">
                         <span className="text-[10px] bg-purple/10 text-purple px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                           Concept {lesson}
                         </span>
                         <h2 className="text-3xl font-bold text-gray-900 mt-3 leading-tight">
                           {active?.title}
                         </h2>
                         <p className="text-gray-500 font-medium mt-1">{active?.subtitle}</p>
                      </div>

                      <div className="prose prose-purple max-w-none">
                         <MdPreview editorId={id} modelValue={active?.body} />
                      </div>

                      {active?.instruction && (
                         <div className="mt-8 p-5 bg-purple/5 rounded-3xl border-2 border-purple/10 border-dashed">
                            <h4 className="text-xs font-bold text-purple uppercase tracking-widest mb-2 flex items-center gap-2">
                               <Check className="w-3 h-3" /> User Task
                            </h4>
                            <p className="text-sm text-gray-700 font-medium leading-relaxed">
                               {active?.instruction}
                            </p>
                         </div>
                      )}
                   </div>

                   {/* Pinned Bottom Navigation */}
                   <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-3">
                      <div className="flex gap-3">
                         <button 
                            onClick={handlePreviousLesson}
                            disabled={lesson === 1 || isNavigating}
                            className="flex-1 py-4 px-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-bold text-sm hover:border-purple/20 hover:text-purple transition-all disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-400 flex items-center justify-center gap-2"
                         >
                            <ChevronLeft className="w-4 h-4" /> Back
                         </button>
                         <button 
                            onClick={handleNextLesson}
                            disabled={isNavigating}
                            className="flex-[2] py-4 px-4 bg-purple text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple/20 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                         >
                            {lesson === data.lessons.length ? "Finish Course" : "Continue"} <ChevronRight className="w-4 h-4" />
                         </button>
                      </div>
                      
                   </div>
                </div>

                {/* Right Column: Hero Simulation Area */}
                <div className="flex-1 bg-gray-50/50 relative flex items-center justify-center p-4 lg:p-12 overflow-y-auto custom-scrollbar">
                   <div className="w-full max-w-5xl">
                      {active?.handsOn ? (
                        <div className="w-full animate-in zoom-in-95 duration-700">
                          {active?.simulationType === 'hash' ? (
                              <HashVisual challengePrefix={active?.challengePrefix} />
                          ) : active?.simulationType === 'blockchain' ? (
                              <BlockChainVisual />
                          ) : active?.simulationType === 'puzzle' ? (
                              <LogicPuzzle puzzle={active?.puzzleData} onSolve={handleNextLesson} />
                          ) : showCanvas ? (
                              <div className="h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                <VisualCanvas initialNodes={active?.visualNodes || []} onLogicChange={handleLogicChange} />
                              </div>
                          ) : (
                              <div className="h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl bg-white border-2 border-purple/5 p-4">
                                <CodeEditor
                                  ref={codeEditorRef}
                                  editors={data?.lessons[lesson - 1]?.editor || []}
                                  task={data?.lessons[lesson - 1]?.task || {}}
                                />
                              </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center p-12 bg-white rounded-3xl border-2 border-purple/10 shadow-xl max-w-xl mx-auto">
                           <div className="w-20 h-20 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                             🎯
                           </div>
                           <h3 className="text-2xl font-bold text-gray-900 mb-2">Fundamental Concept</h3>
                           <p className="text-gray-600 mb-8">Ready to move to the interactive challenge?</p>
                           <button 
                             onClick={handleNextLesson}
                             className="bg-purple text-white px-12 py-4 rounded-2xl font-bold shadow-lg shadow-purple/20 hover:scale-105 transition-all"
                           >
                             Continue to Next Step
                           </button>
                        </div>
                      )}
                   </div>
                </div>
              </div>

              {/* Floating AI Drawer (Brilliant Style) - Moved outside containers for true fixed position */}
              <div className="fixed bottom-10 right-10 z-[100]">
                 <div className="relative">
                    {hint && !isHintLoading && (
                      <div className="absolute bottom-full right-0 mb-6 w-80 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-purple/10 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                         <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 bg-purple/10 rounded-full flex items-center justify-center">
                                  <BrainCircuit className="w-4 h-4 text-purple" />
                               </div>
                               <span className="text-[10px] font-bold text-purple uppercase tracking-[0.2em]">Tutor Hint</span>
                            </div>
                            <button 
                              onClick={() => setHint("")}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                         </div>
                         <p className="text-sm text-gray-700 leading-relaxed font-medium italic">"{hint}"</p>
                         <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white rotate-45 border-r border-b border-purple/5"></div>
                      </div>
                    )}

                    <button 
                      onClick={fetchAiHint}
                      disabled={isHintLoading}
                      className="w-16 h-16 bg-purple rounded-full shadow-[0_10px_30px_rgba(107,33,168,0.3)] flex items-center justify-center hover:scale-110 hover:shadow-[0_15px_40px_rgba(107,33,168,0.4)] active:scale-95 transition-all text-white relative group border-4 border-white"
                    >
                       {isHintLoading ? <FaSpinner className="animate-spin text-xl" /> : <BrainCircuit className="w-8 h-8" />}
                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    
                    {!hint && (
                      <div className="absolute bottom-1/2 right-full mr-6 translate-y-1/2 bg-gray-900 text-white text-[10px] font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                        NEED A HINT?
                      </div>
                    )}
                 </div>
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