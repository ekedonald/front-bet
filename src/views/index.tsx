import { Route, Routes } from "react-router-dom";
// import Error404 from "@/views/errors/404";
import AuthLayout from "@/layouts/auth-layout";
import { AuthProvider } from "@/providers";
import { DASHBOARD_PREFIX_PATH, DEPOSIT_PREFIX_PATH, HELP_PREFIX_PATH, POOL_PREFIX_PATH, SETTING_PREFIX_PATH, STAKE_PREFIX_PATH, TRANSACTION_PREFIX_PATH, VERIFY_EMAIL_PREFIX_PATH, WITHDRAW_PREFIX_PATH } from "@/config";
import { TopDashboardLayout } from "@/layouts/dashboard-layout/Dashboard";
import { PoolLayout } from "@/layouts/pool-layout";
import { VerifyEmailLayout } from "@/layouts/auth-layout/VerifyEmail";
import AuthMiddleWare from "@/middlewares/authMiddleWare";
import GuestMiddleWare from "@/middlewares/guestMiddleWare";
import { DepositLayout } from "@/layouts/deposit-layout";
import { WithdrawLayout } from "@/layouts/withdraw-layout";
import { TransactionLayout } from "@/layouts/transaction-layout";
import { StakeLayout } from "@/layouts/stake-layout";
import { SettingLayout } from "@/layouts/setting-layout";
import { HelpLayout } from "@/layouts/help-layout";

const Views = () => {

  return (
    <>
      <AuthProvider>

        <Routes>
          <Route
            element={
              <GuestMiddleWare />
            }
          >
            <Route
              path="/*"
              element={<AuthLayout />}
            />
          </Route>
          <Route
            element={
              <AuthMiddleWare />
            }
          >
            <Route
              path={`${DASHBOARD_PREFIX_PATH}/*`}
              element={
                <TopDashboardLayout />
              }
            />
            <Route
              path={`${DEPOSIT_PREFIX_PATH}/*`}
              element={
                <DepositLayout />
              }
            />
            <Route
              path={`${SETTING_PREFIX_PATH}/*`}
              element={
                <SettingLayout />
              }
            />
            <Route
              path={`${WITHDRAW_PREFIX_PATH}/*`}
              element={
                <WithdrawLayout />
              }
            />
            <Route
              path={`${TRANSACTION_PREFIX_PATH}/*`}
              element={
                <TransactionLayout />
              }
            />
            <Route
              path={`${STAKE_PREFIX_PATH}/*`}
              element={
                <StakeLayout />
              }
            />
            <Route
              path={`${DASHBOARD_PREFIX_PATH}/*`}
              element={
                <VerifyEmailLayout />
              }
            />
            <Route
              path={`${POOL_PREFIX_PATH}/*`}
              element={
                <PoolLayout />
              }
            />
            <Route
              path={`${VERIFY_EMAIL_PREFIX_PATH}/*`}
              element={
                <VerifyEmailLayout />
              }
            />
            <Route
              path={`${HELP_PREFIX_PATH}/*`}
              element={
                <HelpLayout />
              }
            />
          </Route>
          {/* <Route path="*" element={<Error404 title="Page not found" />} /> */}
        </Routes>
      </AuthProvider>
    </>
  );
};


export default Views;
