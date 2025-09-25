'use client'

import React, { useState, useEffect } from 'react'
import AdminLayout from '@/src/components/layouts/AdminLayout';
import { collection, getDocs, addDoc, deleteDoc, doc, query, where, updateDoc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase_app from '../../../firebase/config';
import { getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import Spinner from '@/src/components/Spinner';
import Modal from '@/src/components/Modal';
import { useAtom } from "jotai";
import { userAtom } from "@/src/store";
import { Table } from "antd";

const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [user] = useAtom(userAtom);

  // Generate random password function
  const generateRandomPassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  // Fetch all admins from Firebase
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "users"), where("role", "==", "admin"));
      const querySnapshot = await getDocs(q);
      const adminsList = [];
      querySnapshot.forEach((doc) => {
        adminsList.push({ id: doc.id, ...doc.data() });
      });
      setAdmins(adminsList);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Add new admin
  const addAdmin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // Generate random password
      const generatedPassword = generateRandomPassword();

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        generatedPassword
      );

      const user = userCredential.user;

      // Add admin data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
        role: 'admin',
        id: user.uid,
        createdAt: new Date(),
        isActive: true
      });

      // Send email with credentials
      try {
        const emailResponse = await fetch('/api/sendAdminCredentials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: generatedPassword
          }),
        });

        if (emailResponse.ok) {
          toast.success(`Admin added successfully! Credentials sent to ${formData.email}`);
        } else {
          toast.success(`Admin added successfully! Password: ${generatedPassword} (Email failed to send)`);
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        toast.success(`Admin added successfully! Password: ${generatedPassword} (Email failed to send)`);
      }

      setFormData({ username: '', email: '', password: '', role: 'admin' });
      setShowAddForm(false);
      fetchAdmins(); // Refresh the list
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error(error.message || "Failed to add admin");
    } finally {
      setLoading(false);
    }
  };


  // Toggle admin status (activate/deactivate)
  const toggleAdminStatus = async (adminId, currentStatus) => {
    const action = currentStatus ? "deactivate" : "activate";
    
    // Check if user has permission to deactivate admins
    if (user?.email !== "alaboexcel@gmail.com") {
      toast.error("Only the super admin can deactivate admin accounts.");
      return;
    }
    
    if (window.confirm(`Are you sure you want to ${action} this admin?`)) {
      try {
        setLoading(true);
        const adminRef = doc(db, "users", adminId);
        await updateDoc(adminRef, {
          isActive: !currentStatus
        });
        toast.success(`Admin ${action}d successfully!`);
        fetchAdmins(); // Refresh the list
      } catch (error) {
        console.error(`Error ${action}ing admin:`, error);
        toast.error(`Failed to ${action} admin`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AdminLayout>
      <section className='my-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='lg:text-4xl text-2xl font-bold'>Admin Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className='bg-purple p-3 rounded-full lg:px-6 text-white hover:bg-purple/90 transition-colors'
          >
            Add New Admin
          </button>
        </div>

        {/* Add Admin Modal */}
        {showAddForm && (
          <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
            <div className=''>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-semibold'>Add New Admin</h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ username: '', email: '', password: '', role: 'admin' });
                  }}
                  className='text-gray-500 hover:text-gray-700 text-2xl font-bold'
                >
                  ×
                </button>
              </div>
              <form onSubmit={addAdmin} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Username
                  </label>
                  <input
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleInputChange}
                    className='w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple'
                    placeholder='Enter username'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple'
                    placeholder='Enter email'
                    required
                  />
                </div>
                <div className='text-sm text-gray-600 bg-gray-50 p-3 rounded-md'>
                  <p>A secure random password will be generated automatically when you create the admin account.</p>
                </div>
                <div className='flex gap-3 pt-4'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='flex-1 bg-purple text-white px-6 py-3 rounded-md hover:bg-purple/90 transition-colors disabled:opacity-50'
                  >
                    {loading ? <Spinner /> : 'Add Admin'}
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setShowAddForm(false);
                      setFormData({ username: '', email: '', password: '', role: 'admin' });
                    }}
                    className='flex-1 bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}

        {/* Admins List */}
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold'>All Admins ({admins.length})</h2>
          </div>

          {loading ? (
            <div className='p-8 text-center'>
              <Spinner />
            </div>
          ) : admins.length === 0 ? (
            <div className='p-8 text-center text-gray-500'>
              No admins found. Add your first admin using the button above.
            </div>
          ) : (
            <div className='bg-white rounded-lg shadow mb-8'>
              <Table
                columns={[{
                  title: 'Admin',
                  dataIndex: 'username',
                  key: 'username',
                  render: (text, admin) => (
                    <div className='flex items-center'>
                      <div className='h-10 w-10 rounded-full bg-purple flex items-center justify-center'>
                        <span className='text-white font-semibold'>{text?.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>{text}</div>
                        <div className='text-sm text-gray-500'>ID: {admin.id}</div>
                      </div>
                    </div>
                  ),
                }, {
                  title: 'Email',
                  dataIndex: 'email',
                  key: 'email',
                  render: (text) => text,
                }, {
                  title: 'Role',
                  dataIndex: 'role',
                  key: 'role',
                  render: (text) => (
                    <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800'>{text}</span>
                  ),
                }, {
                  title: 'Status',
                  dataIndex: 'isActive',
                  key: 'isActive',
                  render: (isActive) => (
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${isActive === false ? 'text-[#EB1515]' : 'text-[#008000]'}`}>
                      {isActive === false ? 'Inactive' : 'Active'}
                    </span>
                  ),
                }, {
                  title: 'Actions',
                  key: 'actions',
                  render: (_, admin) => (
                    admin.isActive === false ? (
                      <button
                        onClick={() => toggleAdminStatus(admin.id, admin.isActive)}
                        className='text-[#008000] transition-colors'
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleAdminStatus(admin.id, admin.isActive)}
                        className='text-[#EB1515] transition-colors'
                      >
                        Deactivate
                      </button>
                    )
                  ),
                }]}
                dataSource={admins}
                rowKey='id'
                pagination={{ pageSize: 10 }}
              />
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  )
}

export default Admins