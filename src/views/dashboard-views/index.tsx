import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/Elements";

const DashBoard = lazy(() => import(`./Dashboard`));

const DashboardViews = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<DashBoard title="Dashboard" />}
        />
      </Routes>
    </Suspense>
  );
};

export default DashboardViews;
