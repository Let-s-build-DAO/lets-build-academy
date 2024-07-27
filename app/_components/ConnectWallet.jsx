import React, { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useReadContract } from "thirdweb/react";
import { useAccount } from 'wagmi'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import { getContract } from "thirdweb";
import { liskSepolia } from "thirdweb/chains";
import Link from 'next/link';
import Modal from './Modal';
import LazyABI from "../utils/ABI.js"
import { client } from '../auth/page';



const ConnectWallet = () => {
  const contract = getContract({
    client,
    address: "0xF8324D5172Bb7558d4B4495e8a02B1281C43579D",
    chain: liskSepolia,
  });
  const { open, close } = useWeb3Modal()
  const [modal, setModal] = useState(false)
  const account = useAccount()
  const router = useRouter()
  const hasNFT = false

  const { data, isLoading } = useReadContract({
    contract,
    method: "function tokenURI(uint256 tokenId) returns (string)",
    params: [1n], // type safe params
  });

  useEffect(() => {
    if (account.isConnected && hasNFT) {
      setCookie('address', account.address)
      router.push('/auth/personal-info')
      console.log(account.address)
    } else {
      setModal(true)
    }
  }, [account])
  return (
    <>
    {/* {`test`} {balance?.toString()} */}
      <div className="w-full bg-gray-200 justify-start items-center flex">
        <div className="w-1/2 md:flex justify-between items-center gap-4 inline-flex hidden">
          <img className="h-screen w-full object-cover" src={"/auth-img.png"} />
        </div>
        <div className="lg:w-1/2 sm:my-10 lg:p-10 p-4">
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

          <div className='my-6'>
            <p>Already have an account? <Link className='text-purple' href={'/auth/login'}>Login</Link></p>
          </div>
        </div>
      </div>
      <Modal isOpen={false} onClose={() => setModal(false)}>
        <h2 className="text-2xl font-semibold mb-4"></h2>
        <p className="mb-4 text-xl text-center">You dont have our NFT, to claim our NFT click the button below.</p>
        <div className="flex justify-center">
          <a
            href="https://lazy-nft.vercel.app/claim"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className='bg-purple p-3 rounded-md text-white px-6'>Claim our NFT</button>
          </a>
        </div>
      </Modal>
    </>
  );
};

export default ConnectWallet;