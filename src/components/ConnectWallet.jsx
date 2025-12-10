import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';

const ConnectWallet = () => {
  const account = useAccount()
  const { openConnectModal } = useConnectModal();
  const router = useRouter()

  useEffect(() => {
    if (account && account.address) {
      setCookie('address', account.address)
      // Wallet is connected, route to personal info
      router.push('/auth/personal-info')
    }
  }, [account, router])

  const continueWithoutWallet = () => {
    try { deleteCookie('address') } catch (e) { }
    router.push('/auth/personal-info')
  }

  return (
    <>
      <div className="w-full bg-gray-200 justify-start items-center flex">

        <div className="lg:w-1/2 sm:my-10 lg:p-10 p-4">
          <div className="">
            <h1 className="text-gray-900 text-4xl md:text-5xl font-extrabold font-['Poppins'] leading-tight mb-4">
              Connect Your <span className="text-purple">Web3 Wallet</span>
            </h1>
            <p className="text-gray-700 text-base md:text-lg font-normal mb-2">
              Link your wallet to unlock exclusive courses, earn NFT certificates, and join our global builder community.
            </p>

          </div>
          {openConnectModal && (
            <button onClick={openConnectModal} type="button" className="bg-purple w-full my-4 rounded-full text-white p-4">
              Connect Wallet
            </button>
          )}

          {/* <div className="bg-purple w-full my-4 rounded-full"> */}
          {/* <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            /> */}
          {/* </div> */}

          <div className='my-4'>
            <button onClick={continueWithoutWallet} className="text-purple p-4 bg-[#DBDBDB] shadow-md rounded-full w-full flex justify-center gap-4">
              <p>
                Continue without wallet
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right my-auto" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </button>
          </div>


          <div className='my-6'>
            <p>Already have an account? <Link className='text-purple' href={'/auth/login'}>Login</Link></p>
          </div>
        </div>
        <div className="w-1/2 md:flex justify-between items-center gap-4 inline-flex hidden">
          <img className="h-screen w-full object-cover" src={"/auth-img.png"} />
        </div>
      </div>
    </>
  );
};

export default ConnectWallet;