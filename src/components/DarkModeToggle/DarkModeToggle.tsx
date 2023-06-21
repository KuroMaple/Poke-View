import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };
  return (
    <div className="main-header__button">
      <DarkModeSwitch
        style={{
          marginBottom: '2rem',
          width: '2rem',
          cursor: 'pointer',
        }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={120}
      />
    </div>
  );
};

export default DarkModeToggle;
