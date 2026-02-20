'use client'
import MainLayout from '../components/layouts/MainLayout'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { collection, query, getDocs, getFirestore, where, limit, doc, getDoc, orderBy } from "firebase/firestore";
import firebase_app from "../firebase/config";
import { FaSpinner } from "react-icons/fa";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({ lessons: 0, students: 0, coursesCount: 0 });
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(firebase_app);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

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
            } catch (e) {
              count = 0;
            }
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
        
        // Hydrate reviews with user data
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
              } catch(e) {
                userCache.set(rev.userId, null);
              }
            }
            return { ...rev, user: userCache.get(rev.userId) };
          })
        );
        
        // Sort and take top 6 with actual text
        const finalReviews = hydratedReviews
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
          .filter(r => r.review && r.review.trim().length > 0)
          .slice(0, 6);
          
        setReviews(finalReviews);

        setStats({
          lessons: totalLessons,
          students: totalStudents,
          coursesCount: baseCourses.length
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
      setLoading(false);
    };
    fetchStats();
  }, [db]);

  const features = [
    {
      id: 0,
      icon: '🎯',
      title: 'Interactive Learning',
      description: 'Hands-on coding exercises, real-world projects, and interactive simulations that make learning Web3 engaging and practical.',
      image: '/images/DSC00087.jpg',
      bgGradient: 'from-purple/20 to-purple/40'
    },

    {
      id: 1,
      icon: '🚀',
      title: 'Real-World Projects',
      description: 'Build actual DApps, smart contracts, and blockchain solutions that you can showcase in your portfolio.',
      image: '/images/academy.png',
      bgGradient: 'from-purple/20 to-purple/40'
    },
    {
      id: 3,
      icon: '🤝',
      title: 'Community Support',
      description: 'Join a vibrant community of builders, get help when stuck, and collaborate on exciting Web3 projects.',
      image: '/images/DSC09870.jpg',
      bgGradient: 'from-purple/20 to-purple/40'
    },

  ]



  return (
    <MainLayout>
      <>
        {/* Brilliant-Style Hero Section */}
        <section className="relative w-full min-h-[100svh] flex items-center bg-gradient-to-b from-white to-purple/5 overflow-hidden border-b border-gray-200">
          <div 
            className="w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 px-6 pt-32 pb-16 lg:px-[7%] lg:py-[9.563rem]"
            style={{ maxWidth: '1440px' }}
          >
            
            {/* Left Content (Text & CTA) */}
            <div className="w-full lg:w-5/12 flex flex-col items-start text-left z-10">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-black leading-tight mb-6">
                Learn by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-black inline-block pb-4 lg:pb-6">thinking.</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-lg font-medium leading-relaxed">
                Guided interactive problem solving for Web3 and Smart Contracts. Master the logic behind blockchain architecture.
              </p>
              
              <Link href={'/auth'}>
                <button className="px-10 py-5 bg-purple hover:bg-purple/90 text-white rounded-full font-bold text-xl transition-all duration-300 shadow-[0_8px_16px_rgba(64,25,108,0.3)] hover:shadow-[0_12px_24px_rgba(64,25,108,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 group">
                  <span>Start learning now</span>
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <div className="mt-8 flex items-center gap-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                 <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple/10 border-2 border-white flex items-center justify-center text-xs">👨‍💻</div>
                    <div className="w-8 h-8 rounded-full bg-black/10 border-2 border-white flex items-center justify-center text-xs">🚀</div>
                    <div className="w-8 h-8 rounded-full bg-purple/20 border-2 border-white flex items-center justify-center text-xs">⚡</div>
                 </div>
                 <span>Join 10k+ Web3 Builders</span>
              </div>
            </div>

            {/* Right Content (Stylized Graphic / Interactive Cards) */}
            <div className="w-full lg:w-5/12 relative h-[300px] sm:h-[400px] lg:h-[400px] flex items-center justify-center lg:justify-end z-10">
               {/* Abstract background blobs */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple/20 via-white to-purple/10 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
               
               {/* Floating Interface elements mimicking Brilliant's clean vector style */}
               <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md aspect-square flex items-center justify-center lg:mt-0">
                  
                  {/* Central Concept Node */}
                  <div className="absolute z-20 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white rounded-2xl shadow-xl border border-purple/10 flex flex-col items-center justify-center gap-1 lg:gap-2 hover:scale-105 transition-transform cursor-default">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 bg-purple/10 text-purple rounded-xl flex items-center justify-center text-xl sm:text-2xl lg:text-2xl">🔗</div>
                    <span className="font-bold text-[10px] sm:text-xs lg:text-sm text-black">Smart Contract</span>
                  </div>
                  
                  {/* Surrounding Nodes */}
                  <div className="absolute z-10 top-2 right-2 sm:top-4 sm:right-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-1 lg:gap-2 animate-[float_4s_ease-in-out_infinite]">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 bg-black/5 text-black rounded-xl flex items-center justify-center text-lg sm:text-xl lg:text-xl">🛡️</div>
                    <span className="font-bold text-[9px] sm:text-[10px] lg:text-xs text-black">Security</span>
                  </div>

                  <div className="absolute z-10 bottom-2 left-2 sm:bottom-4 sm:left-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-1 lg:gap-2 animate-[float_5s_ease-in-out_infinite_0.5s]">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 bg-purple/5 text-purple rounded-xl flex items-center justify-center text-lg sm:text-xl lg:text-xl">⚙️</div>
                    <span className="font-bold text-[9px] sm:text-[10px] lg:text-xs text-black">Logic</span>
                  </div>

                  <div className="absolute z-10 top-1/2 -left-4 sm:-left-6 lg:-left-8 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-1 lg:gap-2 animate-[float_6s_ease-in-out_infinite_1s]">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-8 lg:h-8 bg-black/5 text-black rounded-xl flex items-center justify-center text-base sm:text-lg lg:text-lg">💡</div>
                    <span className="font-bold text-[8px] sm:text-[9px] lg:text-[10px] text-black">Design</span>
                  </div>

                  {/* Connecting SVG Lines (Decorative) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M200 200 L300 100" stroke="#E5E7EB" strokeWidth="3" className="animate-[pulse_2s_infinite] sm:stroke-4" strokeDasharray="8 8" />
                    <path d="M200 200 L100 300" stroke="#E5E7EB" strokeWidth="3" className="animate-[pulse_2s_infinite_0.5s] sm:stroke-4" strokeDasharray="8 8" />
                    <path d="M200 200 L60 200" stroke="#E5E7EB" strokeWidth="3" className="animate-[pulse_2s_infinite_1s] sm:stroke-4" strokeDasharray="8 8" />
                  </svg>

               </div>

            </div>
          </div>
          
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}</style>
        </section>

        {/* About Academy & Stats Section */}
        <section className='bg-white pt-16 pb-12 lg:py-24 mt-0 border-b border-gray-100'>
          <div className='mx-auto px-6 lg:px-[7%]' style={{ maxWidth: '1440px' }}>
            <div className='max-w-3xl mb-12'>
              <h3 className='text-purple font-bold tracking-wide text-sm mb-3'>
                Blockchain & Web3 Development
              </h3>
              <h2 className='text-3xl md:text-5xl font-black text-gray-900 mb-6'>
                What is Let&apos;s Build Academy?
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed font-medium'>
                LB Academy is a self-learning engine designed to move users from confused learners to confident builders, and ultimately, to globally competitive innovators.
                <br/><br/>
                The core philosophy of the engine is: <span className="text-purple font-bold">&quot;Code is cheap. Thinking is expensive.&quot;</span> By combining the interactive, first-principles logic solving with the AI-assisted, intent-based &quot;vibe coding&quot;, the LB Academy Engine acts as the ultimate filter for Web3 education worldwide. It removes the noise of AI-generated boilerplate and forces users to focus on high-level architecture and smart contract strategy capable of scaling across borders.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Stat Card 1 */}
              <div className='bg-gray-50/50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1'>
                <div className='text-purple mb-4'>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h4 className='text-3xl font-black text-gray-900 mb-2'>{loading ? <FaSpinner className="animate-spin text-purple inline-block text-2xl"/> : `${stats.lessons}+`}</h4>
                <p className='text-sm text-gray-500 font-semibold'>Total interactive lessons</p>
              </div>

              {/* Stat Card 2 */}
              <div className='bg-gray-50/50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1'>
                <div className='text-purple mb-4'>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                </div>
                <h4 className='text-3xl font-black text-gray-900 mb-2'>{loading ? <FaSpinner className="animate-spin text-purple inline-block text-2xl"/> : `${stats.students}+`}</h4>
                <p className='text-sm text-gray-500 font-semibold'>Monthly active students</p>
              </div>

              {/* Stat Card 3 */}
              <div className='bg-gray-50/50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1'>
                <div className='text-purple mb-4'>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h4 className='text-3xl font-black text-gray-900 mb-2'>{loading ? <FaSpinner className="animate-spin text-purple inline-block text-2xl"/> : `${stats.coursesCount}+`}</h4>
                <p className='text-sm text-gray-500 font-semibold'>Web3 courses & modules</p>
              </div>
            </div>
          </div>
        </section>

        {/* The LB Engine Section */}
        <section className='bg-purple py-12 lg:py-16 relative overflow-hidden'>
          <div className='mx-auto px-6 lg:px-[7%] relative z-10' style={{ maxWidth: '1440px' }}>
            {/* Section Header */}
            <div className='text-center mb-16 lg:mb-20 max-w-4xl mx-auto'>
              <div className='inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20 backdrop-blur-sm shadow-xl'>
                 <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
                 The LB Engine
              </div>
              <h2 className='text-3xl md:text-5xl lg:text-5xl font-black text-white mb-6 leading-tight'>
                Built for Innovators,<br/> <span className='text-dark-300'>Not Just Typists.</span>
              </h2>
              <p className='text-base md:text-lg lg:text-xl text-white/80 font-medium max-w-2xl mx-auto'>
                We engineered a three-layer system to teach you how to think, build, and deploy.
              </p>
            </div>

            <div className='flex flex-col gap-8 lg:gap-12 max-w-5xl mx-auto'>
              
              {/* Layer 1 */}
              <div className='flex flex-col lg:flex-row items-center gap-8 group'>
                <div className='w-full lg:w-[200px] h-32 md:h-40 lg:h-48 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl'>
                  {/* Strategic Cubic Pattern */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                  
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className='w-16 h-16 lg:w-20 lg:h-20 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center z-10 shadow-2xl backdrop-blur-md group-hover:rotate-6 transition-transform duration-500'>
                     <span className='text-3xl lg:text-4xl'>🧩</span>
                  </div>
                </div>
                <div className='w-full lg:w-3/5 text-center lg:text-left space-y-3 lg:space-y-4'>
                  <div className='inline-block text-blue-300 font-bold uppercase tracking-widest text-xs'>Layer 1: The Visual Canvas</div>
                  <h3 className='text-2xl lg:text-4xl font-black text-white leading-tight'>Master the Architecture.<br/><span className="text-white/60">Skip the Syntax.</span></h3>
                  <p className='text-white/80 text-sm lg:text-base leading-relaxed'>
                    Drag, drop, and connect smart contract components to solve interactive puzzles. We train your brain to spot vulnerabilities and optimize gas before writing code.
                  </p>
                </div>
              </div>

              {/* Layer 2 */}
              <div className='flex flex-col lg:flex-row-reverse items-center gap-8 group'>
                <div className='w-full lg:w-[200px] h-32 md:h-40 lg:h-48 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl'>
                  {/* Strategic Cubic Pattern */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                  
                  <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/30 rounded-full blur-3xl -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className='w-16 h-16 lg:w-20 lg:h-20 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center z-10 shadow-2xl backdrop-blur-md group-hover:-rotate-6 transition-transform duration-500'>
                     <span className='text-3xl lg:text-4xl'>🤖</span>
                  </div>
                </div>
                <div className='w-full lg:w-3/5 text-center lg:text-left space-y-3 lg:space-y-4'>
                  <div className='inline-block text-pink-300 font-bold uppercase tracking-widest text-xs'>Layer 2: The Agentic Co-Pilot</div>
                  <h3 className='text-2xl lg:text-4xl font-black text-white leading-tight'>Your Personal AI Tutor</h3>
                  <p className='text-white/80 text-sm lg:text-base leading-relaxed'>
                    Our AI translates your architecture into clean code, explaining the <em>why</em> behind the <em>how</em>. As you iterate using natural language, you learn production-ready structure in real-time, without getting stuck.
                  </p>
                </div>
              </div>

              {/* Layer 3 */}
              <div className='flex flex-col lg:flex-row items-center gap-8 group'>
                <div className='w-full lg:w-[200px] h-32 md:h-40 lg:h-48 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl'>
                  {/* Strategic Cubic Pattern */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                  
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/30 rounded-full blur-3xl -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className='w-16 h-16 lg:w-20 lg:h-20 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center z-10 shadow-2xl backdrop-blur-md group-hover:rotate-6 transition-transform duration-500'>
                     <span className='text-3xl lg:text-4xl'>🚀</span>
                  </div>
                </div>
                <div className='w-full lg:w-3/5 text-center lg:text-left space-y-3 lg:space-y-4'>
                  <div className='inline-block text-emerald-300 font-bold uppercase tracking-widest text-xs'>Layer 3: The Zero-Setup Sandbox</div>
                  <h3 className='text-2xl lg:text-4xl font-black text-white leading-tight'>Prove by Shipping</h3>
                  <p className='text-white/80 text-sm lg:text-base leading-relaxed'>
                    Our browser-based blockchain lets you compile, test, and deploy instantly. Gain immediate, hands-on experience interacting with your contracts in a safe sandbox.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className='bg-white py-20 lg:py-24 relative overflow-hidden'>
          <div className='mx-auto px-6 lg:px-[7%]' style={{ maxWidth: '1440px' }}>
            
            {/* Header Text */}
            <div className='text-center mb-12 max-w-2xl mx-auto'>
              <div className='inline-flex items-center gap-2 bg-purple/10 text-purple px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-purple/20 backdrop-blur-sm shadow-sm'>
                 <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
                 Everything you need
              </div>
              <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>
                Our blockchain courses
              </h2>
              <p className='text-gray-600 text-lg md:text-xl font-medium mb-6 leading-relaxed'>
                From day-one beginners to seasoned engineers and aspiring smart contract auditors—our engine is built for anyone ready to level up. We don’t just offer courses; we provide a high-fidelity filter that trains you to think, build, and innovate on a global scale.
              </p>

            </div>

            <div className='max-w-5xl mx-auto'>
              <div className='flex items-center justify-between mb-4 relative'>
                 <h3 className='text-2xl font-black text-gray-900'>Foundational Courses</h3>
              </div>

              {/* Brand Gradient Border Card Wrapper */}
              {loading ? (
                <div className="flex justify-center items-center py-24">
                  <FaSpinner className="animate-spin text-purple text-5xl" />
                </div>
              ) : courses.length > 0 && (
                (() => {
                  const featuredCourse = courses[0];
                  return (
                    <div className='bg-gradient-to-r from-purple via-purple/70 to-indigo-500 p-[3px] rounded-3xl shadow-2xl overflow-visible relative'>
                      {/* Inner White Card */}
                      <div className='bg-white rounded-[21px] p-8 md:p-12 flex flex-col lg:flex-row gap-12 lg:gap-16 relative overflow-hidden'>
                        
                        {/* Left Column: Course Info */}
                        <div className='flex-1 space-y-6'>
                          <div className='flex items-start justify-between'>
                            <h4 className='text-2xl md:text-3xl font-black text-gray-900 w-3/4'>{featuredCourse.title}</h4>
                            <span className='px-4 py-1.5 bg-purple/10 text-purple border border-purple/20 font-bold text-sm rounded-full capitalize'>
                              {featuredCourse.skill || 'Beginner'}
                            </span>
                          </div>

                          <p className='text-gray-600 text-lg leading-relaxed font-medium'>
                            {featuredCourse.description || "The most popular introductory blockchain developer course and the most complete, hands-on introduction to blockchain technology and smart contracts available."}
                          </p>

                          <div className='flex items-center gap-4 pt-4'>
                            <div className='flex -space-x-3'>
                              <img src="/images/user1.png" alt="User" onError={(e) => e.target.style.display='none'} className='w-10 h-10 rounded-full border-2 border-white bg-gray-200' />
                              <img src="/images/user2.png" alt="User" onError={(e) => e.target.style.display='none'} className='w-10 h-10 rounded-full border-2 border-white bg-gray-300' />
                              <img src="/images/user3.png" alt="User" onError={(e) => e.target.style.display='none'} className='w-10 h-10 rounded-full border-2 border-white bg-gray-400' />
                              <div className='w-10 h-10 rounded-full border-2 border-white bg-purple text-white flex items-center justify-center text-xs font-bold'>+</div>
                            </div>
                            <span className='text-sm text-gray-500 font-semibold'>
                              <strong className='text-gray-900'>{featuredCourse.enrolledCount > 0 ? featuredCourse.enrolledCount : '500+'}</strong> users have taken this course
                            </span>
                          </div>

                          <div className='pt-6'>
                            <Link href={`/courses/${featuredCourse.id}`}>
                              <button className='bg-white border-2 border-gray-200 text-gray-900 px-6 py-3 rounded-xl font-extrabold hover:border-gray-900 hover:bg-gray-50 transition-all flex items-center gap-2 group shadow-sm'>
                                Get started
                                <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />
                              </button>
                            </Link>
                          </div>
                        </div>

                        {/* Right Column: Course Overview */}
                        <div className='flex-1'>
                          <div className='bg-gray-50/50 border border-gray-100 rounded-2xl p-6 h-full'>
                            <div className='flex items-center gap-3 mb-6'>
                              <span className='text-gray-400'>
                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                              </span>
                              <h4 className='text-xl font-black text-gray-900'>Course Overview</h4>
                            </div>

                            <div className='space-y-3'>
                              {featuredCourse.lessons && featuredCourse.lessons.length > 0 ? (
                                featuredCourse.lessons.slice(0, 3).map((lesson, idx) => (
                                  <div key={idx} className={`rounded-xl p-4 flex flex-col gap-1 transition-colors ${idx === 0 ? 'bg-purple/5 border border-purple/10' : 'hover:bg-gray-50'}`}>
                                    <div className='flex items-center gap-3'>
                                       <div className={`w-4 h-4 rounded-md border ${idx === 0 ? 'border-purple/40 bg-white' : 'border-gray-300 bg-white'}`}></div>
                                       <span className={`font-bold text-sm ${idx === 0 ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
                                         {idx + 1}. {lesson.title}
                                       </span>
                                    </div>
                                    <div className={`pl-7 text-xs font-medium ${idx === 0 ? 'text-gray-600' : 'text-gray-400'}`}>
                                       {lesson.subtitle || 'Learn the foundational concepts.'}
                                       <div className={`flex items-center gap-1 mt-1 ${idx === 0 ? 'text-purple/70' : 'text-gray-400'}`}>
                                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                         Duration: {lesson.duration || '10min'}
                                       </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500 italic">Curriculum content coming soon.</p>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className='bg-gray-50 py-20 lg:py-24 relative overflow-hidden'>
             <div className='mx-auto px-6 lg:px-[7%]' style={{ maxWidth: '1440px' }}>
                <div className='text-center mb-16'>
                  <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>
                    What our students say
                  </h2>
                  <p className='text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto'>
                    Hear from developers who have supercharged their Web3 journey with Let&apos;s Build Academy.
                  </p>
                </div>
                
                <div className='relative max-w-4xl mx-auto overflow-hidden rounded-3xl'>
                  <div 
                    className='flex transition-transform duration-700 ease-in-out'
                    style={{ transform: `translateX(-${currentReview * 100}%)` }}
                  >
                    {reviews.map((r, i) => (
                      <div key={i} className='w-full min-w-full shrink-0 px-2 md:px-4'>
                        <div className='bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col relative'>
                          <div className='absolute top-4 right-6 text-5xl md:text-6xl text-gray-100 font-serif leading-none opacity-50 select-none'>
                            &quot;
                          </div>
                          <div className='flex items-center gap-1 mb-4 md:mb-6 text-yellow-500 relative z-10'>
                            {Array.from({length: r.rating || 5}).map((_, idx) => <span key={idx} className="text-xl md:text-2xl">★</span>)}
                          </div>
                          <p className='text-gray-700 text-lg md:text-2xl leading-relaxed mb-6 md:mb-8 flex-1 relative z-10 italic'>
                            &quot;{r.review}&quot;
                          </p>
                          <div className='flex items-center gap-3 md:gap-4 mt-auto pt-4 md:pt-6 border-t border-gray-50'>
                             <div className='w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-purple/10 flex items-center justify-center text-purple font-black text-xl md:text-2xl shadow-inner'>
                               {(r.user?.username || r.user?.email || '?').charAt(0).toUpperCase()}
                             </div>
                             <div className='min-w-0'>
                                <h4 className='font-bold text-gray-900 text-base md:text-lg truncate'>{r.user?.username || r.user?.email || 'Anonymous Student'}</h4>
                                <p className='text-xs md:text-sm text-gray-500 truncate font-medium'>Course: {r.courseTitle}</p>
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Slider controls */}
                  <div className='flex justify-center items-center gap-2 mt-8'>
                     {reviews.map((_, idx) => (
                       <button 
                         key={idx}
                         onClick={() => setCurrentReview(idx)}
                         className={`h-2 rounded-full transition-all duration-300 ${currentReview === idx ? 'w-8 bg-purple' : 'w-2 bg-purple/20 hover:bg-purple/50'}`}
                         aria-label={`Go to review ${idx + 1}`}
                       />
                     ))}
                  </div>
                </div>
             </div>
          </section>
        )}
      </>
    </MainLayout >
  )
}
