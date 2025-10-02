import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia, liskSepolia, lisk } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { walletConnectWallet, metaMaskWallet, rainbowWallet, phantomWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_CONNECT_WALLET_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Lets Build Acaademy',
  description: 'Lets Build Academy',
  url: 'https://academy.lbdao.xyz/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig with RainbowKit
const chains = [liskSepolia, lisk]
export const config = getDefaultConfig({
  appName: metadata.name,
  projectId,
  chains,
  ssr: false,
  storage: createStorage({
    storage: cookieStorage
  }),
  connectors: connectorsForWallets(
    [{
      groupName: 'Recommended',
      wallets: [rainbowWallet, walletConnectWallet, metaMaskWallet, phantomWallet, trustWallet],
    },],
    {
      appName: metadata.name,
      projectId,
    }
  )
})