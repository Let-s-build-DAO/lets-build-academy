import React from 'react';
import AdminHeader from '../_components/AdminHeader';
import AdminSideNav from '../_components/AdminSideNav';

const AdminLayout = ({ children }) => {
  return (
    <main>
      <div className='flex'>
        <AdminSideNav />
        <section className='w-[80%] ml-auto p-6'>
          <AdminHeader />
          <div>
            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminLayout;