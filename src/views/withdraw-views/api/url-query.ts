export const url = {
  withdraw: '/user/transaction/withdraw',
};

export const queryKey = {
  all: ['user'],
  withdraw: () => [...queryKey.all, 'userTransaction'],
};
