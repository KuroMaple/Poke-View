import './FocusedStats.css';
import React from 'react';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { pkmnMaxstats } from '../../../data';

interface Props {
  hp: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  speed: number;
}

const FocusedStats: React.FC<Props> = ({
  hp,
  atk,
  def,
  spatk,
  spdef,
  speed,
}) => {
  interface BorderLinearProgressProps {
    statName: string;
  }
  const BorderLinearProgress = styled(
    LinearProgress
  )<BorderLinearProgressProps>(({ theme, statName }) => ({
    height: 10,
    minWidth: 0,
    borderRadius: 5,
    justifySelf: 'last-baseline',
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[100],
    },

    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: getProgressBarColor(statName),
    },
  }));

  const getProgressBarColor = (statName: string) => {
    switch (statName) {
      case 'hp':
        return '#ff0000'; // Red color
      case 'atk':
        return '#f08030'; // Green color
      case 'def':
        return '#f8d030'; // Blue color
      case 'spatk':
        return '#6890f0';
      case 'spdef':
        return '#78c850';
      case 'speed':
        return '#f85888';
      default:
        return '#1a90ff';
    }
  };
  return (
    <div className="focused-stats_container">
      <p className="stat-label">HP: &nbsp;</p>
      <span className="stat-value">{hp}&nbsp;</span>
      <BorderLinearProgress
        variant="determinate"
        value={(hp / pkmnMaxstats.hp) * 100}
        sx={{ width: '70%' }}
        statName="hp"
      />
      <p className="stat-label">ATK: &nbsp;</p>
      <span className="stat-value">{atk}&nbsp;</span>
      <BorderLinearProgress
        variant="determinate"
        value={(atk / pkmnMaxstats.atk) * 100}
        sx={{ width: '70%' }}
        statName="atk"
      />
      <p className="stat-label">DEF: &nbsp;</p>
      <span className="stat-value">{def}&nbsp;</span>
      <BorderLinearProgress
        variant="determinate"
        value={(def / pkmnMaxstats.def) * 100}
        sx={{ width: '70%' }}
        statName="def"
      />
      <p className="stat-label">SPATK: &nbsp;</p>
      <span className="stat-value">{spatk}&nbsp;</span>
      <BorderLinearProgress
        variant="determinate"
        value={(spatk / (pkmnMaxstats.spAtk ?? 1)) * 100}
        sx={{ width: '70%' }}
        statName="spatk"
      />
      <p className="stat-label">SPDEF: &nbsp;</p>
      <span className="stat-value">{spdef}&nbsp;</span>
      <BorderLinearProgress
        variant="determinate"
        value={(spdef / (pkmnMaxstats.spDef ?? 1)) * 100}
        sx={{ width: '70%' }}
        statName="spdef"
      />
      <p className="stat-label">SPEED: &nbsp;</p>
      <span className="stat-value">{speed}&nbsp;</span>
      <BorderLinearProgress
        variant="determinate"
        value={(speed / (pkmnMaxstats.speed ?? 1)) * 100}
        sx={{ width: '70%' }}
        statName="speed"
      />
    </div>
  );
};

export default FocusedStats;
