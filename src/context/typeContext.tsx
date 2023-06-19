import * as React from 'react';
import { createContext } from 'react';
import { ColourOption } from '../data';

export type PokemonContextValue = {
  value: string;
  label: string;
  color: string;
  setType: React.Dispatch<React.SetStateAction<ColourOption>>;
};

export const PokemonContext = createContext<PokemonContextValue | null>(null);
