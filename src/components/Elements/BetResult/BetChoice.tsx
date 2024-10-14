type BetResultBadgeProps = {
  status: string;
  choice: string;
};

export const BetChoice: React.FC<BetResultBadgeProps> = ({ status, choice }) => {
  const statusColorMap: { [key: string]: string } = {
    no_result: 'bg-gray-400 text-white',
    draw: 'bg-orange-400 text-white',
    won: 'bg-green-700 text-white',
    lost: 'bg-red-700 text-white',
  };

  const badgeColor = statusColorMap[status] || 'bg-gray-200 text-black';

  return (
    <span className={`px-2 py-1 rounded capitalize ${badgeColor}`}>
      {choice}
    </span>
  );
};