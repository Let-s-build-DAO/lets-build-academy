import './globals.css'
import { Inter } from 'next/font/google'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })
import { Provider } from 'jotai';

export const metadata = {
  title: "Let's Build Academy",
  description: 'Empower yourself with knowledge of Decentralized Web and Blockchain'
}

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
