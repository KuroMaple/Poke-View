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
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  return (
    <div className="card__stats-single">
      <p>{statName}: &nbsp;</p>
      <span>{statValue}&nbsp;</span>
      <BorderLinearProgress
        variant="determinate"
        value={(statValue / maxStat) * 100}
        sx={{ width: '70%' }}
      />
    </div>
  );
};

export default CardStat;
