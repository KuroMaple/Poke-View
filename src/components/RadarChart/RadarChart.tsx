import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Pokemon } from '../../data';

interface Props {
  pkmn: Pokemon;
}

const RadarChart: React.FC<Props> = ({ pkmn }) => {
  const data = {
    labels: ['HP', 'ATK', 'DEF', 'SPEED', 'SPATK', 'SPDEF'],
    datasets: [
      {
        data: [pkmn.hp, pkmn.atk, pkmn.def, pkmn.speed, pkmn.spAtk, pkmn.spDef],
        backgroundColor: '#26F7FD3F',
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: false,
  };

  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

  return (
    <div className="radar-chart">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
