"use client"
import Link from "next/link";
import { useState } from "react";


const PersonalInfo = () => {
  const [next, setNext] = useState(false)

  return (
    <div className="w-full bg-gray-200 justify-start items-center overflow-hidden flex">
      <div className="w-1/2 md:flex justify-between items-center gap-4 inline-flex hidden">
        <img className="h-screen w-full object-cover" src={"/auth-img.png"} />
      </div>
      <div className="lg:w-1/2 p-10">
        <div className="">
          <h1 className="lg:w-[468px] text-black text-3xl md:text-5xl font-bold font-['Poppins'] leading-[44px] md:leading-[64px]">
            Personal Details
          </h1>
          <p className=" text-black text-sm font-normal">
            Drop the below information for further verification.
          </p>
        </div>
        {
          next ? <div className="mt-10">
            <div>
              <textarea className="p-3 w-full h-32 rounded-md" placeholder="Tell us about yourself"></textarea>
              <div className="my-6">
                <Link href={'/auth/otp'}>
                  <button className="bg-purple rounded-md w-full text-white p-3">Continue</button>
                </Link>
              </div>
            </div>
          </div> : <div className="mt-10">
            <div className="flex my-6 justify-between">
              <input type="text" placeholder="First Name" className="p-3 rounded-md w-[49%]" />
              <input type="text" placeholder="Last Name" className="p-3 rounded-md w-[49%]" />
            </div>
            <div className="my-6">
              <input type="text" placeholder="Username" className="p-3 rounded-md w-full" />
            </div>
            <div className="my-6">
              <input type="text" placeholder="Email Address" className="p-3 rounded-md w-full" />
            </div>
            <div className="my-6">
              <button onClick={() => setNext(true)} className="bg-purple rounded-md w-full text-white p-3">Next</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default PersonalInfo;
