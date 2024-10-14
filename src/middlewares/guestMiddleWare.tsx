import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARD_PREFIX_PATH } from "@/config";
import { useAuth } from "@/libs/auth";
import storage from '@/utils/storage';

const GuestMiddleWare = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={storage.session.getValue('redirect-path') || DASHBOARD_PREFIX_PATH} replace />;
  }

  return <Outlet />
};

export default GuestMiddleWare;
