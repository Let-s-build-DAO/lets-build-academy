/* eslint-disable @next/next/no-img-element */
import React from 'react';

const CommunitySection = () => {
  return (
    <div className='bg-purple relative ' >
      <img className='sm:h-[50vh] object-cover' src="/pattern.png" alt="" />
      <div className='lg:w-1/2 p-8 absolute lg:top-20 top-0 lg:p-10 text-center text-white left-0 right-0 mx-auto'>
        <h1 className='text-3xl font-bold'>Join Our Community</h1>
        <p className='my-4'>Ready to take the first step toward an exciting tech career? Join our community of learners and start your journey today.</p>
        <div>
          <button className='border border-white rounded-full mx-2 p-3 w-32'>Discord</button>
          <button className='border border-white rounded-full mx-2 p-3 w-32'>Telegram</button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;