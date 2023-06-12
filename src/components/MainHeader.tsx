import React from 'react';
import { BiMoon } from 'react-icons/bi';
const MainHeader = () => {
  return (
    <div className="main-header">
      <div className="main-header__title">
        <h1>Who&apos;s That Pok&#233;mon?</h1>
      </div>

      <button className="main-header__button">
        <BiMoon />
        Dark Mode
      </button>
    </div>
  );
};

export default MainHeader;
