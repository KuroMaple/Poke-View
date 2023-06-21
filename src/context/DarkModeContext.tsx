import * as React from 'react';
import { createContext } from 'react';

// This file creates the context for DarkMode through out the app

interface Props {
  isDarkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<Props>();
