import React from 'react';
import AdminLayout from '../../_layouts/AdminLayout';
import ProfileCard from '../../_components/cards/ProfileCard';

const Profile = () => {
  return (
    <AdminLayout>
      <section className='flex mt-8'>
        <div className='w-[70%]'>
          <h1 className='text-4xl font-bold'>Profile Details</h1>
          <div className='my-2'>
            <label className='text-sm'>First Name</label>
            <input type="text" className='p-3 my-1 bg-white w-full rounded-md' />
          </div>
          <div className='my-2'>
            <label className='text-sm'>Last Name</label>
            <input type="text" className='p-3 my-1 bg-white w-full rounded-md' />
          </div>
          <div className='my-2'>
            <label className='text-sm'>Username</label>
            <input type="text" className='p-3 my-1 bg-white w-full rounded-md' />
          </div>
          <div className='my-2'>
            <label className='text-sm'>Email</label>
            <input type="email" className='p-3 my-1 bg-white w-full rounded-md' />
          </div>
          <div className='my-2'>
            <label className='text-sm'>Bio</label>
            <textarea className='p-3 my-1 bg-white w-full rounded-md'></textarea>
          </div>
          <div className='my-2'>
            <button className='w-full bg-purple rounded-md text-sm p-3 text-white'>Save</button>
          </div>
        </div>
        <div className='w-[30%] ml-6'>
          <ProfileCard />
          <div className='bg-[#CECCCF] text-[#848086] flex my-3 rounded-md'>
            <p className='p-3 text-xs w-80 '>https://twitter.com/</p>
            <input className='w-full rounded-r-md' type="text" />
          </div>
          <div className='bg-[#CECCCF] text-[#848086] flex my-3 rounded-md'>
            <p className='p-3 text-xs w-80'>https://instagram.com/</p>
            <input className='w-full rounded-r-md' type="text" />
          </div>
          <div className='bg-[#CECCCF] text-[#848086] flex my-3 rounded-md'>
            <p className='p-3 text-xs w-80 '>https://github.com/</p>
            <input className='w-full rounded-r-md' type="text" />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Profile;