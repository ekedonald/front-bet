import React from 'react';
import BetCountdown from './BetCountdown';
import { PoolType } from '../pool-views/types';

interface StakeInfoType {
  pool: PoolType;
}
export const StakeInfo: React.FC<StakeInfoType> = ({ pool }) => {

  return (
    <>
      <BetCountdown targetDate={pool?.closed_at} />
    </>
  );
};