import { axios } from '@/libs/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/libs/react-query';
import { ApiResponse } from '@/types/api';
import { formatError, getToken } from '@/utils/helpers';

import { queryKey, url } from '../url-query';

interface Response{
  pool: any;
}

export const getPool = async (id: string) => {
  if (getToken().token) {
    try {
      const response = await axios.get<ApiResponse<Response>>(url.getAPools(id));
      return response.data?.data?.pool;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
  return null;
};

type QueryFnType = typeof getPool;

type useGetPoolOptions = Partial<{
  config: QueryConfig<QueryFnType>;
  id: string
}>;

export const useGetPool = ({config, id } : useGetPoolOptions,) => {

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    ...config,
    queryKey: queryKey.getAPool(id as string),
    queryFn:() => getPool(id as string),
  });
};
