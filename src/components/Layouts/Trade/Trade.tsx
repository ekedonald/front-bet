import { PoolType } from "@/views/pool-views/types";
import { InputSection } from "./InputSection";
import { BetHistory } from "./BetHistory";

interface TradePropsType{
  pool: PoolType;
}
export const Trade = ({pool}: TradePropsType) => {

  return (
    <div className="trade">
      <InputSection pool={pool}/>
      <div className="mt-4">
        <hr />
        <div className="mt-4">
          <BetHistory pool={pool} />
        </div>
      </div>
    </div>
  );
};