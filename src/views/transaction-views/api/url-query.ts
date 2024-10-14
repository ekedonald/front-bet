export const url = {
  getTransactions: '/user/transaction',
  getUserTransaction:(transactionId: string) =>  `/user/transaction/${transactionId}`,
};

export const queryKey = {
  all: ['transactions'],
  transactions: ['transactions'],
  allTransactions: () => [...queryKey.transactions, 'transactions'],
  getATransaction: (transactionID: string) => [`transaction/${transactionID}`],
  getUserTransactions: (filters?: Record<string, any>) => [...queryKey.allTransactions(), { filters }],

};
