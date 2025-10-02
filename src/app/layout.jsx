import './globals.css'
import { Inter } from 'next/font/google'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })
import { Provider } from 'jotai';

export const metadata = {
    metadataBase: new URL("https://academy.lbdao.xyz"), // change to real domain
  title: "Let's Build Academy | Learn Web3, Blockchain & Decentralized Tech",
  description:
    "Empower yourself with the knowledge of Web3, Blockchain, and the Decentralized Web. Learn from curated courses, events, and real-world builder projects at Let's Build Academy.",
  keywords: [
    "Let's Build Academy",
    "Web3 education",
    "blockchain courses",
    "decentralized web",
    "crypto learning",
    "DAO education",
    "learn Web3",
    "smart contracts",
    "blockchain development",
    "crypto academy",
  ],
  author: "Let's Build DAO",
  openGraph: {
    title: "Let's Build Academy | Learn Web3, Blockchain & Decentralized Tech",
    description:
      "Join Let's Build Academy to access expert-led Web3 and blockchain courses, bootcamps, and real-world DAO projects.",
    url: "https://academy.lbdao.xyz/", // Replace with actual page URL
    type: "website",
    images: [
      {
        url: "https://academy.lbdao.xyz/images/academy.png", // Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: "Let's Build Academy - Web3 Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Build Academy | Learn Web3, Blockchain & More",
    description:
      "Explore hands-on courses in Web3 and blockchain development through Let's Build Academy – a learning hub powered by Let's Build DAO.",
    images: ["https://academy.lbdao.xyz/"], // Replace with actual image URL
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
        <ToastContainer position='top-center' theme='dark' />
      </body>
    </html>
  )
}
