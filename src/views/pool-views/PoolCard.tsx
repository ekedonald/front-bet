import { Button } from "@/components/Elements";
import { PoolType } from "./types"
import { useCountdown } from "@/hooks/useCountdown";
import { getDifferenceInSeconds } from "@/utils/helpers/getSecondsFromTime";
import { useNavigate } from "react-router-dom";
import { POOL_PREFIX_PATH } from "@/config";

interface PoolCardType {
  pool: PoolType;
}
export const PoolCard = ({ pool } : PoolCardType) => {
  const [value, resetValue, isComplete] = useCountdown(getDifferenceInSeconds(pool.closed_at));

  const nagivate = useNavigate();

  const handleEnterPool = () => {
    if(!isComplete){
      nagivate(`${POOL_PREFIX_PATH}/${pool.id}`);
    }
  }

  return (
    <div className="card bg-white dark:bg-bgDark-800 p-5 border-1">
      <h3 className="uppercase font-semibold text-lg mb-4">{ pool.ticker.name }</h3>
      <h3 className="capitalize">{pool?.ticker?.base_token?.name}: { pool.base_token_start_price }</h3>
      <h3 className="capitalize mb-2">{pool?.ticker?.target_token?.name}: { pool.target_token_start_price }</h3>
      {/* {!isComplete && (
        <span className="animate-pulse text-sm mb-4 font-semibold">
          Pool closes in {" "}
          {value.minutes.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          m :
          {value.seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          s
        </span>
      )} */}
      <hr />
      <div className="pool-target-wrapper mt-4">
        {/* <div className="flex justify-between items-center">
          <h3 className="capitalize">Total Skate</h3>
          <h3 className="capitalize font-bold">1,2345 USDT</h3>
        </div> */}
        <div className="flex justify-between items-center">
          <h3 className="capitalize">Participants</h3>
          <h3 className="capitalize font-bold">{ pool?.bets?.length }</h3>
        </div>
      </div>
      <Button   
        disabled={isComplete}     
        variant="outlined"
        className="mt-5"
        onClick={handleEnterPool}
      >
        { isComplete ? "Pool is closed" : "View Pool" }
      </Button>
    </div>
  )
}