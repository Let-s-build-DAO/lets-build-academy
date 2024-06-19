import React, { useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'

const ConnectWallet = () => {
  const { open, close } = useWeb3Modal()
  const account = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (account.isConnected) {
      setCookie('address', account.address)
      router.push('/auth/personal-info')
      console.log(account.address)
    }
  }, [account])
  return (
    <>
      <div className="w-full bg-gray-200 justify-start items-center flex">
        <div className="w-1/2 md:flex justify-between items-center gap-4 inline-flex hidden">
          <img className="h-screen w-full object-cover" src={"/auth-img.png"} />
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
          <button onClick={() => open()} className="bg-purple w-full my-4 p-2 rounded-md text-white flex justify-center">
            <img src="/images/icons/MetaMask.svg" alt="" />
            <p className="my-auto mx-3">Connect with Metamask</p>
          </button>
        </div >
      </div >
    </>
  );
};

export default ConnectWallet;