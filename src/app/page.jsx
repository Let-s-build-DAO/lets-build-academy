'use client'
import MainLayout from '../components/layouts/MainLayout'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { collection, query, getDocs, getFirestore, where, limit } from "firebase/firestore";
import firebase_app from "../firebase/config";
import { FaSpinner } from "react-icons/fa";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(firebase_app);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "courses"), where("enabled", "==", true), limit(3));
        const snapshot = await getDocs(q);
        const baseCourses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Attach enrolled count from subcollection: courses/{courseId}/enrolledStudents
        const withCounts = await Promise.all(
          baseCourses.map(async (course) => {
            try {
              const enrolledRef = collection(db, `courses/${course.id}/enrolledStudents`);
              const enrolledSnap = await getDocs(enrolledRef);
              return { ...course, enrolledCount: enrolledSnap.size };
            } catch (e) {
              return { ...course, enrolledCount: 0 };
            }
          })
        );

        setCourses(withCounts);
      } catch (err) {
        setCourses([]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

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

  const otherFeats = [
    {
      id: 0,
      icon: '👨‍🏫',
      title: 'Expert Instructors',
      description: 'Learn from industry veterans and blockchain pioneers who have built successful Web3 projects.',
      bgGradient: 'from-green-400/20 to-green-600/40'
    },
    {
      id: 1,
      icon: '🏆',
      title: 'NFT Certificates',
      description: 'Earn verifiable NFT certificates stored on-chain that prove your Web3 skills to employers and the community.',
      bgGradient: 'from-yellow-400/20 to-orange-500/40'
    },
    {
      id: 2,
      icon: '💼',
      title: 'Career Support',
      description: 'Get guidance on career transitions, job placements, and connections with top Web3 companies hiring developers.',
      bgGradient: 'from-indigo-400/20 to-purple-600/40'
    }
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
                learn by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-black inline-block pb-4 lg:pb-6">thinking.</span>
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

        {/* Featured Courses Section */}
        <section className='bg-white pt-8 pb-12 lg:py-16 mt-0 lg:mt-4 mb-4'>
          <div className='mx-auto px-6 lg:px-[7%]' style={{ maxWidth: '1440px' }}>
            <div className='text-center mb-10'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Featured Courses
              </h2>
              <p className='text-lg max-w-2xl mx-auto'>
                Master the latest Web3 technologies with our expert-crafted courses
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {loading ? (
                <div className="flex items-center col-span-3 justify-center w-full h-64">
                  <FaSpinner className="animate-spin text-purple text-4xl mb-2" />
                </div>) : courses.length === 0 ? (
                  <div className="col-span-3 text-center py-12 text-gray-400">No enabled courses found.</div>
                ) : (
                courses.slice(0, 3).map(course => (
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
                          👥 {course.enrolledCount ?? 0} Enrolled
                        </span>
                        {/* <span className='flex items-center gap-1'>
                          ⏱️ {course.timeframe ? course.timeframe : 'Duration N/A'}
                        </span> */}
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

            {/* View All Courses Button */}
            <div className='text-center mt-12'>
              <Link href='/courses'>
                <button className='bg-transparent border-2 border-purple text-purple px-8 py-3 rounded-full font-semibold hover:bg-purple hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto'>
                  View All Courses
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className='bg-purple py-12 lg:py-20'>
          <div className='mx-auto px-6 lg:px-[7%]' style={{ maxWidth: '1440px' }}>
            {/* Section Header */}
            <div className='text-center mb-12'>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                Why Choose <span className='text-white/80'>Let&apos;s Build Academy?</span>
              </h2>
              <p className='text-lg text-white/80 max-w-2xl mx-auto'>
                Experience the future of learning with our cutting-edge Web3 education platform
              </p>
            </div>

            {/* Interactive Features Layout */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              {/* Features Grid */}
              <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 group cursor-pointer ${activeFeature === index
                      ? 'bg-white/20 border-2 border-white/40 scale-105'
                      : 'hover:bg-white/10'
                      }`}
                  >
                    <div className='mb-4'>
                      <div className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 ${activeFeature === index ? 'scale-110' : 'group-hover:scale-105'
                        }`}>
                        <span className='text-xl'>{feature.icon}</span>
                      </div>
                      <h3 className='text-lg font-bold text-white mb-2'>{feature.title}</h3>
                      <p className='text-white/80 text-sm leading-relaxed mb-3'>
                        {feature.description}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

              {/* Feature Image Display */}
              <div className='relative'>
                <div className='bg-white/10 backdrop-blur-sm rounded-2xl h-96 flex items-center justify-center overflow-hidden'>
                  <div className='relative w-full h-full'>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].bgGradient} rounded-xl opacity-30`}></div>

                    {/* Feature Image */}
                    <div className='relative z-10 w-full h-full flex items-center justify-center'>
                      <img
                        src={features[activeFeature].image}
                        alt={features[activeFeature].title}
                        // width={300}
                        // height={300}
                        className='w-full h-96 object-cover transition-all duration-500 ease-in-out transform'
                        style={{
                          filter: 'brightness(1.1) contrast(1.1)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-gradient-to-br from-gray-50 to-white py-16'>
          <div className='mx-auto px-6 lg:px-[7%]' style={{ maxWidth: '1440px' }}>
            <div className='text-center mb-12'>
              <div className='inline-flex items-center gap-2 bg-purple/10 text-purple px-4 py-2 rounded-full text-sm font-semibold mb-6'>
                <span className='w-2 h-2 bg-purple rounded-full animate-pulse'></span>
                More Amazing Features
              </div>
              <h2 className='text-3xl md:text-4xl font-bold text-gray mb-4'>
                Join the <span className='text-purple'>Web3 Revolution</span>
              </h2>
              <p className='text-lg text-gray/70 max-w-2xl mx-auto'>
                Discover additional features that make Let&apos;s Build Academy the perfect choice for your Web3 learning journey.
              </p>
            </div>

            {/* Enhanced Feature Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
              {otherFeats.map((feat, index) => (
                <div
                  key={feat.id}
                  className='group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'
                >

                  {/* Icon */}
                  <div className='relative z-10 mb-6'>
                    <div className='w-16 h-16 bg-gradient-to-br from-purple/10 to-purple/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                      <span className='text-3xl'>{feat.icon}</span>
                    </div>
                    <h3 className='text-xl font-bold text-gray mb-3 group-hover:text-purple transition-colors'>{feat.title}</h3>
                    <p className='text-gray/70 leading-relaxed mb-6'>{feat.description}</p>
                  </div>



                  {/* CTA Button */}
                  <div className='relative z-10'>
                    <Link href={'/auth'}>
                      <button className='w-full bg-purple text-white px-6 py-3 rounded-full font-semibold hover:from-purple/90 hover:to-purple/70 transition-all duration-300 flex items-center justify-center gap-2 group'>
                        Get Started
                        <ArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />
                      </button>
                    </Link>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>
      </>
    </MainLayout >
  )
}
