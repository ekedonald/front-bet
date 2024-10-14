import { axios } from '@/libs/axios';
import { MutationConfig, useMutation } from '@/libs/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';

export type ResetPasswordDTO = {
  password: string;
  code: number;
  type: number;
};

export const resetPassword = async (data: ResetPasswordDTO) => {
  try {
    const response = await axios.post<ApiResponse<{ success: boolean }>>(url.resetPassword, data);
    return response.data;
  } catch (err: any) {
    const errors = err as APIError;
    throw Error(formatError(errors));
  }
};

type UseResetPasswordOptions = {
  config?: MutationConfig<typeof resetPassword>;
};

export const useResetPassword = ({ config }: UseResetPasswordOptions = {}) => {

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (res) => {
      toast.success(res.data.MESSAGE);
    },
    mutationFn: resetPassword,
    ...config,
  });
};
