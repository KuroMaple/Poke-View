import React from 'react';
import DarkModeToggle from './DarkModeToggle/DarkModeToggle';
const MainHeader = () => {
  return (
    <div className="main-header">
      <div className="main-header__title">
        <h1>Who&apos;s That Pok&#233;mon?</h1>
      </div>

      <DarkModeToggle />
    </div>
  );
};

export default MainHeader;
