"use client";

import CoursesCard from "@/src/components/cards/CoursesCard";
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

const Courses = () => {
  const [courses, setCourses] = useState([]);
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
        setCourses(list);
      } catch {
        setCourses([]);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <AdminLayout>
      <section className="my-6 lg:flex justify-between items-end gap-6">
        <div>
          <p className="text-xs font-bold text-purple uppercase tracking-widest mb-2">
            Learn by doing
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Hey {user?.username || "Builder"} 👋
          </h1>
          <p className="text-gray-500 mt-2 max-w-lg">
            Interactive scenarios and simulations — solve problems, see consequences,
            build real blockchain intuition.
          </p>
        </div>
      </section>

      <section>
        {loading ? (
          <div className="flex justify-center py-20">
            <FaSpinner className="animate-spin text-purple text-3xl" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No courses available yet. Check back soon.
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {courses.map((course) => (
              <CoursesCard key={course.id} course={course} userId={userId} />
            ))}
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default Courses;
