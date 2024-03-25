import React from 'react';
import AdminLayout from '../_layouts/AdminLayout';
import { Progress } from 'antd';
import UserCountCard from '../_components/cards/UserCountCard';
import ProfileCard from '../_components/cards/ProfileCard';
import Link from 'next/link';

const Dashboard = () => {
  const twoColors = { '0%': '#8F0FBA', '100%': '#8F0FBA' };

  return (
    <AdminLayout>
      <section className='my-6 flex justify-between'>
        <div>
          <h1 className='text-4xl font-bold'>Hey Alabo 👋 </h1>
          <p className='text-sm'>Let’s Learn something new today!!</p>
        </div>
        <Link href={'/user/courses '}>
          <button className='text-purple flex my-auto'>
            <p className='text-sm'>Courses</p>
            <img className='h-3 w-3 my-auto ml-3' src="./images/icons/arrow.svg" alt="" />
          </button>
        </Link>
      </section>
      <section className='flex'>
        <div className='w-[75%]'>
          <div className='p-4 flex justify-between bg-white rounded-md mb-3'>
            <div className='flex'>
              <img className='h-4 w-4 my-auto mx-4' src="./images/icons/local_library.svg" alt="" />
              <div className='my-auto w-44'>
                <h4 className='font-bold my-3 text-sm'>Learn Solidity</h4>
                <p className='text-xs my-3'>By Great Adams</p>
              </div>
              <Progress type="circle" percent={90} strokeColor={twoColors} size={70} />
            </div>
            <button className='p-3 h-12 my-auto px-6 bg-purple text-white rounded-md '>
              Continue
            </button>
          </div>
          <div className='my-3 flex justify-between'>
            <UserCountCard text={"Total Courses"} count={"50"} />
            <UserCountCard text={"Completed Courses"} count={"19"} />
            <UserCountCard text={"Courses in progress"} count={"22"} />
          </div>
          <div className='my-3 bg-white p-4 rounded-md'>
            <h3 className='text-sm mb-4 font-bold'>Leaderboard</h3>
            <table className='w-full'>
              <tr className='text-sm text-[#5C555E]'>
                <th className='w-40'>Rank</th>
                <th>Name</th>
                <th className='text-center'>Percentage</th>
              </tr>
              {/* <tbody> */}
              <tr className='text-sm'>
                <td className='py-4'>1</td>
                <td className='font-bold'>Sunday Kingsley Uchenna</td>
                <td className='text-purple text-center'>95%</td>
              </tr>
              <tr className='text-sm'>
                <td className='py-2'>1</td>
                <td className='font-bold'>Sunday Kingsley Uchenna</td>
                <td className='text-purple text-center'>95%</td>
              </tr>
              <tr className='text-sm'>
                <td className='py-2'>1</td>
                <td className='font-bold'>Sunday Kingsley Uchenna</td>
                <td className='text-purple text-center'>95%</td>
              </tr>
              {/* </tbody> */}
            </table>
          </div>
        </div>
        <div className='w-[25%] ml-4'>
          <ProfileCard />
          <div className='mt-4 bg-white p-4 rounded-md'>
            <h3 className='text-sm font-bold'>Performance</h3>

            <div className='flex my-4 justify-between'>
              <img className='w-6 h-6 my-auto' src="./images/disappointed-face.png" alt="" />
              <Progress type="dashboard" percent={75} strokeColor={twoColors} />
              <img className='w-6 h-6 my-auto' src="./images/savouring-food.png" alt="" />
            </div>
            <p className='text-xs text-center'>Your Progress: 80%</p>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Dashboard;