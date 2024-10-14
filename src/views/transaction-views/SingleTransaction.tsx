import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";
import { TRANSACTION_PREFIX_PATH } from "@/config";
import { useDocumentTitle } from "@/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Elements";
import { Item } from "@/components/Elements/TransactionItem";
import { useGetUserTransaction } from "./api/requests/getUserTransaction";
import { Transaction } from "./types";
import { TransactionStatus } from "@/components/Elements/BetResult/TransactionStatus";
import { BetStatus } from "@/components/Elements/BetResult/BetStatus";
import { formatAmount } from "@/utils/helpers";
import { format } from "date-fns";

interface SingleTransactionPropType {
  title: string;
};

const breadcrumbItems = [
  { label: 'Transaction', link: `${TRANSACTION_PREFIX_PATH}` },
  { label: 'Details', link: '#' },
];


const SingleTransaction = ({ title } : SingleTransactionPropType) => {
  useDocumentTitle(title);
  const { id } = useParams();

  const { data, isLoading, isError } = useGetUserTransaction({
    id
  });

  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    if (data) {
      setTransaction(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="stake-wrapper">
      <h4 className="text-2xl mb-5">Stake</h4>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container mt-5 grid lg:grid-cols-3 gap-5">
        <div className="bg-white col-span-2 dark:bg-bgDark-800  border dark:border-bgDark-800 border-gray-400 shadow-md px-5 py-5 rounded-xl">
          <h4 className="text-medium text-center capitalize">Transaction details</h4>
          {
            transaction &&
            <>
              <Item title="Transaction ID" value={transaction?.id}/>
              <h4 className="text-md mb-1">Status</h4>
              <TransactionStatus status={transaction?.status}/>

              <h4 className="text-md mb-1 mt-5">Status</h4>
              <BetStatus status={transaction?.type}/>
              <div className="mt-5">
                <Item title="Amount" value={formatAmount(transaction?.amount)} />
              </div>

              <div className="mt-5">
                <Item title="Date Created" value={format(new Date(transaction?.created_at), 'dd/MMM/yyyy HH:mm:ss')} />
              </div>
            </>
          }
        </div>
      </div>  
    </div>
  );
};

export default SingleTransaction;