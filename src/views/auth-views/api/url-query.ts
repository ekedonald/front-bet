export const url = {
  logout: '/auth/logout',
  balance: '/auth/balance',
  login: '/auth/login',
  signup: '/auth/register',
  getUser: '/auth/user',
  refreshToken: '/auth/token',
  confirmEmail: '/auth/confirm-otp',
  resendVerificationEmail: '/verification/resend_otp',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password-with-otp',
  resetPasswordTokenValidity: '/auth/check-token',
  confirmOTP: '/auth/confirm-otp',
};

export const queryKey = {
  all: ['auth'],
  balance: ['balance'],
  getUser: () => [...queryKey.all, 'user'],
  resendVerificationEmail: () => [...queryKey.all, 'resend-email-verification'],
};
