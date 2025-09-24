'use client'
import React, { useEffect, useState } from "react";
import MainLayout from '../../components/layouts/MainLayout'
import { ArrowRight } from 'lucide-react'
import Link from "next/link";

import { collection, query, getDocs, getFirestore, where } from "firebase/firestore";
import firebase_app from "../../firebase/config";

const db = getFirestore(firebase_app);

const CoursesPage = () => {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "courses"), where("enabled", "==", true));
        const snapshot = await getDocs(q);
        const courseList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(courseList);
      } catch (err) {
        setCourses([]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  // Filter courses by search
  const filteredCourses = courses.filter(course => {
    const q = search.toLowerCase();
    return (
      course.title?.toLowerCase().includes(q) ||
      course.description?.toLowerCase().includes(q) ||
      course.author?.toLowerCase().includes(q) ||
      course.skill?.toLowerCase().includes(q) ||
      course.timeframe?.toLowerCase().includes(q)
    );
  });

  return (
    <MainLayout>
      <>
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-purple/10 text-purple px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-purple rounded-full animate-pulse"></span>
                Explore Our Course Library
              </div>
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Master <span className="text-purple">Web3</span> & <span className="text-purple">Blockchain</span>
                <br />
                Technologies
              </h1>
              {/* Search Bar */}
              <div className="mt-12 max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search for courses, topics, or instructors..."
                    className="w-full px-6 py-4 rounded-xl border border-purple/20 focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all duration-300 text-gray bg-white shadow-sm"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple text-white p-2 rounded-lg hover:bg-purple/90 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Popular Tags */}
              {/* <div className="mt-8">
                <div className="flex flex-wrap justify-center gap-3">
                  {['Blockchain', 'Smart Contracts', 'DeFi', 'NFTs', 'Web3', 'Solidity', 'Ethereum'].map((tag) => (
                    <button
                      key={tag}
                      className="px-4 py-2 bg-white border border-purple/20 text-purple rounded-full text-sm hover:bg-purple hover:text-white transition-all duration-300"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <section className="p-6 bg-white" id="featured-courses">
          <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {loading ? (
              <div className="col-span-3 text-center py-12 text-lg text-gray">Loading courses...</div>
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-lg text-gray">No courses found.</div>
            ) : (
              filteredCourses.map(course => (
                <div key={course.id} className='rounded-xl p-6 border border-purple/10 hover:border-purple/30 transition-all duration-300 hover:shadow-lg group'>
                  <div className='relative mb-6'>
                    <div className='w-full h-48 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple/20 to-purple/40'>
                      {course.imgUrl ? (
                        <img
                          src={course.imgUrl}
                          alt={course.title || 'Course Image'}
                          className='object-cover w-full h-full'
                        />
                      ) : (
                        <span className='text-4xl'>🔗</span>
                      )}
                    </div>
                  </div>
                  <div className='mb-4'>
                    <h3 className='text-xl font-bold mb-2 group-hover:text-purple transition-colors'>
                      {course.title}
                    </h3>
                    <p className='text-sm mb-3'>
                      <span className="line-clamp-2">{course.description || 'No description provided.'}</span>
                    </p>
                    <div className='flex items-center gap-2 text-sm mb-2'>
                      <span>By {course.author || 'Unknown'}</span>
                    </div>
                    <div className='flex items-center justify-between gap-4 text-sm text-gray/60'>
                      <span className='flex items-center gap-1'>
                        📚 {course.lessons ? `${course.lessons.length} Lessons` : 'N/A'}
                      </span>
                      <span className='flex items-center gap-1'>
                        ⏱️ {course.timeframe ? course.timeframe : 'Duration N/A'}
                      </span>
                      <span className='flex items-center gap-1'>
                        🏅 {course.skill ? course.skill : 'Skill N/A'}
                      </span>
                    </div>

                  </div>
                  <Link href={`/courses/${course.id}`}>
                    <button className='w-full bg-purple text-white py-3 rounded-full font-semibold hover:bg-purple/90 transition-colors flex items-center justify-center gap-2 group'>
                      Start Learning
                      <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />
                    </button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </>
    </MainLayout>
  );
};

export default CoursesPage;
