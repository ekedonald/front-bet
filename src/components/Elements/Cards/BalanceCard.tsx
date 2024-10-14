import { useDashboardState } from "@/stores/dashboard";
import { formatAmount } from "@/utils/helpers";

interface UserBalanceCardType {
  alt?: boolean;
}
export const UserBalanceCard = ({ alt }: UserBalanceCardType) => {
  const { balance } = useDashboardState();
  return (
    <div className="card">
      <div className={`${ alt ? 'bg-bgDark-card text-white' : 'dark:bg-bgDark-800 bg-white'} card-body rounded-xl dark:text-white text-gray-700`}>
        <div className="card-title text-2xl">Balance</div>
        <div className="text-md">{ formatAmount(balance) }</div>
      </div>
    </div>
  );
}