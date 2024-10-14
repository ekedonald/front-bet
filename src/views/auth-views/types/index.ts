import { ROLES, ACTIONS } from '@/libs/authorization';
import { ApiResponse } from '@/types/api';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type TokenResponse = {
  accessToken: string;
  expires: number;
  refreshToken: string;
};

export type RefreshTokenResponse = ApiResponse<{
  accessToken: string;
  expires: number;
  refreshToken: string;
}>;

export type UserResponse = ApiResponse<{
  token: TokenResponse;
  user: AuthUser;
  message: string;
}>;

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
};

export type ForgotPasswordCredentialsDTO = {
  email: string;
};

export type ForgotPasswordCodeCredentialsDTO = {
  code: number;
};

export type AuthRoleAction = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  action: ACTIONS;
  subject: string;
  description: string;
};

export type AuthUser = {
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: string | null;
  avatar?: string;
  balance: string,
  roles?: AuthRole[];
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  avatar?: string;
};

export type AuthRole = {
  id: string | number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  guard_name: string;
  description: string | null;
  actions: AuthRoleAction[];
};