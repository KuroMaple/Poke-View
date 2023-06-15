import React from 'react';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

interface Props {
  statName: string;
  statValue: number;
  maxStat: number;
}

const CardStat: React.FC<Props> = ({ statName, statValue, maxStat }) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[100],
    },

    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: getProgressBarColor(),
    },
  }));

  const getProgressBarColor = () => {
    switch (statName) {
      case 'hp':
        return '#ff0000'; // Red color
      case 'atk':
        return '#f08030'; // Green color
      case 'def':
        return '#f8d030'; // Blue color
      default:
        return '#1a90ff';
    }
  };
  return (
    <div className="card__stats-single">
      <p>{statName}: &nbsp;</p>
      <span>{statValue}&nbsp;</span>
      <BorderLinearProgress
        variant="determinate"
        value={(statValue / maxStat) * 100}
        sx={{ width: '72%' }}
      />
    </div>
  );
};

export default CardStat;
