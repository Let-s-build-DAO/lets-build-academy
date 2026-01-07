"use client";

import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import firebase_app from "../../../firebase/config";
import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
    where,
    doc,
    getDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

const ReviewsPage = () => {
    const [loading, setLoading] = useState(true);
    const [courseReviews, setCourseReviews] = useState([]);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        const fetchAllReviews = async () => {
            setLoading(true);
            setError("");
            try {
                // Get all enabled courses (most likely only these are relevant)
                const coursesQ = query(collection(db, "courses"), where("enabled", "==", true));
                const coursesSnap = await getDocs(coursesQ);
                const courses = coursesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

                // For each course, fetch its reviews subcollection
                const courseResults = await Promise.all(
                    courses.map(async (course) => {
                        const reviewsRef = collection(db, `courses/${course.id}/reviews`);
                        const reviewsQ = query(reviewsRef, orderBy("createdAt", "desc"));
                        const reviewsSnap = await getDocs(reviewsQ);
                        const reviews = reviewsSnap.docs.map((r) => ({ id: r.id, ...r.data() }));

                        return { course, reviews };
                    })
                );

                // Join user details from usersProd
                const userIds = new Set();
                courseResults.forEach(({ reviews }) => {
                    reviews.forEach((r) => {
                        if (r.userId) userIds.add(r.userId);
                    });
                });

                const userMap = new Map();
                await Promise.all(
                    Array.from(userIds).map(async (uid) => {
                        try {
                            // First try usersProd
                            let userDoc = await getDoc(doc(db, "usersProd", uid));
                            if (!userDoc.exists()) {
                                // If not found in usersProd, try users collection
                                userDoc = await getDoc(doc(db, "users", uid));
                            }
                            if (userDoc.exists()) {
                                userMap.set(uid, { id: uid, ...userDoc.data() });
                            } else {
                                userMap.set(uid, { id: uid });
                            }
                        } catch (e) {
                            userMap.set(uid, { id: uid });
                        }
                    })
                );

                const hydrated = courseResults
                    .map(({ course, reviews }) => ({
                        course,
                        reviews: reviews.map((r) => ({
                            ...r,
                            user: r.userId ? userMap.get(r.userId) : null,
                        })),
                    }))
                    .filter((cr) => cr.reviews.length > 0);

                setCourseReviews(hydrated);
            } catch (e) {
                console.error(e);
                setError("Failed to load reviews.");
                setCourseReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllReviews();
    }, []);

    const totalReviews = useMemo(
        () => courseReviews.reduce((sum, c) => sum + (c.reviews?.length || 0), 0),
        [courseReviews]
    );

    return (
        <AdminLayout>
            <section className='my-8 px-2 lg:px-6'>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-8">
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>User Reviews</h1>
                        <p className="text-gray-600">Manage and view all course reviews from users</p>
                    </div>
                    <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-medium">
                        {loading ? "Loading..." : `${totalReviews} review(s)`}
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-700 flex items-center gap-2 shadow-sm">
                        <span className="text-red-500">⚠️</span>
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="mt-6 flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        <span className="ml-3 text-gray-500">Loading reviews...</span>
                    </div>
                ) : courseReviews.length === 0 ? (
                    <div className="mt-6 flex flex-col items-center justify-center py-12 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                        <p className="text-gray-500">Reviews will appear here once users start leaving feedback on courses.</p>
                    </div>
                ) : (
                    <div className='mt-6 space-y-6'>
                        {courseReviews.map(({ course, reviews }) => (
                            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setExpanded((prev) => ({ ...prev, [course.id]: !prev?.[course.id] }))
                                    }
                                    className="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-200 group"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-3">
                                                <div className={`transform transition-transform duration-200 ${expanded?.[course.id] ? 'rotate-90' : ''}`}>
                                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h2 className="text-xl font-semibold text-gray-900 truncate group-hover:text-purple-700 transition-colors">
                                                    {course.title || "Untitled course"}
                                                </h2>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1 ml-8">Course ID: {course.id}</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                                            </span>
                                            <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expanded?.[course.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>

                                {expanded?.[course.id] && (
                                    <div className="divide-y divide-gray-100">
                                        {reviews.map((r) => {
                                            const createdAtDate = r.createdAt?.toDate?.() || (r.createdAt ? new Date(r.createdAt) : null);
                                            const createdAtLabel = createdAtDate && !isNaN(createdAtDate.getTime())
                                                ? createdAtDate.toLocaleString()
                                                : "-";

                                            const userInitials = r.user?.username
                                                ? r.user.username.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                                                : r.user?.email
                                                    ? r.user.email[0].toUpperCase()
                                                    : '?';

                                            return (
                                                <div key={r.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-start gap-4">
                                                        {/* <div className="flex-shrink-0">
                                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                                <span className="text-purple-700 font-semibold text-sm">{userInitials}</span>
                                                            </div>
                                                        </div> */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap mb-2">
                                                                <span className="font-semibold text-gray-900">
                                                                    {r.user?.username || r.user?.email || "Unknown user"}
                                                                </span>
                                                                {r.user?.email && r.user?.username && (
                                                                    <span className="text-sm text-gray-500">({r.user.email})</span>
                                                                )}
                                                                {typeof r.rating === 'number' && (
                                                                    <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-sm font-medium shadow-sm">
                                                                        <span>⭐</span>
                                                                        {r.rating}/5
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-gray-700 mb-3 leading-relaxed">
                                                                {r.review ? (
                                                                    <div className="relative">
                                                                        {/* <span className="text-2xl text-gray-300 absolute -top-1 -left-1">"</span> */}
                                                                        <p className="italic">{r.review}</p>
                                                                        {/* <span className="text-2xl text-gray-300 absolute -bottom-3">"</span> */}
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-gray-400 italic">(No text provided)</span>
                                                                )}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                Posted on {createdAtLabel}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </AdminLayout>
    );
};

export default ReviewsPage;