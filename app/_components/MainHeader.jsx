"use client"

import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

const MainHeader = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="flex z-50 fixed justify-between top-0 w-full items-center lg:px-24 px-4 py-4 ">
        <img src="/logo.png" className='w-32' alt="" />
        <nav className='lg:flex hidden justify-between'>
          <ul className="flex my-auto">
            <li className="mr-6 text-black"> <Link href={'/'}>Home</Link> </li>
            <li className="mr-6">Courses</li>
            <li className="mr-6"><Link href={'/about'}>About Us</Link></li>
            <li><Link href={'/contact'}>Contact Us</Link></li>
          </ul>
          <Link href={'/auth'}>
            <button className='bg-custom-purple text-white font-medium p-2 px-8 rounded-md ml-5'>Connect Wallet</button>
          </Link>
        </nav>
        <button onClick={() => setOpen(!open)} className='bg-primary h-10 w-10 my-auto lg:hidden block'>
          <img src="/images/icons/menu.png" className='w-8 h-8 mx-auto' alt="" />
        </button>
      </header>
      {open &&
        <div className='fixed z-50 top-24 left-0 right-0 p-6 bg-[#8F0FBA] text-white w-[90%] mx-auto rounded-md'>
          <p onClick={() => setOpen(!open)} className="float-right text-4xl cursor-pointer">&times;</p>

          <p className='my-4 mt-20 font-bold'>
            <Link href={'/'}>Home</Link>
          </p>
          <p className='my-4 font-bold'><Link href={'/about'}>About Us</Link></p>
          <p className='my-4 font-bold'>Courses</p>
          <p className='my-4 font-bold'><Link href={'/contact'}>Contact</Link></p>
          <button className='bg-white text-[#8F0FBA] font-medium p-2 px-8 rounded-md w-full'>Connect Wallet</button>
        </div>
      }
    </>
  );
};

export default MainHeader;