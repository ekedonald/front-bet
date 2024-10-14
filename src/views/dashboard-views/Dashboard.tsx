import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";
import { UserBalanceCard } from "@/components/Elements/Cards";
import { useDocumentTitle } from "@/hooks";
import { PoolList } from "../pool-views/PoolList";

interface DashboardPropType {
  title: string;
};

const breadcrumbItems = [
  { label: 'Dashboard', link: '#' },
];


const DashBoard = ({ title } : DashboardPropType) => {
  useDocumentTitle(title);

  return (
    <div className="deposit-wrapper">
      <h4 className="text-2xl mb-5">Dashboard</h4>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        <UserBalanceCard alt={true}/>
      </div>
      <div className="mt-10">
        <h4 className="text-2xl mb-5">Active Pools</h4>
        <PoolList limit={10}/>
      </div>
    </div>
  );
};

export default DashBoard;