import { axios } from '@/libs/axios';
import { MutationConfig, useMutation } from '@/libs/react-query';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';
import { ChangePasswordDTO } from '../../types';
import { Transaction } from '@/views/transaction-views/types';
import { ApiResponse } from '@/types/api';

interface Response {
  transaction: Transaction;
}

export const changePassword = async (data: ChangePasswordDTO) => {
  try {
    const response = await axios.post<ApiResponse<Response>>(url.changePassword, data);
    return response.data?.data?.transaction;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type useChangePasswordOptions = {
  config?: MutationConfig<typeof changePassword>;
};

export const useChangePassword = ({ config }: useChangePasswordOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    mutationFn: changePassword,
    ...config,
  });
};
