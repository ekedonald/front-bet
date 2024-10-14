import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/libs/auth";
import { useCallback } from "react";
import storage from "@/utils/storage";

interface AuthMiddlewareProps {
}

const AuthMiddleWare: React.FC<AuthMiddlewareProps> = () => {

  const { user, isLoggedIn } = useAuth();
  const location = useLocation();


  const saveRoute = useCallback(
    () => storage.session.setValue('redirect-path', location),
    [location]
  );

  
  
  if (isLoggedIn) {
    // if (user && !user.email_verified_at) {
    //   saveRoute();
    //   return <Navigate to="/confirm-email" replace />;
    // }
    
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
};

export default AuthMiddleWare;
