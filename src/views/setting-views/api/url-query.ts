export const url = {
  withdraw: '/user/transaction/withdraw',
  changePassword: '/auth/change-password',
  addProfilePhoto: '/auth/add-profile-photo',
};

export const queryKey = {
  all: ['user'],
  withdraw: () => [...queryKey.all, 'userTransaction'],
};
