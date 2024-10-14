import { axios } from '@/libs/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/libs/react-query';
import { ApiResponse } from '@/types/api';
import { formatError, getToken } from '@/utils/helpers';

import { queryKey, url } from '../url-query';
import { BetResponse, FilterType } from '../../types';

export const GetUserBets = async (filter?: FilterType) => {
  if (getToken().token) {
    try {
      const response = await axios.get<ApiResponse<BetResponse>>(url.getUserBets, { params: { ...filter }});
      return response.data?.data?.bets;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
  return null;
};

type QueryFnType = typeof GetUserBets;

type useGetUserBets = Partial<{
  config: QueryConfig<QueryFnType>;
  filter: FilterType;
}>;


export const useGetUserBets = ( {config, filter}: useGetUserBets) => {

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getUserBet(filter),
    queryFn:() => GetUserBets(filter),
  });
};
