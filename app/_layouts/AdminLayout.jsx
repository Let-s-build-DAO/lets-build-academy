import React from 'react';
import AdminHeader from '../_components/AdminHeader';
import AdminSideNav from '../_components/AdminSideNav';

const AdminLayout = ({ children, header }) => {
  return (
    <div className='flex'>
      <AdminSideNav />
      <section className='w-[80%] ml-auto p-6'>
        {header !== false && <AdminHeader />}
        <div>
          {children}
        </div>
      </section>
    </div>
  );
};

export default AdminLayout;