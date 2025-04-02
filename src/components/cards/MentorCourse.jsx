import Link from 'next/link';
import React from 'react';

const MentorCourse = () => {
  return (
    <div className='bg-white rounded-md p-4 lg:w-[49%] my-3'>
      <div className='flex justify-between'>
        <div className='flex'>
          <img className='h-4 w-4 my-auto mx-4' src="../images/icons/local_library.svg" alt="" />
          <div className='my-auto w-44'>
            <h4 className='font-bold my-3 text-sm'>Learn Solidity</h4>
            <p className='text-xs my-3'>By Great Adams</p>
          </div>
        </div>
        <div className='w-40'>
          <h1 className='text-4xl font-bold'>100</h1>
          <p className='text-xs'>Erolled</p>
        </div>

      </div>
      <Link href={'/mentor/course/1'}>
        <button className='p-2 w-40 h-10 float-right my-auto bg-white border border-purple rounded-full text-purple text-sm px-6'>View</button>
      </Link>
    </div>
  );
};

export default MentorCourse;