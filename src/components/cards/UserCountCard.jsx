import React from 'react';

const UserCountCard = ({ text, count }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-4 lg:w-full w-full'>
      <div className='flex justify-between'>
        <h3 className='text-sm w-32 capitalize font-bold'>{text}</h3>
        <h1 className='text-2xl font-bold'>{count}</h1>
      </div>
      <img className='ml-auto my-2' src="/images/metrics.png" alt="" />
    </div>
  );
};

export default UserCountCard;