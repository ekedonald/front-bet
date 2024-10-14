import { axios } from '@/libs/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/libs/react-query';
import { ApiResponse } from '@/types/api';
import { formatError, getToken } from '@/utils/helpers';

import { Transaction } from '@/views/transaction-views/types';
import { queryKey, url } from '../url-query';

interface Response{
  transaction: Transaction;
}

export const getUserTransaction = async (id: string) => {
  if (getToken().token) {
    try {
      const response = await axios.get<ApiResponse<Response>>(url.getUserTransaction(id));
      return response.data?.data?.transaction;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
  return null;
};

type QueryFnType = typeof getUserTransaction;

type useGetUserTransactionOptions = Partial<{
  config?: QueryConfig<QueryFnType>;
  id: string;
}>;

export const useGetUserTransaction = ( { config, id } : useGetUserTransactionOptions,) => {

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getATransaction(id as string),
    queryFn:() => getUserTransaction(id as string),
  });
};
