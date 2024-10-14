import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/Elements";

const Login = lazy(() => import(`./Login`));
const Register = lazy(() => import(`./Register`));
const Forgot = lazy(() => import(`./Forgot`));
const ResetPassword = lazy(() => import(`./ResetPassword`));

const AuthViews = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Login title="Login" />}
        />
        <Route
          path="/register"
          element={<Register title="Create an account" />}
        />
        <Route
          path="/forgot-password"
          element={<Forgot title="Forgot Password" />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword title="Choose a new password" />}
        />
      </Routes>
    </Suspense>
  );
};

export default AuthViews;
