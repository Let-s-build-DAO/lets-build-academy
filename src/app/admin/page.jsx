"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import MentorStatCard from "../../components/cards/MentorStatCard";
import firebase_app from "../../firebase/config";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { Table } from "antd";

const db = getFirestore(firebase_app);

const Mentor = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalMentors: 0,
    totalCourses: 0,
  });

  const [students, setStudents] = useState([]);
  async function getData() {
    const usercol = collection(db, "usersProd");
    const citySnapshot = await getDocs(usercol);
    const courseList = collection(db, "courses");
    const courses = await getDocs(courseList);
    const totalCourses = courses.docs.map((doc) => doc.data());
    const userList = citySnapshot.docs.map((doc) => doc.data());

    // Fetch admins (mentors)
    const adminQuery = query(collection(db, "users"), where("role", "==", "admin"));
    const adminSnapshot = await getDocs(adminQuery);
    const mentorsList = adminSnapshot.docs.map(doc => doc.data());

    // Fetch users with role 'user' from 'users' collection
    const usersQuery = query(collection(db, "users"), where("role", "==", "user"));
    const usersSnapshot = await getDocs(usersQuery);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Combine students from usersProd and users with role 'user'
    const allStudents = [
      ...citySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      ...usersList
    ];

    setStats((prevStats) => ({
      ...prevStats,
      totalStudents: allStudents.length,
      totalCourses: totalCourses.length,
      totalMentors: mentorsList.length
    }));
    setStudents(allStudents);
  }



  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminLayout>
      <section>
        <div className="my-4">
          <h1 className="text-4xl font-bold">Hey Admin 👋 </h1>
          <p className="mt-5">Keep track of your courses!</p>
        </div>
        <section className="grid lg:grid-cols-3 mt-8 gap-4">
          <MentorStatCard
            text={"Total Students"}
            count={stats.totalStudents}
            img={"#40196C"}
            color={"text-purple"}
            bg={"bg-[#E9CFF1]"}
          />
          <MentorStatCard
            text={"Total Mentors"}
            count={stats.totalMentors}
            img={"#23a14dff"}
            color={"text-[#23a14dff]"}
            bg={"bg-[#1ceb61ff]/20"}
          />
          <MentorStatCard
            text={"Total Courses"}
            count={stats.totalCourses}
            img={"#3d196cff"}
            color={"text-[#3d196cff]"}
            bg={"bg-[#E9CFF1]/20"}
          />
        </section>

        <hr className="my-10 border-purple/20" />
        <div className="flex justify-between mb-4 mt-8">
          <h2 className="text-xl font-bold">Students Overview</h2>

          <a href="/admin/students" className="text-purple underline">View All Students</a>
        </div>
        <div className="bg-white rounded-lg shadow mb-8">
          <Table
            columns={[
              {
                title: "Name",
                dataIndex: "username",
                key: "username",
                render: (text) => text || "-",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
                render: (text) => text || "-",
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (text) => text || "Active",
              },
            ]}
            dataSource={students.slice(0, 5)}
            rowKey="id"
            pagination={false}
          />
        </div>
      </section>
    </AdminLayout>
  );
};

export default Mentor;
