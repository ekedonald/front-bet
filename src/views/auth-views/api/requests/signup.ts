import { useAuth } from '@/libs/auth';
import { axios } from '@/libs/axios';
import { MutationConfig, useMutation, useQueryClient } from '@/libs/react-query';
import { APIError } from '@/types/api';
import { formatError, persistToken } from '@/utils/helpers';

import { RegisterCredentialsDTO, UserResponse } from '../../types';
import { queryKey, url } from '../url-query';
import { toast } from 'sonner';


export const signup = async (data: RegisterCredentialsDTO) => {
  try {
    const response = await axios.post<UserResponse>(url.signup, data);
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};

type UseSignUpOptions = {
  config?: MutationConfig<typeof signup>;
};

export const useSignUp = ({ config }: UseSignUpOptions = {}) => {
  const queryClient = useQueryClient();

  const {
    actions: { authSuccess },
  } = useAuth();

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (res) => {
      persistToken(res.data.token, true);
      authSuccess(res.data.user);

      queryClient.setQueryData(queryKey.getUser(), {
        data: res.data.user,
        message: 'User fetched successfully',
        success: 200,
      });

      toast.success(res.data.MESSAGE);
    },
    ...config,
    mutationFn: signup,
  });
};
