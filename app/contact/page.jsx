/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import MainLayout from '../_layouts/MainLayout';
import Hero from '../_components/Hero';

const contact = () => {
  return (
    <MainLayout>
      <section>
        <Hero text="Contact Us" />
        <div className='lg:w-[40%] sm:p-4 mx-auto my-10'>
          <h1 className='text-3xl my-3 font-bold text-center'>Leave us a message</h1>
          <p className='text-center'>We're here to help. Feel free to get in touch with us for any inquiries, course information, or assistance. Our team is ready to assist you on your tech education journey.</p>
          <input type="text" placeholder='Full Name' className='p-3 rounded-sm my-3 text-sm w-full border border-[#CECCCF]' />
          <input type="text" placeholder='Email Address' className='p-3 rounded-sm my-3 text-sm w-full border border-[#CECCCF]' />
          <textarea placeholder='Leave a message' className='h-40 p-3 rounded-sm my-3 text-sm w-full border border-[#CECCCF]'></textarea>
          <button className='p-3 rounded-sm my-3 bg-[#8F0FBA] text-white text-sm w-full'>Send Message</button>
        </div>
      </section>
    </MainLayout>
  );
};

export default contact;