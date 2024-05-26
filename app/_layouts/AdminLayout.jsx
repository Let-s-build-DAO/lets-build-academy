'use client'

import React, { useState } from 'react';
import AdminHeader from '../_components/AdminHeader';
import AdminSideNav from '../_components/AdminSideNav';

const AdminLayout = ({ children, header }) => {
  const [showBar, setShowBar] = useState(true)
  return (
    <div className='lg:flex'>
      <div className={showBar ? 'block ' : 'hidden'}>
        <AdminSideNav setShowBar={() => setShowBar(false)} />
      </div>
      <section className='lg:w-[80%] lg:ml-auto lg:p-6 p-4'>
        <div className='sm:flex w-full justify-between'>
          <button onClick={() => setShowBar(true)} className='lg:hidden block bg-white h-10 w-10 mr-3 my-auto'>
            <img src="/images/icons/menu.png" className='w-8 h-8 mx-auto' alt="" />
          </button>
          {header !== false && <AdminHeader />}
        </div>
        <div>
          {children}
        </div>
      </section>
    </div>
  );
};

export default AdminLayout;