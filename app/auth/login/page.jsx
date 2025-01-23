"use client"

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase_app from "../../firebase/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next';
import Link from 'next/link'
import Spinner from '@/app/_components/Spinner';
import { useAtom } from 'jotai'

import { toast } from 'react-toastify';
import { userAtom } from '@/app/store';

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useAtom(userAtom)

  const getIn = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCookie('token', user.accessToken);
          setLoading(false)
          toast("Logged in Successfully!")
          const userRole = userDoc.data().role
          setUser({ ...userDoc.data(), id: user.uid })
          console.log("User data:", userDoc.data());
          router.push(`/${userRole}`)

        } else {
          setLoading(false)
          toast.error("User does not exist.")
          console.log("No such document!");
          router.push('/auth')
        }
      })
      .catch((error) => {
        toast.error(error.message)
        console.log(error.message)
        setLoading(false)
      });
  }

  return (
    <div>
      <div className="lg:w-1/2 w-[95%] mx-auto my-20 lg:p-10 p-4">
        <div className="">
          <h1 className="lg:w-[468px] text-black text-3xl md:text-5xl font-bold font-['Poppins'] leading-[44px] md:leading-[64px]">
            Login
          </h1>
          <p className=" text-black text-sm font-normal">
            Begin your decentralized journey!
          </p>
        </div>
        <div className="mt-10">
          <div className="my-6">
            <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email Address" className="p-3 rounded-md w-full" />
          </div>
          <div className="my-6 relative">
            <input onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Password" className="p-3 rounded-md w-full" />
            <div onClick={() => setShowPassword(!showPassword)} className='absolute cursor-pointer top-4 right-4'>
              {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>}
            </div>
          </div>
          <div className='my-4 flex justify-between'>
            <p>Dont have an account? <Link className='text-purple' href={'/auth'}>Signup</Link></p>
            <div className=''>
              <p><Link className='text-purple' href={'/auth/forgot-password'}>Forgot Password? </Link></p>
            </div>
          </div>

          <div className="my-6">
            <button onClick={() => getIn()} className="bg-purple rounded-md w-full text-white p-3">{loading ? <Spinner /> : 'Login'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;