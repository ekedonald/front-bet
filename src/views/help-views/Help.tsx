import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";
import { useDocumentTitle } from "@/hooks";

interface HelpPropType {
  title: string;
};

const breadcrumbItems = [
  { label: 'Help', link: '#' },
];


const Help = ({ title } : HelpPropType) => {
  useDocumentTitle(title);

  return (
    <div className="deposit-wrapper">
      <h4 className="text-2xl mb-5">Help</h4>
      <Breadcrumbs items={breadcrumbItems} />
    </div>
  );
};

export default Help;