import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import MentorStatCard from '../../components/cards/MentorStatCard';
import MentorCourse from '../../components/cards/MentorCourse';
import Link from 'next/link';

const Mentor = () => {
  return (
    <AdminLayout>
      <section className='my-6 lg:flex justify-between'>
        <div>
          <h1 className='text-4xl font-bold'>Hey Alabo 👋 </h1>
          <p className='text-sm'>Keep track of your courses!!!</p>
        </div>
        <Link href={'/mentor/new'}>
          <button className='bg-purple p-3 px-6 sm:mt-4 rounded-full text-white flex my-auto'>
            <p className='text-sm'>Add Course</p>
            <img className='h-3 w-3 my-auto ml-3' src="/images/icons/arrow-white.svg" alt="" />
          </button>
        </Link>
      </section>
      <section className='lg:flex justify-between'>
        <MentorStatCard text={"Total Users"} count={"300"} img={"#40196C"} color={"text-purple"} bg={"bg-[#E9CFF1]"} />
        <MentorStatCard text={"Graduated"} count={"50"} img={"#22A845"} color={"text-[#22A845]"} bg={"bg-[#22A8451A]"} />
        <MentorStatCard text={"Ongoing"} count={"150"} img={"#302C8B"} color={"text-[#302C8B]"} bg={"bg-[#302C8B1A]"} />
        <MentorStatCard text={"Not Active"} count={"100"} img={"#EB1C1C"} color={"text-[#EB1C1C]"} bg={"bg-[#EB1C1C1A]"} />

      </section>

      <section className='flex flex-wrap justify-between'>
        <MentorCourse />
      </section>
    </AdminLayout>
  );
};

export default Mentor;