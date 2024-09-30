"use client"

import React,{ useState, useEffect }  from 'react';
import AdminLayout from '../_layouts/AdminLayout';
import MentorStatCard from '../_components/cards/MentorStatCard';
import firebase_app from '@/app/firebase/config';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

const Mentor = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    graduated: 0,
    ongoing: 0,
    notActive: 0,
    totalMentors: 0,
    totalCourses: 0,
    topRatedMentor: ''
  });

  async function getData() {
    const  usercol= collection(db, 'usersProd');
    const citySnapshot = await getDocs(usercol);
    const userList = citySnapshot.docs.map(doc => doc.data());

    setStats(prevStats => ({...prevStats,totalStudents: userList.length}));
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <AdminLayout>
      <section>
        <div className='my-4'>
          <h1 className='text-4xl font-bold'>Hey Admin 👋 </h1>
          <p>Keep track of everything!</p>
        </div>
        <section className='lg:flex flex-wrap mt-4 justify-between'>
          <MentorStatCard text={"Total Students"} count={stats.totalStudents} img={"#40196C"} color={"text-purple"} bg={"bg-[#E9CFF1]"} />
          <MentorStatCard text={"Graduated"} count={stats.graduated} img={"#22A845"} color={"text-[#22A845]"} bg={"bg-[#22A8451A]"} />
          <MentorStatCard text={"Ongoing"} count={stats.ongoing} img={"#302C8B"} color={"text-[#302C8B]"} bg={"bg-[#302C8B1A]"} />
          <MentorStatCard text={"Not Active"} count={stats.notActive} img={"#EB1C1C"} color={"text-[#EB1C1C]"} bg={"bg-[#EB1C1C1A]"} />
        </section>
        <div className='lg:flex justify-between mt-4'>
          <MentorStatCard text={"Total Mentors"} count={stats.totalMentors} img={"#302C8B"} color={"text-[#302C8B]"} bg={"bg-[#302C8B1A]"} />
          <MentorStatCard text={"Total Courses"} count={stats.totalCourses} img={"#40196C"} color={"text-[#40196C]"} bg={"bg-[#E9CFF1]"} />

          <div className='lg:w-[49%] flex justify-between bg-[#22A8451A] rounded-md p-4 sm:my-3'>
            <div>
              <p className='text-[#22A845]'>Top Rated Mentor</p>
              <p className='text-2xl my-6 font-bold text-[#22A845]'>Great Adams</p>
            </div>
            <img src="/images/user.png" className='w-20 h-20 my-auto' alt="" />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Mentor;