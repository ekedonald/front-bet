import { useAuth } from '@/libs/auth';
import { axios } from '@/libs/axios';
import { MutationConfig, useMutation } from '@/libs/react-query';
import { persistToken, formatError } from '@/utils/helpers';

import { UserResponse } from '@/views/auth-views/types';
import { url } from '../url-query';
import { toast } from 'sonner';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO) => {
  try {
    const response = await axios.post<UserResponse>(url.login, data);
    return response.data;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type UseLoginOptions = {
  config?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const useLoginWithEmailAndPassword = ({ config }: UseLoginOptions = {}) => {
  const {
    actions: { authSuccess },
  } = useAuth();

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (res, req) => {
      persistToken(res.data?.token, req.rememberMe);

      authSuccess(res.data?.user);

      toast.success(res.data.message);
    },
    mutationFn: loginWithEmailAndPassword,
    ...config,
  });
};
