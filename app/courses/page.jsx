import React from 'react';
import MainLayout from '../_layouts/MainLayout';
import Hero from '../_components/Hero';
import Link from 'next/link';
import Image from 'next/image'
import DisplayCourses from '../_components/cards/DisplayCourses';


const courses = () => {
  return (
    <MainLayout>
      <section>
        <Hero text="Our Premium Courses" />
        <section className='bg-purple lg:p-16 sm:py-16 p-4 content'>
          <div className='flex mb-8 justify-end'>
            <input type="text" placeholder='Search' className='bg-purple p-2 lg:w-[30%] w-full text-white border border-white rounded-md' />
          </div>
          <div className="lg:flex justify-between text-white px-4 ">
            <h1 className="font-bold text-2xl lg:w-52 lg:text-3xl">Explore Our Courses</h1>
            <Link href={"/courses"}>
              <div className='flex'>
                <p className="text-xs sm:text-lg">Explore All Courses </p>
                <img className='ml-3 w-4' src="/east.png" alt="" />
              </div>
            </Link>
          </div>
          <DisplayCourses />
          {/* <main className="flex sm:flex-col flex-wrap items-center justify-evenly sm:p-4 mt-12">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="first-div text-white mb-8 sm:mb-5">
                <Image src='/Rectangle 5.png' alt='Course Image' width={380} height={179} />
                <div className='flex mt-4'>
                  <div className='my-auto'>
                    <Image src='/Ellipse 1.png' alt='Instructor Image' width={40} height={50} />
                  </div>
                  <div className="ml-4">
                    <h1 className='font-medium'>Web 3 Development</h1>
                    <p className='text-sm'>Lets Build Academy</p>
                  </div>
                </div>
              </div>
            ))}
          </main> */}
        </section>
      </section>
    </MainLayout>
  );
};

export default courses;