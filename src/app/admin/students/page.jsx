"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase_app from "../../../firebase/config";

const db = getFirestore(firebase_app);

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      const userCol = collection(db, "usersProd");
      const snapshot = await getDocs(userCol);
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchStudents();
  }, []);

  return (
    <AdminLayout>
      <section className="py-8 px-2 lg:px-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">All Students</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.username || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.email || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.status || "Active"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-purple underline font-semibold hover:text-purple/80"
                      onClick={() => { setSelectedStudent(student); setShowModal(true); }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for student details */}
        {showModal && selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
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
