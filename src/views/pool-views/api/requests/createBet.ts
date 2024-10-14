import { axios } from '@/libs/axios';
import { MutationConfig, useMutation } from '@/libs/react-query';
import { APIError } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';
import { toast } from 'sonner';
import { SaveBetDTO } from '../../types';


export const createBet = async (data: SaveBetDTO) => {
  try {
    const response = await axios.post<any>(url.saveBet, data);
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};

type useCreateBet = {
  config?: MutationConfig<typeof createBet>;
};

export const useCreateBet = ({ config }: useCreateBet = {}) => {

  return useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    ...config,
    mutationFn: createBet,
  });
};
