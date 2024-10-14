import { useDashboardActions, useDashboardState } from '@/stores/dashboard';
import { formatAmount } from '@/utils/helpers';
import { useGetUserBalance } from '@/views/auth-views/api/requests/getUserBalance';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export const UserBalance = () => {
  const { data } = useGetUserBalance();
  const { updateUserBalance } = useDashboardActions();
  const { balance } = useDashboardState();
  
  useEffect(() => {
    if(data){
      updateUserBalance(data)
    }
  }, [data]);
  
  return (
    <div className="p-2">
      <h2 className="text-sm font-semibold">Balance</h2>
      <p className="text-xs font-medium uppercase">
        <FontAwesomeIcon icon={faDollarSign} /> { formatAmount(balance)} 
      </p>
    </div>
  )
}