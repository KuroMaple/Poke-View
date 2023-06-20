// This file exports information to style the Dropdown component
// and the Pokemon data models

import chroma from 'chroma-js';

export interface ColourOption {
  value: string;
  label: string;
  color: string;
}

export const maxPokemonCount = 500;

export const colourOptions: ColourOption[] = [
  { value: 'all', label: 'All Types', color: '#808080' },
  { value: 'normal', label: 'Normal', color: '#A8A878' },
  { value: 'fire', label: 'Fire', color: '#F08030' },
  { value: 'water', label: 'Water', color: '#6890F0' },
  { value: 'grass', label: 'Grass', color: '#56AE56' },
  { value: 'electric', label: 'Electric', color: '#F8D030' },
  { value: 'ice', label: 'Ice', color: '#98D8D8' },
  { value: 'fighting', label: 'Fighting', color: '#C03028' },
  { value: 'poison', label: 'Poison', color: '#A040A0' },
  { value: 'ground', label: 'Ground', color: '#E0C068' },
  { value: 'flying', label: 'Flying', color: '#A890F0' },
  { value: 'psychic', label: 'Psychic', color: '#F85888' },
  { value: 'bug', label: 'Bug', color: '#A8B820' },
  { value: 'rock', label: 'Rock', color: '#B8A038' },
  { value: 'ghost', label: 'Ghost', color: '#705898' },
  { value: 'dragon', label: 'Dragon', color: '#7038F8' },
  { value: 'dark', label: 'Dark', color: '#705848' },
  { value: 'steel', label: 'Steel', color: '#B8B8D0' },
  { value: 'fairy', label: 'Fairy', color: '#EE99AC' },
];

export interface Pokemon {
  name: string;
  id: number;
  hp: number;
  atk: number;
  def: number;
  spDef?: number;
  spAtk?: number;
  speed?: number;
  front_sprite: string;
  typePrimary: string;
  typeSecondary?: string;
  flavorText?: string;
}

export interface PokemonNameObject {
  name: string;
  url: string;
}

export const pkmnMaxstats: Pokemon = {
  name: 'PokemnMaxStatsObject',
  id: 1,
  hp: 255,
  atk: 190,
  def: 230,
  spDef: 230,
  spAtk: 194,
  speed: 180,
  front_sprite: 'null',
  typePrimary: 'null',
};
