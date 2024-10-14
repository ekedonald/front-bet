import { useDashboardState } from "@/stores/dashboard";
import { formatAmount } from "@/utils/helpers";

export const Summary = () => {
  const { balance } = useDashboardState();
  return (
    <div className="flex text-xs gap-5 justify-between mt-5 text-gray-400 whitespace-nowrap leading-[133%]">
      <span>Balance</span>
      <span>{ formatAmount(balance) }</span>
    </div>
  )
};