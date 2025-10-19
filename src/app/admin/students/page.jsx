"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase_app from "../../../firebase/config";
import { Table } from "antd";

const db = getFirestore(firebase_app);

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      // Fetch from usersProd
      const userCol = collection(db, "usersProd");
      const snapshot = await getDocs(userCol);
      const prodStudents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch from users collection with role 'user'
      const usersCol = collection(db, "users");
      const usersSnapshot = await getDocs(usersCol);
      const usersStudents = usersSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "user");

      // Combine both lists
      const allStudents = [...prodStudents, ...usersStudents];

      // Sort by createdAt (newest first)
      const sortedStudents = allStudents.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return dateB - dateA; // descending order
      });

      setStudents(sortedStudents);
    }
    fetchStudents();
  }, []);

  // Ant Design Table columns
  const columns = [
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
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        if (!createdAt) return "-";
        const date =
          createdAt.toDate?.() || // Firestore Timestamp
          new Date(createdAt);   // fallback if it's already a string or number
        return date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, student) => (
        <button
          className="text-purple underline font-semibold hover:text-purple/80"
          onClick={() => { setSelectedStudent(student); setShowModal(true); }}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <section className="py-8 px-2 lg:px-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Students Management</h1>
        <div className="bg-white rounded-lg shadow">
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold'>All students ({students.length})</h2>
          </div>
          <Table
            columns={columns}
            dataSource={students}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>

        {/* Modal for student details */}
        {showModal && selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-purple text-xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-purple mb-4">Student Details</h2>
              <div className="space-y-2">
                <div><span className="font-semibold">Name:</span> {selectedStudent.username || "-"}</div>
                <div><span className="font-semibold">Email:</span> {selectedStudent.email || "-"}</div>
                <div><span className="font-semibold">Status:</span> {selectedStudent.status || "Active"}</div>
                <div><span className="font-semibold">ID:</span> {selectedStudent.id}</div>
                {/* Add more fields as needed */}
                {Object.entries(selectedStudent).map(([key, value]) => (
                  !["id", "username", "email", "status"].includes(key) && (
                    <div key={key}><span className="font-semibold">{key}:</span> {String(value)}</div>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default StudentsPage;
