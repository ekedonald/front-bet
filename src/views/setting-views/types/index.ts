export type WithdrawDTO = {
  amount: number;
};

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}