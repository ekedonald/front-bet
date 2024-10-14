import { axios } from '@/libs/axios';
import { MutationConfig, useMutation, useQueryClient } from '@/libs/react-query';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';
import { WithdrawDTO } from '../../types';
import { Transaction } from '@/views/transaction-views/types';
import { ApiResponse } from '@/types/api';
import { queryKey } from '@/views/auth-views/api';

interface Response {
  transaction: Transaction;
}

export const withdraw = async (data: WithdrawDTO) => {
  try {
    const response = await axios.post<ApiResponse<Response>>(url.withdraw, data);
    return response.data?.data?.transaction;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type useWithdrawOptions = {
  config?: MutationConfig<typeof withdraw>;
};

export const useWithdraw = ({ config }: useWithdrawOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.balance);
    },
    mutationFn: withdraw,
    ...config,
  });
};
