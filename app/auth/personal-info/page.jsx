"use client"

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase_app from "../../firebase/config";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation'
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const PersonalInfo = () => {
  const router = useRouter()
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [info, setInfo] = useState("")
  const address = getCookie('address')

  const signUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          wallet: address,
          info: info,
          role: 'user'
        });
        deleteCookie('address')
        router.push(`/auth/login`)
      })
      .catch((error) => {
        console.log(error.message)
      });
  }

  return (
    <div className="w-full bg-gray-200 justify-start items-center overflow-hidden flex">
      <div className="w-1/2 md:flex justify-between items-center gap-4 inline-flex hidden">
        <img className="h-screen w-full object-cover" src={"/auth-img.png"} />
      </div>
      <div className="lg:w-1/2 w-full lg:p-10 p-4">
        <div className="">
          <h1 className="text-black text-3xl md:text-5xl font-bold font-['Poppins'] leading-[44px] md:leading-[64px]">
            Personal Details
          </h1>
          {/* <p className=" text-black text-sm font-normal">
            Drop the below information for further verification.
          </p> */}
        </div>
        <div className="mt-10">
          {/* <div>
              <div className="my-6">
                <Link href={'/auth/otp'}>
                  <button className="bg-purple rounded-md w-full text-white p-3">Continue</button>
                </Link>
              </div>
            </div> */}
        </div> <div className="mt-10">
          {/* <div className="lg:flex my-6 justify-between">
              <input type="text" placeholder="First Name" className="p-3 rounded-md lg:w-[49%] w-full" />
              <input type="text" placeholder="Last Name" className="p-3 sm:mt-6 rounded-md lg:w-[49%] w-full" />
            </div> */}
          <div className="my-6">
            <input onChange={e => setUsername(e.target.value)} value={username} type="text" placeholder="Username" className="p-3 rounded-md w-full" />
          </div>
          <div className="my-6">
            <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email Address" className="p-3 rounded-md w-full" />
          </div>
          <div className="my-6">
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="p-3 rounded-md w-full" />
          </div>
          <div className="my-6">
            <textarea onChange={e => setInfo(e.target.value)} value={info} className="p-3 w-full h-32 rounded-md" placeholder="Tell us about yourself"></textarea>
          </div>
          <div className="my-6">
            <button onClick={() => signUp()} className="bg-purple rounded-md w-full text-white p-3">Sign Up</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PersonalInfo;
