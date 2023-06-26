import React, { PureComponent } from 'react';
import { Pokemon, pkmnMaxstats } from '../../data';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

interface Props {
  pkmn: Pokemon;
}

const MyRadarChart: React.FC<Props> = ({ pkmn }) => {
  // const data = {
  //   labels: ['HP', 'ATK', 'DEF', 'SPEED', 'SPATK', 'SPDEF'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [pkmn.hp, pkmn.atk, pkmn.def, pkmn.speed, pkmn.spAtk, pkmn.spDef],
  //       backgroundColor: '#26F7FD3F',
  //       borderColor: 'rgb(255, 255, 255)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const data = [
    {
      subject: 'HP',
      A: pkmn.hp,
      fullMark: pkmnMaxstats.hp,
    },
    {
      subject: 'ATK',
      A: pkmn.atk,
      fullMark: pkmnMaxstats.atk,
    },
    {
      subject: 'DEF',
      A: pkmn.def,
      fullMark: pkmnMaxstats.def,
    },
    {
      subject: 'SPEED',
      A: pkmn.speed,
      fullMark: pkmnMaxstats.speed,
    },
    {
      subject: 'SPATK',
      A: pkmn.spAtk,
      fullMark: pkmnMaxstats.spAtk,
    },
    {
      subject: 'SPDEF',
      A: pkmn.spDef,
      fullMark: pkmnMaxstats.spDef,
    },
  ];

  const labelStyle = { fill: '#FFFFFF' }; // Specify the desired label color here

  return (
    <RadarChart outerRadius={127} width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Radar
        name="Pokeomon Stats"
        dataKey="A"
        stroke="#FFFFFF"
        fill="#26F7FD3F"
        fillOpacity={0.6}
      />
      <style>{`.recharts-polar-angle-axis-tick-value { fill: ${labelStyle.fill}; }`}</style>
    </RadarChart>
  );
};

export default MyRadarChart;
