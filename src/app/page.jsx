'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Star, Code, Terminal, Layers, Check } from 'lucide-react';
import { collection, query, getDocs, getFirestore, where, limit, doc, getDoc, orderBy } from "firebase/firestore";
import firebase_app from "../firebase/config";
import { logPageEvent } from '../firebase/config';
import HeroSection from './components/HeroSection';

export default function Home() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ lessons: 0, students: 0, coursesCount: 0 });
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(firebase_app);

  useEffect(() => {
    if (pathname) {
      logPageEvent("page_view", { page: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "courses"), where("enabled", "==", true));
        const snapshot = await getDocs(q);
        const baseCourses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(baseCourses);

        let totalLessons = 0;
        let totalStudents = 0;
        let allReviews = [];

        await Promise.all(
          baseCourses.map(async (course) => {
            let count = 0;
            try {
              const enrolledRef = collection(db, `courses/${course.id}/enrolledStudents`);
              const enrolledSnap = await getDocs(enrolledRef);
              count = enrolledSnap.size;
            } catch (e) { count = 0; }
            course.enrolledCount = count;
            totalLessons += course.lessons?.length || 0;
            totalStudents += count;

            try {
              const reviewsRef = collection(db, `courses/${course.id}/reviews`);
              const reviewsQ = query(reviewsRef, orderBy("createdAt", "desc"), limit(5));
              const reviewsSnap = await getDocs(reviewsQ);
              reviewsSnap.forEach(r => {
                 allReviews.push({ id: r.id, courseId: course.id, courseTitle: course.title, ...r.data() });
              });
            } catch (e) {}
          })
        );
        
        const userCache = new Map();
        const hydratedReviews = await Promise.all(
          allReviews.map(async (rev) => {
            if (!rev.userId) return rev;
            if (!userCache.has(rev.userId)) {
              try {
                let userDoc = await getDoc(doc(db, "usersProd", rev.userId));
                if (!userDoc.exists()) userDoc = await getDoc(doc(db, "users", rev.userId));
                if (userDoc.exists()) {
                  userCache.set(rev.userId, userDoc.data());
                } else {
                  userCache.set(rev.userId, null);
                }
              } catch(e) { userCache.set(rev.userId, null); }
            }
            return { ...rev, user: userCache.get(rev.userId) };
          })
        );
        
        const finalReviews = hydratedReviews
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
          .filter(r => r.review && r.review.trim().length > 0)
          .slice(0, 6);
          
        setReviews(finalReviews);
        setStats({ lessons: totalLessons, students: totalStudents, coursesCount: baseCourses.length });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
      setLoading(false);
    };
    fetchStats();
  }, [db]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-purple/20 selection:text-purple-900 overflow-x-hidden relative">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#FDFDFD]/90 backdrop-blur-md border-b border-transparent">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
             <img src="/logo-1.png" alt="Let's Build Logo" className="h-8 w-auto object-contain" />
          </Link>
          <button 
            className="flex flex-col gap-[5px] p-2 hover:opacity-70 transition-opacity relative z-50"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <div className="w-[26px] h-[2px] bg-[#111111] rounded-full"></div>
            <div className="w-[26px] h-[2px] bg-[#111111] rounded-full"></div>
            <div className="h-[2px] bg-[#111111] rounded-full self-end w-[16px]"></div>
          </button>
        </div>
      </nav>

      <main className="pt-24">
        
        {/* HERO SECTION */}
        <HeroSection />

        {/* HOW IT WORKS / FEATURES */}
        <section className="py-32 bg-[#F9F9F9] relative overflow-hidden">
          {/* Subtle radial gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-white/60 via-[#F9F9F9] to-[#F9F9F9]"></div>
          
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-600">
                How it works
              </div>
            </div>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-[#111111] mb-6">
                From beginner to builder. Fast.
              </h2>
              <p className="text-xl text-gray-500 font-medium">
                Master Web3 architecture in a few simple steps — no setup, no friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-full aspect-[4/3] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col p-6 mb-8 transform transition-transform group-hover:-translate-y-2 relative overflow-hidden">
                   <div className="flex gap-1.5 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 w-full bg-purple/10 rounded-xl flex items-center justify-center">
                     <Layers size={48} className="text-purple opacity-50" />
                  </div>
                </div>
                <div className="px-4 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Step 1</div>
                <h3 className="text-2xl font-bold text-[#111111] mb-4">Master Architecture</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Learn by connecting interactive components. Train your brain to spot patterns before writing code.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-full aspect-[4/3] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col p-6 mb-8 transform transition-transform group-hover:-translate-y-2 relative overflow-hidden">
                   <div className="flex gap-1.5 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 w-full bg-indigo-50 rounded-xl flex items-center justify-center relative">
                     <div className="absolute bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md right-4 bottom-4">Compile</div>
                     <Code size={48} className="text-indigo-400 opacity-50" />
                  </div>
                </div>
                <div className="px-4 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Step 2</div>
                <h3 className="text-2xl font-bold text-[#111111] mb-4">Code with AI</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Our AI translates your visual architecture into clean, production-ready code.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-full aspect-[4/3] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col p-6 mb-8 transform transition-transform group-hover:-translate-y-2 relative overflow-hidden">
                   <div className="flex gap-1.5 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 w-full bg-pink-50 rounded-xl flex items-center justify-center">
                     <Terminal size={48} className="text-pink-400 opacity-50" />
                  </div>
                </div>
                <div className="px-4 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Step 3</div>
                <h3 className="text-2xl font-bold text-[#111111] mb-4">Deploy & Prove</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Test and deploy instantly in our browser-based sandbox. Prove your skills by shipping.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COURSES (Featured Templates) */}
        <section className="py-32 bg-white border-t border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
            <div className="mb-16">
              <div className="w-12 h-12 bg-[#111111] rounded-xl mx-auto mb-6 flex items-center justify-center text-white">
                <Layers size={24} />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-[#111111] mb-4">
                Foundational courses.
              </h2>
              <p className="text-xl text-gray-500 font-medium">
                Modern Web3 courses ready to elevate your skills.
              </p>
            </div>

            {loading ? (
              <div className="py-20 flex justify-center"><div className="animate-pulse w-12 h-12 bg-gray-200 rounded-full"></div></div>
            ) : courses.length > 0 && (
              <div className="space-y-24">
                {courses.slice(0, 3).map((course, idx) => (
                  <div key={course.id} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 text-left`}>
                    
                    {/* Course "Image" / Mockup */}
                    <div className="w-full lg:w-3/5 aspect-[4/3] bg-[#F9F9F9] rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative p-8 md:p-12">
                       <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
                         {/* Faux Browser Header */}
                         <div className="h-12 border-b border-gray-100 flex items-center px-4 bg-gray-50/50">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                            </div>
                         </div>
                         {/* Faux Content */}
                         <div className="p-8 flex-1 relative overflow-hidden bg-gradient-to-br from-white to-purple/5">
                            <h4 className="text-3xl font-bold text-gray-200 mb-4">{course.title}</h4>
                            <div className="space-y-3">
                              <div className="w-3/4 h-4 bg-gray-100 rounded-full"></div>
                              <div className="w-1/2 h-4 bg-gray-100 rounded-full"></div>
                              <div className="w-5/6 h-4 bg-gray-100 rounded-full"></div>
                            </div>
                            {/* Abstract Graphic */}
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl -mr-10 -mb-10"></div>
                         </div>
                       </div>
                    </div>

                    {/* Course Details */}
                    <div className="w-full lg:w-2/5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-600 mb-6">
                        {course.skill || 'Beginner'} &middot; {course.enrolledCount || 0} Students
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-[-0.03em] mb-6 leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed">
                        {course.description || "The most complete, hands-on introduction to blockchain technology and smart contracts available."}
                      </p>
                      <div className="flex items-center gap-4">
                        <Link href={`/courses/${course.id}`}>
                          <button className="px-8 py-4 bg-[#222222] text-white rounded-xl font-bold hover:bg-black transition-colors shadow-sm">
                            More Info
                          </button>
                        </Link>
                        <Link href={`/courses/${course.id}`}>
                          <button className="px-8 py-4 bg-[#F5F5F5] text-[#111111] rounded-xl font-bold hover:bg-[#EAEAEA] transition-colors">
                            Start Course
                          </button>
                        </Link>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* BIG TESTIMONIAL (Design Approach style) */}
        {reviews.length > 0 && (
          <section className="py-32 bg-[#FDFDFD] border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <div className="flex justify-center mb-12">
                <div className="px-5 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 shadow-sm">
                  Student Review
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[#111111] leading-tight mb-16">
                “{reviews[0].review}”
              </h2>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#111111] flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                  {(reviews[0].user?.username || reviews[0].user?.email || 'A').charAt(0).toUpperCase()}
                </div>
                <div className="text-xl font-bold text-[#111111] mb-1">
                  {reviews[0].user?.username || reviews[0].user?.email || 'Anonymous Builder'}
                </div>
                <div className="text-gray-500 font-medium">
                  Enrolled in {reviews[0].courseTitle}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PRICING / STATS (Flexible pricing style) */}
        <section className="py-32 bg-[#F9F9F9] border-t border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <div className="flex justify-center mb-6">
                <div className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-600">
                  Platform Stats
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-[#111111] mb-4">
                Growing ecosystem.
              </h2>
              <p className="text-xl text-gray-500 font-medium">
                Join thousands of builders learning Web3.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="text-gray-500 font-semibold mb-6 text-lg">Total Lessons</div>
                <div className="text-6xl font-black text-[#111111] tracking-[-0.05em] mb-8">
                  {loading ? '...' : stats.lessons}
                </div>
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-3 text-gray-600 font-medium"><Check size={18} className="text-[#111111]"/> Interactive modules</div>
                  <div className="flex items-center gap-3 text-gray-600 font-medium"><Check size={18} className="text-[#111111]"/> Step-by-step guides</div>
                  <div className="flex items-center gap-3 text-gray-600 font-medium"><Check size={18} className="text-[#111111]"/> Lifetime access</div>
                </div>
              </div>

              {/* Card 2 (Highlight) */}
              <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="text-gray-500 font-semibold mb-6 text-lg">Active Students</div>
                <div className="text-6xl font-black text-[#111111] tracking-[-0.05em] mb-8">
                   {loading ? '...' : stats.students}
                </div>
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-3 text-gray-600 font-medium"><Check size={18} className="text-[#111111]"/> Global community</div>
                  <div className="flex items-center gap-3 text-gray-600 font-medium"><Check size={18} className="text-[#111111]"/> Peer-to-peer reviews</div>
                  <div className="flex items-center gap-3 text-gray-600 font-medium"><Check size={18} className="text-[#111111]"/> Career opportunities</div>
                </div>
              </div>

              {/* Card 3 (Dark Theme) */}
              <div className="bg-[#111111] rounded-[2rem] p-10 shadow-xl border border-gray-800 flex flex-col items-center text-center">
                <div className="text-gray-400 font-semibold mb-6 text-lg">Web3 Courses</div>
                <div className="text-6xl font-black text-white tracking-[-0.05em] mb-8">
                   {loading ? '...' : stats.coursesCount}
                </div>
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-3 text-gray-300 font-medium"><Check size={18} className="text-white"/> Full collection access</div>
                  <div className="flex items-center gap-3 text-gray-300 font-medium"><Check size={18} className="text-white"/> Advanced topics</div>
                  <div className="flex items-center gap-3 text-gray-300 font-medium"><Check size={18} className="text-white"/> Verified certificates</div>
                </div>
                <Link href="/courses" className="w-full mt-auto pt-8">
                   <button className="w-full py-4 bg-[#222222] text-white rounded-xl font-bold hover:bg-[#333333] transition-colors border border-gray-800">
                     View Catalog
                   </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA (There's more!) */}
        <section className="py-40 bg-white relative overflow-hidden">
           <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom_center,_var(--tw-gradient-stops))] from-gray-100 via-white to-white opacity-50 pointer-events-none"></div>
           <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
             <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] text-[#111111] mb-8">
               There's more!
             </h2>
             <p className="text-xl md:text-2xl text-gray-500 font-medium mb-12">
               Browse a growing collection of Web3 courses designed for modern developers, easy learning, and real-world use.
             </p>
             <Link href="/courses">
               <button className="px-10 py-5 bg-[#222222] text-white rounded-2xl font-bold text-lg hover:bg-black transition-colors shadow-md">
                 Explore the collection
               </button>
             </Link>
           </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20">
            <div>
              <Link href="/" className="flex items-center gap-2 group mb-6">
                <div className="w-8 h-8 bg-[#111111] rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-purple transition-colors">
                  L
                </div>
                <span className="font-bold text-2xl tracking-tight">Let's Build.</span>
              </Link>
              <p className="text-gray-500 font-medium max-w-sm">
                The premier learning engine for Web3 architecture and smart contract development.
              </p>
            </div>
            
            <div className="flex gap-16">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[#111111] mb-2">Platform</h4>
                <Link href="/courses" className="text-gray-500 hover:text-[#111111] font-medium transition-colors">Courses</Link>
                <Link href="/about" className="text-gray-500 hover:text-[#111111] font-medium transition-colors">About</Link>
                <Link href="/pricing" className="text-gray-500 hover:text-[#111111] font-medium transition-colors">Pricing</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[#111111] mb-2">Legal</h4>
                <Link href="/privacy" className="text-gray-500 hover:text-[#111111] font-medium transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-500 hover:text-[#111111] font-medium transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 font-medium text-sm">
            <p>&copy; {new Date().getFullYear()} Let's Build DAO. All rights reserved.</p>
            <p>Designed with precision.</p>
          </div>
        </div>
      </footer>

      {/* OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* SIDEBAR DRAWER */}
      <aside 
        className={`fixed top-4 bottom-4 w-[340px] max-w-[calc(100vw-2rem)] bg-[#282828] rounded-[2rem] p-10 flex flex-col text-white shadow-[0_20px_40px_rgba(0,0,0,0.25)] z-50 transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)]
        ${mobileMenuOpen ? 'right-4 opacity-100' : '-right-full opacity-0'}`}
      >
        {/* Close button visible on all screens */}
        <button 
          onClick={() => setMobileMenuOpen(false)} 
          className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className="flex flex-col gap-[22px] mt-16 mb-auto">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-[24px] font-medium tracking-tight text-white hover:text-gray-300 transition-colors">Home</Link>
          <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="text-[24px] font-medium tracking-tight text-white hover:text-gray-300 transition-colors">Courses</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-[24px] font-medium tracking-tight text-white hover:text-gray-300 transition-colors">Contact</Link>
        </div>

        <div className="mt-8 flex flex-col gap-10">
           <div className="flex items-center gap-5 text-[#888888]">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white transition-colors cursor-pointer"><path d="M18 6L6 18M6 6l12 12"/></svg>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white transition-colors cursor-pointer"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
           </div>
           
           <div className="pt-8 border-t border-[#444444]">
             <p className="text-[13px] text-[#888888] mb-1">Get in touch</p>
             <p className="text-[16px] font-medium text-white hover:text-gray-300 transition-colors cursor-pointer">hello@lbdao.xyz</p>
           </div>
        </div>
      </aside>

    </div>
  );
}
