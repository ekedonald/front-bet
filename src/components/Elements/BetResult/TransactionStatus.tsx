type TransactionStatusType = {
  status: string;
};

export const TransactionStatus: React.FC<TransactionStatusType> = ({ status }) => {
  const statusColorMap: { [key: string]: string } = {
    waiting: 'bg-orange-400 text-white',
    expired: 'bg-gray-400 text-white',
    canceled: 'bg-red-700 text-white',
    finished: 'bg-green-700 text-white',
  };

  const badgeColor = statusColorMap[status] || 'bg-gray-200 text-black';

  return (
    <span className={`px-2 py-1 rounded capitalize ${badgeColor}`}>
      {status && status.replace(/_/g, " ")} 
    </span>
  );
};