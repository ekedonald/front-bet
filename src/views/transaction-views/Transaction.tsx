import { useDocumentTitle } from "@/hooks";
import { TransactionTable } from "./TransactionTable/TransactionTable";
import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";

interface PoolPropType {
  title: string;
}

const breadcrumbItems = [
  { label: 'Transactions', link: '#' },
  { label: 'History', link: '#' },
];

const Pool = ({ title }: PoolPropType) => {
  useDocumentTitle(title);

  return (
    <div className="stake-wrapper">
      <h4 className="text-2xl mb-5">Transactions</h4>
      <Breadcrumbs items={breadcrumbItems} />
      <TransactionTable />
    </div>
  );
};

export default Pool;
