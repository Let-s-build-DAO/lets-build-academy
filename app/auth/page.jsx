'use client'

import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { cookieToInitialState } from 'wagmi'
import { config, projectId } from '../config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import ConnectWallet from '../_components/ConnectWallet'

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

export const client = createThirdwebClient({
  clientId: 'bf9ec2d4d4216967eba4dd10a894f744',
});

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})


const Auth = () => {
  const initialState = cookieToInitialState(config)

  return (
    <ThirdwebProvider>

      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />
        </QueryClientProvider>
      </WagmiProvider>
    </ThirdwebProvider>
  )
};

export default Auth;
