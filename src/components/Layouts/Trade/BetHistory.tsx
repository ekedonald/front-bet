import { formatAmount } from '@/utils/helpers';
import { Bet, PoolType } from '@/views/pool-views/types';

interface InputSectionPoopPropsType {
  pool: PoolType;
}

export const BetHistory = ({pool}: InputSectionPoopPropsType) => {
  
  return (
    <div className="">
      <h4 className='font-bold text-md'>Bet History</h4>
      <div className='bet-history-wrapper mt-3'>
        {
          pool?.bets?.map((bet: Bet) => (
            <div className='bet flex justify-between items-center text-sm font-light'>
              <h4>{`${bet?.user?.first_name} ${bet?.user?.last_name}`}: Stake</h4>
              <h4>{ formatAmount(parseFloat(bet?.bet_price)) }</h4>
            </div>
          ))
        }
      </div>
    </div>
  )
};