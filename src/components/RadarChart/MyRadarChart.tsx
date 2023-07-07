import React from 'react';
import { Pokemon } from '../../data';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

interface Props {
  pkmn: Pokemon;
}

const MyRadarChart: React.FC<Props> = ({ pkmn }) => {
  const data = [
    {
      subject: 'HP',
      A: pkmn.hp,
    },
    {
      subject: 'ATK',
      A: pkmn.atk,
    },
    {
      subject: 'DEF',
      A: pkmn.def,
    },
    {
      subject: 'SPEED',
      A: pkmn.speed,
    },
    {
      subject: 'SPATK',
      A: pkmn.spAtk,
    },
    {
      subject: 'SPDEF',
      A: pkmn.spDef,
    },
  ];

  const labelStyle = { fill: '#FFFFFF' }; // Specify the desired label color here

  return (
    <RadarChart outerRadius={127} width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" domain={[0, 255]} />
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
