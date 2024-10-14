/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { ReactComponent as AccessDeniedIllustration } from '@/assets/illustrations/access-denied.svg';
import { useAuth } from '@/libs/auth';

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
  SOLUTION = 'solution',
}

export enum ACTIONS {
  MANAGE = 'manage', // all actions
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

type RoleTypes = keyof typeof ROLES | undefined;
// type ActionTypes = keyof typeof ACTIONS;

export const PERMISSIONS = {
  'comment:delete': '',
};

export const useAuthorization = () => {
  const { user, activeRole } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      toast.error('You are not logged in');
      navigate('/');
    }
  }, [navigate, toast, user]);

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: any[] }) => {
      if (allowedRoles && allowedRoles.length > 0 && activeRole) {
        return allowedRoles?.includes(activeRole?.name);
      }
      return true;
    },
    [activeRole?.name]
  );

  return { checkAccess, role: activeRole };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      checkPermission?: never;
    }
  | {
      allowedRoles?: never;
      checkPermission: boolean;
    }
);

const DefaultErrorFallback = () => {
  return (
    <div className="inline-flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-6 text-center">
      <h2 className="text-3xl font-medium">Access Denied</h2>
      <p className="mx-auto max-w-md">
        You need to upgrade your subscription plan to access this step
      </p>
      {/* <AccessDeniedIllustration className="mt-4 w-full" /> */}
    </div>
  );
};

export const Authorization = ({
  checkPermission,
  allowedRoles,
  forbiddenFallback = <DefaultErrorFallback />,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof checkPermission !== 'undefined') {
    canAccess = checkPermission;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
