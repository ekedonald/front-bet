import { useDocumentTitle } from "@/hooks";
import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";
import { PoolList } from "./PoolList";

interface PoolPropType {
  title: string;
}

const breadcrumbItems = [
  { label: 'Pools', link: '#' }
];

const Pool = ({ title }: PoolPropType) => {
  useDocumentTitle(title);

  return (
    <div className="pool-wrapper">
      <h4 className="text-2xl mb-5">Pool</h4>
      <Breadcrumbs items={breadcrumbItems} />
      <PoolList />
    </div>
  );
};

export default Pool;
