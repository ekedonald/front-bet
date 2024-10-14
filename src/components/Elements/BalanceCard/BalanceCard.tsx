import { UserBalance } from '@/components/Layouts/Dashboard/TopNavBar/UserBalance';
import React from 'react';

export const BalanceCard: React.FC = () => {
  return (
    <div className="text-sm breadcrumbs mb-5">
      <UserBalance />
    </div>
  );
};