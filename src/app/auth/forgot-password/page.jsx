'use client';

import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Spinner from '@/src/components/Spinner';
import firebase_app from "../../../firebase/config";
import Link from 'next/link'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    const auth = getAuth(firebase_app);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent successfully! Check your Email and spam folder.');
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-1/2 w-[95%] mx-auto my-20 lg:p-10 p-4">
      <div className="">
        <h1 className="lg:w-[468px] text-black text-3xl md:text-5xl font-bold font-['Poppins'] leading-[44px] md:leading-[64px]">
          Forgot Password
        </h1>
      </div>
      <div className="mt-10">
        <div className="my-6">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="p-3 rounded-md w-full"
            value={email}
          />
        </div>
      </div>
      {message && <p className="text-green-500 text-sm my-2">{message}</p>}
      {error && <p className="text-red-500 text-sm my-2">{error}</p>}
      <div className="my-6">
        <button
          onClick={handlePasswordReset}
          className="bg-purple rounded-full w-full text-white p-3"
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Reset Password'}
        </button>
      </div>

      <div className='my-4 flex justify-between'>
        <p>Back to <Link className='text-purple' href={'/auth/login'}>Login</Link></p>
      </div>
    </div>
  );
};

export default ForgotPassword;
