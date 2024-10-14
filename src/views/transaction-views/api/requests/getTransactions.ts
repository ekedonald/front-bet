import { axios } from '@/libs/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/libs/react-query';
import { ApiResponse } from '@/types/api';
import { formatError, getToken } from '@/utils/helpers';

import { queryKey, url } from '../url-query';
import { FilterType, TransactionResponse } from '../../types';

export const GetUserTransactions = async (filter?: FilterType) => {
  if (getToken().token) {
    try {
      const response = await axios.get<ApiResponse<TransactionResponse>>(url.getTransactions, { params: { ...filter }});
      return response.data?.data?.transactions;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
  return null;
};

type QueryFnType = typeof GetUserTransactions;

type useGetUserTransactions = Partial<{
  config: QueryConfig<QueryFnType>;
  filter: FilterType;
}>;


export const useGetUserTransactions = ( {config, filter}: useGetUserTransactions) => {

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getUserTransactions(filter),
    queryFn:() => GetUserTransactions(filter),
  });
};
