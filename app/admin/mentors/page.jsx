import AdminLayout from '@/app/_layouts/AdminLayout';
import React from 'react';
import MentorData from '@/app/admin/mentors/MentorData';


const page = () => {
  return (
    <AdminLayout>
      <section>
        <div className='my-4'>
          <h1 className='text-4xl font-bold'>Hey Admin 👋 </h1>
          <p>Keep track of everything!</p>
        </div>
        <div className='main'>
          <div className='stacks'>
            <div className='lg:flex flex-wrap justify-between '>
              {MentorData.slice(0, 4).map((data, index) => {
                return (
                  <SingleStackCard key={index} data={data} />
                )
              })}
            </div>

          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default page;

const SingleStackCard = ({ data }) => {
  return (
    <div className='bg-white sm:w-full w-[24%] item-center text-center p-4 my-3 rounded-md'>
      <div>
        <img src={data.image} alt={data.title} className='h-20 mx-auto w-20' />
      </div>
      <h2 className='font-bold'>{data.title}</h2>
      <p>Organizer</p>
    </div>
  );
}


