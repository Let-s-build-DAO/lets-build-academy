/* eslint-disable @next/next/no-img-element */
import React from 'react';
import CommunitySection from './CommunitySection';
import Link from 'next/link';

const MainFooter = () => {
  return (
    <div className='content'>
      <CommunitySection />
      <footer className='lg:m-20 m-4 lg:flex justify-between'>
        <div className='sm:my-4'>
          <img className='w-32' src="/academylogo.png" alt="" />
        </div>
        <div className='sm:my-4'>
          <h1 className='font-bold text-xl mb-3'>Quick Links</h1>
          <p className='text-sm my-2'>
            <Link href={'/'}>Home</Link>
          </p>
          <p className='text-sm my-2'>
            <Link href={'/about'}>About Us</Link>
          </p>
          <p className='text-sm my-2'>Courses</p>

          <p className='text-sm my-2'><Link href={'/contact'}>Contact Us</Link></p>
          <p className='text-sm my-2'>Community</p>
          <p className='text-sm my-2'>FAQs</p>
          <p className='text-sm my-2'>Privacy Policy</p>
          <p className='text-sm my-2'>Terms of Service</p>

        </div>
        <div className='sm:my-4'>
          <h1 className='font-bold mb-3 text-xl'>Connect with Us</h1>
          <div className='sm:w-1/2 flex justify-between'>
            <img className='w-7 h-7' src="/images/icons/facebook-square.png" alt="" />
            <img className='w-7 h-7' src="/images/icons/instagram.png" alt="" />
            <img className='w-7 h-7' src="/images/icons/twitter-square.png" alt="" />
            <img className='w-7 h-7' src="/images/icons/youtube-square.png" alt="" />
          </div>
        </div>
        <div className='sm:my-4'>
          <h1 className='font-bold mb-3 text-xl'>Subscribe to our Newsletter</h1>
          <input type="text" className='border sm:w-full p-2 rounded-md border-[#B3B3B4] text-sm' placeholder='Enter Email address' />
          <button className='p-2 sm:w-full bg-purple text-white lg:ml-2 sm:mt-2 rounded-full'>Send</button>
        </div>
      </footer>
      <div className='p-3 text-sm border-t border-[#B3B3B4] text-center'>Copyright © 2024 Lets build Labs. All rights reserved.</div>
    </div>
  );
};

export default MainFooter;