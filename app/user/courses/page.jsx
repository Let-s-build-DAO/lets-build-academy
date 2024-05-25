import CoursesCard from '@/app/_components/cards/CoursesCard';
import AdminLayout from '@/app/_layouts/AdminLayout';
import React from 'react';

const Courses = () => {
  return (
    <AdminLayout >
      <section className='my-6 lg:flex justify-between'>
        <div className='lg:w-96'>
          <h1 className='text-4xl font-bold'>Hey Alabo 👋 </h1>
          <p className='text-sm'>To gain access to all courses purchase our NFT’s and enjoy premium learning experience</p>
        </div>
        <button className='bg-purple p-3 sm:mt-4 rounded-md text-white flex my-auto'>
          <p className='text-sm'>Mint our NFT</p>
          <img className='h-3 w-3 my-auto ml-3' src="../images/icons/arrow-white.svg" alt="" />
        </button>
      </section>
      <section>
        <div className='flex flex-wrap justify-between'>
          <CoursesCard />
          <CoursesCard />
          <CoursesCard />
        </div>
      </section>
    </AdminLayout>
  );
};

export default Courses;