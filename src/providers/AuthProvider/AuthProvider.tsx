import * as React from 'react';
import { ReactNode, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '@/components/Elements';
import { useCurrentUser } from '@/views/auth-views/api/requests/getUser';
import { useLogout } from '@/views/auth-views/api';
import { resetAllStores } from '@/libs/zustand';
import { clearStorageValues, getToken } from '@/utils/helpers';
import storage from '@/utils/storage';

import authReducer from './mutations';
import { Dispatch, State } from './types';
import { toast } from 'sonner';

type AuthProviderProps = { children: React.ReactNode };

const initialState: State = {
  isLoggedIn: !!getToken().token || !!getToken().refresh_token,
  activeRole: undefined,
  user: undefined,
  error: undefined,
  isLoading: false,
};

type ContextType = {
  state: State;
  actions: {
    logout: (callback_url?: string, message?: ReactNode) => void;
  };
  dispatch: Dispatch;
};

export const AuthStateContext = React.createContext<ContextType | undefined>(undefined);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(authReducer, { ...initialState });
  const navigate = useNavigate();

  const getProfileQuery = useCurrentUser();

  const { data: userData, isLoading, isError } = getProfileQuery;

  const { mutate: logoutMutate, isPending: logoutLoading } = useLogout();

  const isAppLoading = getProfileQuery.isLoading;

  const USER_ROLES = state.user?.roles;

  const chooseRole = React.useCallback(
    (role_id: number | string) => {
      storage.setValue('active-role', role_id);

      const activeRole = USER_ROLES?.find(({ id }) => id === role_id);
      dispatch({
        type: 'SET_ACTIVE_ROLE_SUCCESS',
        payload: activeRole,
      });
    },
    [USER_ROLES]
  );

  const logout = useCallback(
    (
      callback_url?: string,
      message: ReactNode = (
        <>
          You&apos;ve successfully logged out.
          <br /> We hope to see you again soon.
        </>
      )
    ) => {
      logoutMutate(undefined, {
        onSettled(_: any, error: any) {
          clearStorageValues();
          resetAllStores();

          dispatch({ type: 'LOGOUT_SUCCESS' });
          navigate(callback_url || '/', { replace: true });

          toast.success(message);
        },
      });
    },
    [logoutMutate, navigate, toast]
  );

  useEffect(() => {
    if(!isLoading){
      const user = userData?.user;
      if (!state.user && !isError) {
        if (!isLoading && user) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: user,
          });
        }
      } else if (isError && state.isLoggedIn) {
        logout();
      }
    }
  }, [state.user, state.isLoggedIn, isLoading]);


  const value = React.useMemo(
    () => ({
      state,
      actions: {
        logout,
      },
      dispatch,
    }),
    [logout, state]
  );

  useEffect(() => {
    if (state.user) {
      const activeRoleId = storage.getValue('active-role');
      if (activeRoleId) {
        chooseRole(activeRoleId);
      } else if (USER_ROLES?.length === 1) {
        chooseRole(USER_ROLES?.[0].id);
      }
    }
  }, [USER_ROLES, chooseRole, state.user]);

  if (isAppLoading || logoutLoading) {
    return <Loading />;
  }

  return <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>;
};
