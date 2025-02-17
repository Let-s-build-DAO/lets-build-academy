/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Hero from '../../components/Hero';

const about = () => {
  return (
    <MainLayout>
      <section className='bg-white'>
        <Hero text="About Us" />
        <section className='content'>
          <div className="lg:flex lg:mr-20 lg:py-[100px] py-10">
            <div className="lg:w-[50%]">
              <img className='lg:h-[100vh] w-full object-cover' src='/images/abt1.png' />
            </div>
            <div className="lg:w-[50%] my-auto px-6 ">
              <h1 className="font-bold my-3 text-3xl ">Our Mission</h1>
              <div className="flex flex-wrap justify-between">
                <div className="shadow-md my-3 py-8 p-4 rounded-md">
                  <p className="text-lg">At Let’s Build Labs, our mission is to empower the next generation of tech innovators by providing cutting-edge education in web3 technologies, blockchain, and decentralized applications. We are committed to fostering a diverse and inclusive learning community where students of all backgrounds can access high-quality, hands-on training that equips them with the skills, knowledge, and confidence needed to excel in the rapidly evolving tech landscape. Through our unwavering dedication to excellence, innovation, and the pursuit of technological advancements, we aim to shape a future where our graduates lead the way in driving positive change and innovation in the digital world.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex lg:ml-20 lg:py-[100px]">
            <div className="lg:w-[50%] my-auto px-6 ">
              <h1 className="font-bold my-3 text-3xl text- ">Our Vision</h1>
              <div className="flex flex-wrap justify-between">
                <div className="shadow-md my-3 py-8 p-4 rounded-md">
                  <p className="text-lg">At Let’s Build Labs, our vision is to be a global leader in shaping the future of tech education. We envision a world where individuals from all walks of life have equal access to transformative learning experiences in web3 technologies, blockchain, and decentralized applications. Through innovation, collaboration, and a commitment to excellence, we aim to empower our students not only with technical skills but also with a mindset of creativity, adaptability, and ethical responsibility. We see a future where our graduates drive innovation, solve complex problems, and lead the way in building a more inclusive, decentralized, and technologically advanced society.</p>
                </div>
              </div>
            </div>
            <div className="lg:w-[50%]">
              <img className='lg:h-[100vh] w-full object-cover' src='/images/abt2.png' />
            </div>
          </div>
        </section>
      </section>
    </MainLayout>
  );
};

export default about;