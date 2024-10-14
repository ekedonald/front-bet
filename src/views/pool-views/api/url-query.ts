export const url = {
  getAllPools: '/user/pool',
  getUserBets: '/user/bet',
  getAPools:(poolId: string) =>  `/user/pool/${poolId}`,
  getUserBet:(betId: string) =>  `/user/bet/${betId}`,
  saveBet: `/user/bet`,
};

export const queryKey = {
  all: ['pool'],
  bets: ['bets'],
  allBets: () => [...queryKey.bets, 'bets'],
  getAPool: (poolId: string) => [`pool/${poolId}`],
  getUserBet: (filters?: Record<string, any>) => [...queryKey.allBets(), { filters }],
};
