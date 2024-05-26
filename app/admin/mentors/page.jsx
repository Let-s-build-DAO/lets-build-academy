import AdminLayout from '@/app/_layouts/AdminLayout';
import React from 'react';
import MentorData from '@/app/admin/mentors/MentorData';


const page = () => {
  return (
    <AdminLayout>
      <section>
        <div>
          <h1>Hey Admin</h1>
          <p>Keep track of your courses</p>
        </div>

        <div className='main'>
          <div className='stacks'>
            <div className='flex justify-between '>
              {MentorData.slice(0, 4).map((data, index) =>{
                return(
                  <SingleStackCard key={index} data = {data}/>
                )
              })}
            </div>
            <div className='flex justify-between'>
              {MentorData.slice(4, 8).map((data, index) =>{
                  return(
                    <SingleStackCard key={index} data = {data}/>
                  )
                })}
            </div>
            <div className='flex justify-between'>
              {MentorData.slice(8, 13).map((data, index) =>{
                  return(
                    <SingleStackCard key={index} data = {data}/>
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

const SingleStackCard = ({data}) => {
  return (
    <div className='bg-gray-300 item-center text-center m-10'>
      <div>
        <img src={data.image} alt={data.title} className='h-20 w-20'/>
      </div>
      <h2 className='font-bold'>{data.title}</h2>
      <p>Organizer</p>
    </div>
  );
}


