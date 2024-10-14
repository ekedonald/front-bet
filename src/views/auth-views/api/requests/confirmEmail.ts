import { useAuth } from '@/libs/auth';
import { axios } from '@/libs/axios';
import { MutationConfig, useMutation } from '@/libs/react-query';
import { APIError, ApiResponse, GenericResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';

export type ConfirmEmailDTO = {
  code: string;
  type: number;
};

export const confirmEmail = async (data: ConfirmEmailDTO) => {
  try {
    const response = await axios.post<GenericResponse>(url.confirmEmail, data);
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

type UseConfirmEmailOptions = {
  config?: MutationConfig<typeof confirmEmail>;
};

export const useConfirmEmail = ({ config }: UseConfirmEmailOptions = {}) => {

  const {
    actions: { updateAuthUser },
  } = useAuth();

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      updateAuthUser({ email_verified_at: Date() });
    },
    ...config,
    mutationFn: confirmEmail,
  });
};

export const resendVerificationEmail = async () => {
  try {
    const response = await axios.get<ApiResponse<{ data: { success: boolean } }>>(
      url.resendVerificationEmail
    );
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};
