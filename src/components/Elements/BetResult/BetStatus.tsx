type BetStatusType = {
  status: string;
};

export const BetStatus: React.FC<BetStatusType> = ({ status }) => {
  const statusColorMap: { [key: string]: string } = {
    place_bet: 'bg-orange-400 text-white',
    place_bet_draw: 'bg-gray-400 text-white',
    debit: 'bg-red-700 text-white',
    place_bet_won: 'bg-green-700 text-white',
    credit: 'bg-green-700 text-white',
  };

  const badgeColor = statusColorMap[status] || 'bg-gray-200 text-black';

  return (
    <span className={`px-2 py-1 rounded capitalize ${badgeColor}`}>
      {status && status.replace(/_/g, " ")} 
    </span>
  );
};