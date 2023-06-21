import React, { useContext, useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { DarkModeContext } from '../../context/DarkModeContext';

const DarkModeToggle = () => {
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  const { isDarkMode, setDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
  }, [isDarkMode]);

  return (
    <div className="main-header__button">
      <DarkModeSwitch
        style={{
          width: '2rem',
          cursor: 'pointer',
          height: '2rem',
        }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={120}
      />
    </div>
  );
};

export default DarkModeToggle;
