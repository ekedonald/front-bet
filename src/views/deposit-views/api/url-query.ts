export const url = {
  deposit: '/user/transaction/deposit',
  status: '/user/transaction/status',
};

export const queryKey = {
  all: ['user'],
  deposit: () => [...queryKey.all, 'userTransaction'],
};
