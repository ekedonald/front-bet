import { axios } from '@/libs/axios';
import { MutationConfig, useMutation, useQueryClient } from '@/libs/react-query';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/api';
import { Transaction } from '@/views/transaction-views/types';
import { queryKey } from '@/views/auth-views/api';

export type DepositDTO = {
  amount: number;
  currency: string;
};

interface Response {
  transaction: Transaction;
}

export const deposit = async (data: DepositDTO) => {
  try {
    const response = await axios.post<ApiResponse<Response>>(url.deposit, data);
    return response.data?.data?.transaction;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type useDepositOptions = {
  config?: MutationConfig<typeof deposit>;
};

export const useDeposit = ({ config }: useDepositOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.balance);
    },
    mutationFn: deposit,
    ...config,
  });
};
