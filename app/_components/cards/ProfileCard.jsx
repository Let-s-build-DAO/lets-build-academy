import React from 'react';

const ProfileCard = () => {
  return (
    <div className='bg-white h-auto rounded-md p-4'>
      <h3 className='text-sm font-bold'>Profile</h3>
      <img src="/images/user.png" className='mx-auto w-32' alt="" />
      <p className='flex justify-center my-4 font-bold text-sm'>Alabo Excel <img className='w-4 h-4 my-auto mx-2' src="./images/icons/verified.svg" alt="" /></p>
    </div>
  );
};

export default ProfileCard;