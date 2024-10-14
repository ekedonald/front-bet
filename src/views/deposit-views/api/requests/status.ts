import { axios } from '@/libs/axios';
import { MutationConfig, useMutation } from '@/libs/react-query';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/api';
import { Transaction } from '@/views/transaction-views/types';

export type StatusDTO = {
  payment_id: string;
};

interface Response {
  transaction: Transaction;
}

export const status = async (data: StatusDTO) => {
  try {
    const response = await axios.post<ApiResponse<Response>>(url.status, data);
    return response.data?.data?.transaction;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type useSTatusOptions = {
  config?: MutationConfig<typeof status>;
};

export const useStatus= ({ config }: useSTatusOptions = {}) => {

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    mutationFn: status,
    ...config,
  });
};
