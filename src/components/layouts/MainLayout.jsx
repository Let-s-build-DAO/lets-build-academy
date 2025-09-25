'use client'

import React, {useEffect} from 'react';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import { usePathname } from 'next/navigation';
import { logPageEvent } from '../../firebase/config';

const MainLayout = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      logPageEvent("page_view", { page: pathname });
      console.log("Logged page view:", pathname);
    }
  }, [pathname]);
  return (
    <>
      <MainHeader />
      <main>
        {children}
      </main>
      <MainFooter />
    </>
  );
};

export default MainLayout;