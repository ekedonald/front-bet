import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { queryKey as authQueryKey } from '@/views/auth-views/api';
import { AuthUser } from '@/views/auth-views/types';
import { AuthStateContext } from '@/providers';

// import { useLogin, useUser } from './auth';

export const useAuth = () => {
  const authContext = useContext(AuthStateContext);
  const queryClient = useQueryClient();

  if (authContext === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  const { state: authState, dispatch: authDispatch, actions: authActions } = authContext;

  const value = {
    ...authState,

    actions: {
      authSuccess: (data: AuthUser) => {
        authDispatch({ type: 'LOGIN_SUCCESS', payload: data });
        queryClient.setQueryData(authQueryKey.getUser(), {
          data,
          message: 'User fetched successfully',
          success: 200,
        });
      },

      updateAuthUser: (data: Partial<AuthUser>) => {
        authDispatch({ type: 'UPDATE_USER_SUCCESS', payload: data });
        queryClient.setQueryData(authQueryKey.getUser(), {
          data: { ...authState.user, ...data },
          message: 'User fetched successfully',
          success: 200,
        });
      },

      logout: (callback_url?: string | undefined, message?: React.ReactNode) => {
        authActions.logout(callback_url, message);
      },

      // ...actions,
    },
  };

  return value;
};
