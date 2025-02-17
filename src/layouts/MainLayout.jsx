import React from 'react';
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <main>{children}
        <MainFooter />
      </main>
    </div>
  );
};

export default MainLayout;