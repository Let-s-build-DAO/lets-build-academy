import React from 'react';

const AdminHeader = () => {
  return (
    <header>
      <div className='flex lg:justify-end'>
        <div className='flex justify-between lg:w-[40%]'>
          <div className='relative'>
            <input placeholder='Search' type="text" className='p-3 sm:w-[80%] bg-white rounded-md text-sm pl-10' />
            <img className='absolute w-5 h-5 top-3 left-2' src="/images/icons/search.svg" alt="" />
          </div>
          <div className='bg-white sm:mr-3 h-[45px] p-3 rounded-md'>
            <img className=' w-5 h-5' src="/images/icons/message.svg" alt="" />
          </div>
          <div className='bg-white h-[45px] p-3 rounded-md'>
            <img src="/images/icons/notifications.svg" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;