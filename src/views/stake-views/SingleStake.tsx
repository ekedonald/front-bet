import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";
import { STAKE_PREFIX_PATH } from "@/config";
import { useDocumentTitle } from "@/hooks";
import { useParams } from "react-router-dom";
import { useGetUserBet } from "../pool-views/api";
import { useEffect, useState } from "react";
import { Bet } from "../pool-views/types";
import { BetResultBadge, Loading } from "@/components/Elements";
import { Item } from "@/components/Elements/TransactionItem";
import { format } from "date-fns";
import { formatAmount } from "@/utils/helpers";
import { StakeInfo } from "./StakeInfo";
import { usePoolState } from "@/stores/pool";
import useBetCountdown from "@/hooks/useBetCoundown";

interface SingleStakePropType {
  title: string;
}

const breadcrumbItems = [
  { label: 'Stake', link: `${STAKE_PREFIX_PATH}` },
  { label: 'Details', link: '#' },
];

const SingleStake = ({ title }: SingleStakePropType) => {
  useDocumentTitle(title);
  const { id } = useParams();
  const { shouldReloadBetPage } = usePoolState();
  const { data, isLoading, refetch } = useGetUserBet({ id });
  const [bet, setBet] = useState<Bet>();

  useEffect(() => {
    if (data) {
      setBet(data);
    }
  }, [data]);

  useEffect(() => {
    if (shouldReloadBetPage) {
      refetch();
    }
  }, [shouldReloadBetPage, refetch]);

  // Assuming the target date is the 'created_at' field. Adjust if necessary.
  const targetDate = bet?.created_at || '';
  useBetCountdown(targetDate);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="stake-wrapper">
      <h4 className="text-2xl mb-5">Stake</h4>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container mt-5 grid lg:grid-cols-4 gap-5">
        <div className="bg-white col-span-2 dark:bg-bgDark-800 border dark:border-bgDark-800 border-gray-400 shadow-md px-5 py-5 rounded-xl">
          <h4 className="text-medium text-center capitalize">Bet details</h4>
          {bet && (
            <>
              <Item title="Bet ID" value={bet?.id} />
              <Item title="Bet Price" value={formatAmount(parseFloat(bet?.bet_price))} />
              <Item title="Choice Outcome" value={bet?.choice_outcome} />
              <div className="my-5">
                <h4 className="text-md mb-1">Status</h4>
                <BetResultBadge status={bet?.status} />
              </div>
              <Item title="Ticker" value={bet?.ticker?.name} />
              <div className="mt-5">
                <Item title="Date Created" value={format(new Date(bet?.created_at), 'dd/MMM/yyyy HH:mm:ss')} />
              </div>
            </>
          )}
        </div>
        <div className="bg-white col-span-2 dark:bg-bgDark-800 border dark:border-bgDark-800 border-gray-400 shadow-md px-5 py-5 rounded-xl">
          {bet && (
            <div className="pt-40 flex justify-center">
              <StakeInfo pool={bet.pool} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleStake;
