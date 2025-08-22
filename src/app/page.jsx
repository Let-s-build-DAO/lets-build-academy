'use client'
import MainLayout from '../components/layouts/MainLayout'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      id: 0,
      icon: '🎯',
      title: 'Interactive Learning',
      description: 'Hands-on coding exercises, real-world projects, and interactive simulations that make learning Web3 engaging and practical.',
      image: '/images/abt1.png',
      bgGradient: 'from-blue-400/20 to-blue-600/40'
    },

    {
      id: 1,
      icon: '🚀',
      title: 'Real-World Projects',
      description: 'Build actual DApps, smart contracts, and blockchain solutions that you can showcase in your portfolio.',
      image: '/images/academy.png',
      bgGradient: 'from-purple-400/20 to-purple-600/40'
    },
    {
      id: 3,
      icon: '🤝',
      title: 'Community Support',
      description: 'Join a vibrant community of builders, get help when stuck, and collaborate on exciting Web3 projects.',
      image: '/images/user.png',
      bgGradient: 'from-orange-400/20 to-red-500/40'
    },

  ]

  const otherFeats = [
    {
      id: 0,
      icon: '👨‍🏫',
      title: 'Expert Instructors',
      description: 'Learn from industry veterans and blockchain pioneers who have built successful Web3 projects and companies.',
      image: '/images/abt2.png',
      bgGradient: 'from-green-400/20 to-green-600/40'
    },
    {
      id: 1,
      icon: '🏆',
      title: 'NFT Certificates',
      description: 'Earn verifiable NFT certificates stored on-chain that prove your Web3 skills to employers and the community.',
      image: '/images/metrics.png',
      bgGradient: 'from-yellow-400/20 to-orange-500/40'
    },
    {
      id: 2,
      icon: '💼',
      title: 'Career Support',
      description: 'Get guidance on career transitions, job placements, and connections with top Web3 companies hiring developers.',
      image: '/images/deso.png',
      bgGradient: 'from-indigo-400/20 to-purple-600/40'
    }
  ]


  return (
    <MainLayout>
      <>
        <section className='max-w-7xl mx-auto py-20 lg:py-40 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          <div className='sm:mt-10'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>
              Unlock the <span className='text-purple'>Future</span> of Learning with <span className='text-purple'>Web3 Technology</span>
            </h1>
            <p className='my-4 text-base lg:text-lg text-gray/80 max-w-xl'>
              Empower yourself with knowledge of Decentralized Web and Blockchain
            </p>

            <div className='flex flex-row sm:flex-col gap-4 mt-8'>
              <button className='p-3 rounded-full flex gap-2 items-center justify-center bg-purple text-white px-6 hover:bg-purple/90 transition-colors'>
                Start Learning
                <ArrowRight size={20} />
              </button>
              <button className='p-3 rounded-full flex gap-2 items-center justify-center border-2 text-purple border-purple font-semibold px-6 hover:bg-purple hover:text-white transition-colors'>
                Explore Courses
              </button>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className=''>
            <div className='bg-gradient-to-br from-purple/10 to-blue-50 rounded-2xl p-8 lg:p-12 text-center'>
              <div className='w-24 h-24 lg:w-32 lg:h-32 bg-purple rounded-full mx-auto mb-6 flex items-center justify-center'>
                <span className='text-white text-2xl lg:text-3xl font-bold'>🚀</span>
              </div>
              <h3 className='text-lg lg:text-xl font-semibold text-gray mb-2'>Start Your Web3 Journey</h3>
              <p className='text-sm lg:text-base text-gray/70'>Join thousands of builders learning the future of technology</p>
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
              {[1, 2, 3, 4, 5, 6].map(item => <div key={item} className='rounded-xl p-6 border border-purple/10 hover:border-purple/30 transition-all duration-300 hover:shadow-lg group' >
                <div className='relative mb-6'>
                  <div className='w-full h-48 bg-gradient-to-br from-purple/20 to-purple/40 rounded-lg flex items-center justify-center'>
                    <span className='text-4xl'>🔗</span>
                  </div>
                  {/* <div className='absolute top-4 right-4 bg-purple text-white px-3 py-1 rounded-full text-sm font-semibold'>
                    New
                  </div> */}
                </div>

                <div className='mb-4'>
                  <h3 className='text-xl font-bold text-gray mb-2 group-hover:text-purple transition-colors'>
                    Blockchain Fundamentals
                  </h3>
                  <p className='text-gray/70 text-sm mb-3'>
                    Learn the core concepts of blockchain technology and how it&apos;s revolutionizing the digital world.
                  </p>
                  <div className='flex items-center gap-2 text-sm text-gray/60 mb-2'>
                    <span>By Sarah Johnson</span>
                  </div>
                  <div className='flex items-center gap-4 text-sm text-gray/60'>
                    <span className='flex items-center gap-1'>
                      📚 12 Lessons
                    </span>
                    {/* <span className='flex items-center gap-1'>
                      ⏱️ 8 hours
                    </span> */}
                  </div>
                </div>

                <button className='w-full bg-purple text-white py-3 rounded-lg font-semibold hover:bg-purple/90 transition-colors flex items-center justify-center gap-2 group'>
                  Start Learning
                  <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />
                </button>
              </div>
              )}
            </div>

            {/* View All Courses Button */}
            <div className='text-center mt-12'>
              <Link href='/courses'>
                <button className='bg-transparent border-2 border-purple text-purple px-8 py-3 rounded-lg font-semibold hover:bg-purple hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto'>
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
                    className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 group cursor-pointer border-2 border-white/20 ${activeFeature === index
                      ? 'bg-white/20 border-white/40 scale-105'
                      : 'hover:bg-white/15'
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
                <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-96 flex items-center justify-center overflow-hidden'>
                  <div className='relative w-full h-full'>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].bgGradient} rounded-xl opacity-30`}></div>

                    {/* Feature Image */}
                    <div className='relative z-10 w-full h-full flex items-center justify-center'>
                      <Image
                        src={features[activeFeature].image}
                        alt={features[activeFeature].title}
                        width={300}
                        height={300}
                        className='max-w-full max-h-full object-contain transition-all duration-500 ease-in-out transform'
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

        <section>
          <div className='max-w-7xl mx-auto py-20 px-6'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Join the <span className=''>Web3 Revolution</span>
              </h2>
              <p className='text-lg max-w-2xl mx-auto'>
                Sign up today and start building the future of the internet.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
              {otherFeats.map((feat) => (
                <div key={feat.id} className='p-6 bg-white rounded-2xl shadow-md'>
                  <h3 className='text-lg font-bold mb-2'>{feat.title}</h3>
                  <p className='text-gray mb-4'>{feat.description}</p>
                  <Link href={'/auth'}>
                    <button className='bg-purple text-white px-4 py-2 rounded-full font-semibold hover:bg-purple/80 transition-all duration-300'>
                      Learn More
                    </button>
                  </Link>
                </div>
              ))}
            </div>


            <div className='text-center'>
              <Link href='/auth'>
                <button className='bg-purple text-white px-8 py-3 rounded-full font-semibold hover:bg-purple/80 transition-all duration-300'>
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </section>
      </>
    </MainLayout >
  )
}
