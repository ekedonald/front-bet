import { useQuery } from '@tanstack/react-query';

import { axios } from '@/libs/axios';
import { QueryConfig, ExtractFnReturnType } from '@/libs/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url, queryKey } from '../url-query';
import { toast } from 'sonner';

export type ConfirmEmailDTO = {
  code: string;
};

export type ResendVerificationEmailDTO = {
  type: number;
}

export const resendVerificationEmail = async () => {
  const data: ResendVerificationEmailDTO = {
    type: 1,
  };
  try {
    const response = await axios.post<ApiResponse<{ data: { success: boolean } }>>(
      url.resendVerificationEmail,
      data
    );
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};

type QueryFnType = typeof resendVerificationEmail;

type useResendVerificationEmailOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useResendVerificationEmail = ({ config }: useResendVerificationEmailOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    onError: (err: any) => {
      toast.error(err.message);
    },
    onSuccess: (res: any) => {
      toast.success(res.message);
    },
    ...config,
    queryKey: queryKey.resendVerificationEmail(),
    queryFn: resendVerificationEmail,
  });
};
