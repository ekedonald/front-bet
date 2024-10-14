import { create } from '@/libs/zustand';

interface PoolState {
  shouldReloadBetPage: boolean;
  actions: PoolActionType;
}

interface PoolActionType {
  updateShouldReloadBetPage: (value: boolean) => void;
}

const usePoolStore = create<PoolState>()((set) => ({
  shouldReloadBetPage: false,
  actions: {
    updateShouldReloadBetPage: (value) =>
      set(() => ({
        shouldReloadBetPage: value,
      })),
  },
}));

export const usePoolState = () =>
  usePoolStore((state) => ({
    shouldReloadBetPage: state.shouldReloadBetPage,
  }));

export const usePoolActions = () => usePoolStore((state) => state.actions);
