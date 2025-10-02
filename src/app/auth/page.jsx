'use client'

import { cookieToInitialState } from 'wagmi'
import { config, projectId } from '../../config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import ConnectWallet from '../../components/ConnectWallet'
import '@rainbow-me/rainbowkit/styles.css'

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// export const client = createThirdwebClient({
//   clientId: 'bf9ec2d4d4216967eba4dd10a894f744',
// });

const Auth = () => {
  const initialState = cookieToInitialState(config)

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
          <ConnectWallet />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
};

export default Auth;