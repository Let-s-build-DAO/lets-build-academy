import React from 'react';
import MainHeader from '../_components/MainHeader';
import MainFooter from '../_components/MainFooter';

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