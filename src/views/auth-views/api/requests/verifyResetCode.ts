import { axios } from '@/libs/axios';
import { MutationConfig, useMutation } from '@/libs/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';

export type ForgotPasswordResetPasswordDTO = {
  code: number;
  type: number;
};

export const forgotPasswordResetCode = async (data: ForgotPasswordResetPasswordDTO) => {
  try {
    const response = await axios.post<ApiResponse<{ success: boolean }>>(url.confirmOTP, data);
    return response.data;
  } catch (err: any) {
    const errors = err as APIError;
    throw Error(formatError(errors));
  }
};

type UseForgotPasswordResetCodeOptions = {
  config?: MutationConfig<typeof forgotPasswordResetCode>;
};

export const useForgotPasswordResetCode = ({ config }: UseForgotPasswordResetCodeOptions = {}) => {

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (res) => {
      toast.success(res.data.MESSAGE);
    },
    mutationFn: forgotPasswordResetCode,
    ...config,
  });
};
