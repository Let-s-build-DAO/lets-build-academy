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
  const [user, setUser] = useAtom(userAtom)

  const getIn = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "usersProd", user.uid));
        if (userDoc.exists()) {
          setCookie('token', user.accessToken);
          setLoading(false)
          toast("Logged in Successfully!")
          const userRole = userDoc.data().role
        setUser({...userDoc.data(), id:user.uid})
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
          <div className="my-6">
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="p-3 rounded-md w-full" />
          </div>
          <div className='my-4'>
            <p>Dont have an account? <Link className='text-purple' href={'/auth'}>Signup</Link></p>
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