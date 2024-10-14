import { axios } from '@/libs/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/libs/react-query';
import { ApiResponse } from '@/types/api';
import { formatError, getToken } from '@/utils/helpers';

import { queryKey, url } from '../url-query';

interface Response{
  bet: any;
}

export const getUserBet = async (id: string) => {
  if (getToken().token) {
    try {
      const response = await axios.get<ApiResponse<Response>>(url.getUserBet(id));
      return response.data?.data?.bet;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
  return null;
};

type QueryFnType = typeof getUserBet;

type useGetUserBetOptions = Partial<{
  config?: QueryConfig<QueryFnType>;
  id: string;
}>;

export const useGetUserBet = ( { config, id } : useGetUserBetOptions,) => {

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    ...config,
    queryKey: queryKey.getUserBet(),
    queryFn:() => getUserBet(id as string),
  });
};
