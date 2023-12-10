import React from 'react';

const AdminSideNav = () => {
  return (
    <aside className='p-6 bg-white h-screen fixed w-[20%]'>
      <img src="/images/logo.png" alt="" />


      
      <div className='text-[#EB1515] flex mt-44'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EB1515" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
        <p className='ml-4'>Logout</p>
      </div>
    </aside>
  );
};

export default AdminSideNav;