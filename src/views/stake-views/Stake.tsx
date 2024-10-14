import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";
import { useDocumentTitle } from "@/hooks";
import { StakeTable } from "./StakeTable/StakeTable";

interface StakePropType {
  title: string;
};

const breadcrumbItems = [
  { label: 'Stake', link: '#' },
  { label: 'History', link: '#' },
];


const Stake = ({ title } : StakePropType) => {
  useDocumentTitle(title);

  return (
    <div className="stake-wrapper">
      <h4 className="text-2xl mb-5">Stake</h4>
      <Breadcrumbs items={breadcrumbItems} />
      <StakeTable />
    </div>
  );
};

export default Stake;