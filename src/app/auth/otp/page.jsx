/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const Auth = () => {
  return (
    <div className="w-full bg-gray-200 justify-start items-center flex">
      <div className="w-1/2 md:flex justify-between items-center gap-4 inline-flex hidden">
        <img className="h-screen w-full object-cover" src={"/auth-img.png"} />
        {/* <Image src={"/auth-img.png"} alt="auth-img" width={650} height={200} /> */}
      </div>
      <div className="lg:w-1/2 lg:p-10 p-4">
        <div className="">
          <h1 className=" text-black text-3xl md:text-5xl font-bold font-['Poppins'] leading-[44px] md:leading-[64px]">
            OTP Verification
          </h1>
          <p className=" text-black text-sm font-normal">
            Check your email for a 6 digit code to contine.
          </p>
        </div>
        <div className="mt-10">
          <input type="text" placeholder="Code" className="p-3 rounded-md w-full" />

        </div>
        <div className="mt-10">
          <Link href={'/user'}><input type="button" value={"Verify"} className="p-3 text-white rounded-full bg-purple w-full" /></Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
