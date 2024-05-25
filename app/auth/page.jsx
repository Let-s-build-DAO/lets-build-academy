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
            Connect Your <br />
            wallet
          </h1>
          <p className=" text-black text-sm font-normal">
            Choose your preferred blockchain and connect your on-chain Identity.
          </p>
        </div>
        <div className="mt-10">
          <h3 className="text-black text-lg font-bold font-['Poppins'] leading-loose">
            Blockchain
          </h3>
          <div className="lg:flex my-6 justify-between">
            <Link href={'/auth/personal-info'}>
              <button className="flex justify-center bg-[#E9CFF1] lg:w-52 w-full p-3 rounded-md">
                <img src="/images/eth.png" alt="" />
                <p className="my-auto mx-3">Ethereum</p>
              </button>
            </Link>
            <button className="flex justify-center bg-[#E9CFF1] lg:w-52 w-full sm:mt-3 lg:ml-10 p-3 rounded-md">
              <img src="/images/deso.png" alt="" />
              <p className="my-auto mx-3">DeSo</p>
            </button>
          </div>
        </div>
        <button className="bg-purple w-full my-4 p-2 rounded-md text-white flex justify-center">
          <img src="/images/icons/MetaMask.svg" alt="" />
          <p className="my-auto mx-3">Connect with Metamask</p>
        </button>
      </div>
    </div>
  );
};

export default Auth;
