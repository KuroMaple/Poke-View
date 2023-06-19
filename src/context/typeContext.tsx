import * as React from 'react';
import { createContext } from 'react';

export type PokemonType =
  | 'all'
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

interface Props {
  type: PokemonType;
  setType: React.Dispatch<React.SetStateAction<PokemonType>>;
}

export const TypeContext = createContext<Props>(); // TODO: add default value here
