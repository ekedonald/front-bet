import { axios } from '@/libs/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/libs/react-query';
import { ApiResponse } from '@/types/api';
import { formatError, getToken } from '@/utils/helpers';

import { queryKey, url } from '../url-query';
import { FilterType } from '../../types';

interface Response {
  pools: any;
}
export const getAllPools = async (filter?: FilterType) => {
  if (getToken().token) {
    try {
      const response = await axios.get<ApiResponse<Response>>(url.getAllPools, { params: { ...filter }});
      return response.data?.data?.pools;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
  return null;
};

type QueryFnType = typeof getAllPools;

type useGetAllPools = Partial<{
  config: QueryConfig<QueryFnType>;
  filter: FilterType;
}>;

export const useGetAllPools = ({config, filter}: useGetAllPools) => {

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    ...config,
    queryKey: queryKey.all,
    queryFn:() => getAllPools(filter),
  });
};
