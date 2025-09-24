/* eslint-disable @next/next/no-img-element */
import React from 'react';

const CommunitySection = () => {
  return (
    <div className='bg-purple relative min-h-[50vh] flex items-center justify-center'>
      <img className='absolute inset-0 w-full h-full object-cover' src="/pattern.png" alt="" />
      <div className='relative z-10 max-w-2xl p-8 lg:p-16 text-center text-white'>
        <h1 className='text-3xl font-bold'>Join Our Community</h1>
        <p className='my-4'>Ready to take the first step toward an exciting tech career? Join our community of learners and start your journey today.</p>
        <div className='flex flex-row sm:flex-col gap-4 justify-center items-center mt-6'>
          <a href="https://discord.gg/M9jx85nJkN">
            <button className='border border-white rounded-full px-6 py-3 w-44 hover:bg-white hover:text-purple transition-colors'>Discord</button>
          </a>
          <a href="https://t.me/letsbuilddaocommunity">
            <button className='border border-white rounded-full px-6 py-3 w-44 hover:bg-white hover:text-purple transition-colors'>Telegram</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;