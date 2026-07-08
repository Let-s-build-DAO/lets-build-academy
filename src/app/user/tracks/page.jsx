"use client";

import TrackCard from "@/src/components/cards/TrackCard";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/src/components/layouts/AdminLayout";
import { getFirestore } from "firebase/firestore";
import firebase_app from "../../../firebase/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useAtom } from "jotai";
import { userAtom } from "@/src/store";
import { fetchEnabledCourses } from "@/src/data/courses";
import { FaSpinner } from "react-icons/fa";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const Tracks = () => {
  const [tracks, setTracks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUserId(u?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const list = await fetchEnabledCourses(db);
        setTracks(list);
      } catch {
        setTracks([]);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <AdminLayout>
      <div className="pb-20 text-white">
        <section className="relative overflow-hidden rounded-3xl bg-[#16161f] border border-white/5 p-8 lg:p-12 mb-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10 lg:flex justify-between items-end gap-6">
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
                The Curriculum
              </p>
              <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Explore Worlds
              </h1>
              <p className="text-gray-400 mt-4 max-w-lg text-lg">
                Interactive scenarios and simulations — solve problems, see consequences,
                build real blockchain intuition.
              </p>
            </div>
          </div>
        </section>

        <section>
          {loading ? (
            <div className="flex justify-center py-20">
              <FaSpinner className="animate-spin text-indigo-500 text-4xl" />
            </div>
          ) : tracks.length === 0 ? (
            <div className="text-center py-20 text-gray-500 font-medium">
              No tracks available yet. Check back soon.
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {tracks.map((track) => (
                <TrackCard key={track.id} course={track} userId={userId} />
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default Tracks;
