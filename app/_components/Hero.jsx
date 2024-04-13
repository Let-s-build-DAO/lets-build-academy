/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Hero = ({ text }) => {
  return (
    <section className='relative' >
      <img className='lg:h-[80vh] h-[60vh] object-cover w-full' src="/BackgroundImage.jpg" alt="" />
      <div className="absolute z-10 lg:h-[80vh] top-0 w-full" >
        <div className='text-center absolute top-52 w-full mx-auto'>
          <h1 className='lg:text-5xl text-[#8F0FBA] text-3xl font-bold leading-tight'>{text}</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;