type PaymentStatusBadgeProps = {
  status: string;
};

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
  const statusColorMap: { [key: string]: string } = {
    waiting: 'bg-yellow-500 text-white',
    confirming: 'bg-blue-500 text-white',
    confirmed: 'bg-green-500 text-white',
    sending: 'bg-indigo-500 text-white',
    partially_paid: 'bg-purple-500 text-white',
    finished: 'bg-teal-500 text-white',
    failed: 'bg-red-500 text-white',
    refunded: 'bg-gray-500 text-white',
    expired: 'bg-black text-white',
  };

  const badgeColor = statusColorMap[status] || 'bg-gray-200 text-black';

  return (
    <span className={`px-2 py-1 rounded ${badgeColor}`}>
      {status.replace('_', ' ')}
    </span>
  );
};