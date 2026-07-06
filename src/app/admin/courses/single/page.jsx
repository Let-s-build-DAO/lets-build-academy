"use client";

import V2CourseEngine from "@/src/components/views/V2CourseEngine";
import AdminLayout from "@/src/components/layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import firebase_app from "../../../../firebase/config";
import { userAtom } from "@/src/store";
import { useAtom } from "jotai";
import { fetchCourseById } from "@/src/data/courses";
import { FaSpinner } from "react-icons/fa";

const db = getFirestore(firebase_app);

const AdminCoursePreview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const page = useSearchParams().get("id");
  const [user] = useAtom(userAtom);

  useEffect(() => {
    if (!page) {
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      const course = await fetchCourseById(db, page);
      setData(course);
      setLoading(false);
    };
    load();
  }, [page]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-purple text-4xl" />
      </div>
    );
  }

  if (!data) {
    return (
      <AdminLayout hideSidebar={true}>
        <div className="p-8 text-center text-gray-500">Course not found.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout hideSidebar={true}>
      <V2CourseEngine data={data} userId={user?.id} courseId={page} />
    </AdminLayout>
  );
};

export default AdminCoursePreview;
