import { axios } from '@/libs/axios';
import { MutationConfig, useMutation } from '@/libs/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';

export type ForgotPasswordDTO = {
  email: string;
};

export const forgotPassword = async (data: ForgotPasswordDTO) => {
  try {
    const response = await axios.post<ApiResponse<{ success: boolean }>>(url.forgotPassword, data);
    return response.data;
  } catch (err: any) {
    const errors = err as APIError;
    throw Error(formatError(errors));
  }
};

type UseForgotPasswordOptions = {
  config?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({ config }: UseForgotPasswordOptions = {}) => {

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (res) => {
      toast.success(res.data.MESSAGE);
    },
    mutationFn: forgotPassword,
    ...config,
  });
};
