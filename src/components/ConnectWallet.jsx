import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { setCookie } from 'cookies-next';
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