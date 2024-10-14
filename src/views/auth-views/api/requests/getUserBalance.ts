import { axios } from '@/libs/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/libs/react-query';
import { ApiResponse } from '@/types/api';
import { formatError, getToken } from '@/utils/helpers';

import { queryKey, url } from '../url-query';

interface Response {
  balance: number;
}

export const getUserBalance = async () => {
  if (getToken().token) {
    try {
      const response = await axios.get<ApiResponse<Response>>(url.balance);
      return response.data?.data?.balance;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
  return null;
};

type QueryFnType = typeof getUserBalance;

type useGetUserBalance = QueryConfig<QueryFnType>;

export const useGetUserBalance = (config?: useGetUserBalance) => {

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    ...config,
    queryKey: queryKey.balance,
    queryFn: getUserBalance,
  });
};
