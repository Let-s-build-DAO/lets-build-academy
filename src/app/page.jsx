'use client'
import MainLayout from '../components/layouts/MainLayout'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { collection, query, getDocs, getFirestore, where, limit } from "firebase/firestore";
import firebase_app from "../firebase/config";

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
        const courseList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(courseList);
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
        <section className="max-w-7xl mx-auto py-40 px-6 flex flex-col items-center justify-center">
          <div className="text-center w-full max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
              Build Your <span className="text-purple">Web3 Career</span> &amp; Join the <span className="text-purple">Global Builder Community</span>
            </h1>
            <p className="my-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Empower yourself with knowledge of Decentralized Web and Blockchain. Join thousands of builders learning the future of technology.
            </p>
            <div className="flex sm:flex-col flex-row gap-4 mt-10 justify-center items-center">
              <Link href={'/auth'}>
                <button className="p-4 rounded-full flex gap-2 items-center justify-center bg-purple text-white px-8 text-lg font-semibold shadow-lg hover:bg-purple/90 transition-colors">
                  Start Learning
                  <ArrowRight size={24} />
                </button>
              </Link>
              <Link href={'/courses'}>
                <button className="p-4 rounded-full flex gap-2 items-center justify-center border-2 text-purple border-purple font-semibold px-8 text-lg hover:bg-purple hover:text-white transition-colors">
                  Explore Courses
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className='bg-white py-16 px-6 my-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Featured Courses
              </h2>
              <p className='text-lg max-w-2xl mx-auto'>
                Master the latest Web3 technologies with our expert-crafted courses
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {loading ? (
                <div className="col-span-3 text-center py-12 text-gray-400">Loading courses...</div>
              ) : courses.length === 0 ? (
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

        <section className='bg-purple py-20'>
          <div className='max-w-7xl mx-auto px-6'>
            {/* Section Header */}
            <div className='text-center mb-16'>
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

        <section className='bg-gradient-to-br from-gray-50 to-white py-20'>
          <div className='max-w-7xl mx-auto px-6'>
            <div className='text-center mb-16'>
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
