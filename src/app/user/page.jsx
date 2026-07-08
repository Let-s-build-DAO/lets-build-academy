"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "../../store";
import { collection, query, getDocs, getFirestore, where, orderBy } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../../firebase/config";
import { motion } from "framer-motion";
import { Zap, Shield, Image as ImageIcon, BookOpen, Hexagon } from "lucide-react";
import { fetchEnabledCourses } from "@/src/data/courses";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [recentTrack, setRecentTrack] = useState(null);
  const [allTracks, setAllTracks] = useState([]);
  const [user] = useAtom(userAtom);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const fetchDashboardData = async (userId) => {
    try {
      // Fetch all available tracks for the carousel
      const tracks = await fetchEnabledCourses(db);
      setAllTracks(tracks);

      // Fetch the most recent enrolled track, or default to the first available track
      let recent = null;
      let recentTimestamp = null;

      for (const track of tracks) {
        const enrollmentsRef = collection(db, `courses/${track.id}/enrolledStudents`);
        const enrollmentQuery = query(enrollmentsRef, where("userId", "==", userId), orderBy("enrolledAt", "desc"));
        const enrollmentSnapshot = await getDocs(enrollmentQuery);

        if (!enrollmentSnapshot.empty) {
          const enrollmentDoc = enrollmentSnapshot.docs[0];
          const enrolledAt = enrollmentDoc.data().enrolledAt.toDate();
          const lastUpdated = enrollmentDoc.data().lastUpdate
            ? enrollmentDoc.data().lastUpdated.toDate()
            : enrolledAt;

          const latestTimestamp = lastUpdated > enrolledAt ? lastUpdated : enrolledAt;
          if (!recentTimestamp || latestTimestamp > recentTimestamp) {
            recent = { ...track, progress: enrollmentDoc.data().progress };
            recentTimestamp = latestTimestamp;
          }
        }
      }

      if (recent) {
        setRecentTrack(recent);
      } else if (tracks.length > 0) {
        setRecentTrack(tracks[0]); // Default to first track if not enrolled in any
      }
    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUserId(u?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchDashboardData(userId);
    }
  }, [userId]);

  if (!hydrated) return null;

  // Mock days for Streak
  const days = ["M", "T", "W", "Th", "F", "S", "Su"];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#111113] text-white p-4 lg:p-8 font-sans">
        
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Left Column (Stats & Promos) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Streak Widget */}
            <div className="bg-[#1c1c1f] rounded-[24px] border border-white/5 p-6 shadow-xl">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-5xl font-black tracking-tighter">0</span>
                <Zap className="w-8 h-8 text-gray-500" fill="currentColor" />
              </div>
              <p className="text-gray-400 text-sm font-medium mb-6">
                Solve <strong className="text-white">1 unit</strong> to start a streak
              </p>
              
              <div className="flex justify-between items-center px-2">
                {days.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white/10 flex items-center justify-center opacity-40">
                      <Zap className="w-5 h-5 text-gray-500" fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Widget */}
            <div className="relative overflow-hidden rounded-[24px] p-6 border border-white/10 shadow-xl bg-gradient-to-br from-[#2a1b38] to-[#14101e]">
              <div className="relative z-10 flex flex-col items-start h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Hexagon className="w-6 h-6 text-indigo-400" fill="currentColor" />
                    <h3 className="font-bold text-lg leading-tight">Join your Builder Pod<br/>to level up faster</h3>
                  </div>
                </div>
                <button className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff8a65] via-[#ffb74d] to-[#ffe082] text-black font-bold text-sm shadow-[0_0_20px_rgba(255,183,77,0.3)] hover:opacity-90 transition-opacity">
                  Explore Pods
                </button>
              </div>
            </div>

            {/* XP Widget */}
            <div className="bg-[#1c1c1f] rounded-[24px] border border-white/5 p-6 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Unlock Architect</h4>
                <p className="text-sm font-bold text-white">0 of 5 Tracks Conquered</p>
              </div>
            </div>

          </div>

          {/* Right Column (Main Hero Track) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Huge Hero Track Stack */}
            <div className="relative bg-[#1c1c1f] rounded-[32px] border border-white/5 p-8 lg:p-12 shadow-2xl flex flex-col overflow-hidden min-h-[500px]">
              
              {/* Fake stacked cards behind */}
              <div className="absolute top-4 right-4 bottom-4 left-6 bg-[#232328] rounded-[32px] -z-10 transform translate-x-2"></div>
              <div className="absolute top-8 right-8 bottom-8 left-10 bg-[#2a2a30] rounded-[32px] -z-20 transform translate-x-4"></div>

              {recentTrack ? (
                <>
                  <div className="text-center mb-10 z-10">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
                      {recentTrack.title}
                    </h2>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                      {recentTrack.version === "2.0" ? "V2 Engine" : "Legacy"}
                    </p>
                  </div>

                  {/* Center Graphic */}
                  <div className="flex-1 flex flex-col items-center justify-center z-10 relative mb-12">
                    <div className="relative w-40 h-40">
                      {/* Placeholder graphic simulating Brilliant's 3D stacks */}
                      <motion.div 
                        initial={{ y: 10, rotate: -5 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 bg-yellow-500 rounded-2xl transform rotate-6 translate-x-4 border-4 border-[#1c1c1f]"
                      />
                      <motion.div 
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 bg-indigo-400 rounded-2xl border-4 border-[#1c1c1f] flex items-center justify-center overflow-hidden"
                      >
                        <ImageIcon className="w-16 h-16 text-indigo-900 opacity-50" />
                        {/* Fake landscape vector */}
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-indigo-500 rounded-b-2xl"></div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Units List */}
                  <div className="space-y-4 mb-8 z-10 w-full max-w-lg mx-auto">
                    {recentTrack.lessons?.slice(0, 2).map((lesson, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? "bg-indigo-500/20" : "bg-white/5"}`}>
                            <BookOpen className={`w-5 h-5 ${index === 0 ? "text-indigo-400" : "text-gray-500"}`} />
                          </div>
                          <span className={`font-bold ${index === 0 ? "text-white" : "text-gray-500"}`}>
                            {lesson.title || `Unit ${index + 1}`}
                          </span>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-white/10 flex items-center justify-center">
                          {index === 0 && <div className="w-3 h-3 rounded-full bg-indigo-500"></div>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Start Button */}
                  <div className="mt-auto z-10 w-full max-w-lg mx-auto">
                    <Link href={`/user/tracks/${recentTrack.id}`}>
                      <button className="w-full py-4 rounded-2xl bg-[#9355ff] hover:bg-[#a46bfd] text-white font-bold text-lg transition-colors shadow-[0_4px_0_0_#6c32c9] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#6c32c9] active:translate-y-[4px] active:shadow-none">
                        Start
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center z-10 flex-1">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Zap className="w-10 h-10 text-gray-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">No Tracks Found</h2>
                  <p className="text-gray-400">Wait for tracks to load or seed the database.</p>
                </div>
              )}
            </div>

            {/* Thumbnails Carousel */}
            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {allTracks.map((track, i) => {
                const isActive = recentTrack?.id === track.id;
                return (
                  <button 
                    key={track.id}
                    onClick={() => setRecentTrack(track)}
                    className={`shrink-0 w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all ${
                      isActive ? "border-indigo-500 bg-white/5" : "border-white/5 bg-[#1c1c1f] hover:border-white/20"
                    }`}
                  >
                    {/* Just using initial for now as a mock thumbnail */}
                    <span className={`text-2xl font-black ${isActive ? "text-indigo-400" : "text-gray-500"}`}>
                      {track.title.charAt(0)}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
