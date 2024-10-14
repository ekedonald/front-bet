import { ReactNode } from 'react';

import { create } from '@/libs/zustand';

interface DashboardState {
  notificationMessage?: ReactNode;
  headerContent?: ReactNode;
  userBalance: number;
  actions: DashboardActionType;
}

interface DashboardActionType {
  updateNotificationMessage: (message: ReactNode) => void;
  updateHeaderContent: (content: ReactNode) => void;
  updateUserBalance: (balance: number) => void;
}

const useDashboardStore = create<DashboardState>()((set) => ({
  notificationMessage: null,
  headerContent: null,
  userBalance: 0,
  actions: {
    updateNotificationMessage: (message) =>
      set(() => ({
        notificationMessage: message,
      })),
    updateHeaderContent: (content) =>
      set(() => ({
        headerContent: content,
      })),
    updateUserBalance: (balance) =>
      set(() => ({
        userBalance: balance,
      })),
  },
}));

export const useDashboardState = () =>
  useDashboardStore((state) => ({
    notificationMessage: state.notificationMessage,
    headerContent: state.headerContent,
    balance: state.userBalance,
  }));

export const useDashboardActions = () => useDashboardStore((state) => state.actions);
