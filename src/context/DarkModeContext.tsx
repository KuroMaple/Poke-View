/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { createContext } from 'react';

// This file creates the context for DarkMode through out the app

interface Props {
  isDarkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

// Default value cuz anopiler being annoying
const defaultProps: Props = {
  isDarkMode: false,
  setDarkMode: () => {},
};

export const DarkModeContext = createContext<Props>(defaultProps);
