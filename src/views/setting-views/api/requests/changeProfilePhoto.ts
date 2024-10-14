import { axios } from '@/libs/axios';
import { MutationConfig, useMutation } from '@/libs/react-query';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/api';

interface Response {
  path: string;
}

export const changeProfilePhoto = async (data: FormData) => {
  try {
    const response = await axios.post<ApiResponse<Response>>(url.addProfilePhoto, data);
    return response.data?.data?.path;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type useChangeProfilePhotoOptions = {
  config?: MutationConfig<typeof changeProfilePhoto>;
};

export const useChangeProfilePhoto = ({ config }: useChangeProfilePhotoOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    mutationFn: changeProfilePhoto,
    ...config,
  });
};
