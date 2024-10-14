import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loading } from "@/components/Elements";
import { SettingMenuNav } from "./SettingNav";
import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";

const Profile = lazy(() => import(`./Profile`));
const Password = lazy(() => import(`./Password`));
const breadcrumbItems = [
  { label: 'Setting', link: '#' },
];

const SettingViews = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="deposit-wrapper">
        <div className="">
          <h4 className="text-2xl mb-5">Settings</h4>
          <Breadcrumbs items={breadcrumbItems} />
          <h5 className="font-extralight text-sm">Take a look at your policies and the new policy to see what is covered</h5>
          <SettingMenuNav />
        </div>
      </div>
      <div className="bg-white mt-5 dark:bg-bgDark-800 shadow-md lg:p-10 rounded-xl">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="profile" replace />}
          />
          <Route
            path="/profile"
            element={<Profile title="Profile Settings" />}
          />
          <Route
            path="/change-password"
            element={<Password title="Change your password" />}
          />
        </Routes>
      </div>
    </Suspense>
  );
};

export default SettingViews;
