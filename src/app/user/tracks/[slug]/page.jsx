'use client'

import V2CourseEngine from '@/src/components/views/V2CourseEngine';
import LessonJourneyEngine from '@/src/components/engine/LessonJourneyEngine';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import firebase_app from "../../../../firebase/config";
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { FaSpinner } from "react-icons/fa";
import { fetchCourseById } from '@/src/data/courses';
import Link from 'next/link';

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const CoursePlayerPage = () => {
  const [data, setData] = useState(null);
  const params = useParams();
  const [userId, setUserId] = useState(null);
  const slug = params?.slug;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!slug) return;

    const load = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const course = await fetchCourseById(db, slug);
        if (!course) {
          setData(null);
          setNotFound(true);
        } else {
          setData(course);
        }
      } catch {
        setNotFound(true);
      }
      setLoading(false);
    };

    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <FaSpinner className="animate-spin text-purple text-4xl" />
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <AdminLayout collapsedProps={true} hideSidebar={true}>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Track not found</h1>
          <p className="text-gray-500 max-w-sm">
            This track may have been removed or the link is incorrect.
          </p>
          <Link
            href="/user/tracks"
            className="bg-purple text-white px-8 py-3 rounded-full font-bold hover:bg-purple/90"
          >
            Browse tracks
          </Link>
        </div>
      </AdminLayout>
    );
  }

  // Use the new step-based LessonJourneyEngine for courses with `steps` data,
  // fall back to the legacy V2CourseEngine for older courses.
  const hasStepBasedLessons = data?.lessons?.some((l) => Array.isArray(l.steps));

  return (
    <AdminLayout collapsedProps={true} hideSidebar={true}>
      {hasStepBasedLessons ? (
        <LessonJourneyEngine data={data} userId={userId} courseId={slug} />
      ) : (
        <V2CourseEngine data={data} userId={userId} courseId={slug} />
      )}
    </AdminLayout>
  );
};

export default CoursePlayerPage;
