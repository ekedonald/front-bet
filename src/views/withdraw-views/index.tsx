import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/Elements";

const Withdraw = lazy(() => import(`./Withdraw`));

const WithdrawViews = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Withdraw title="Withdraw" />}
        />
      </Routes>
    </Suspense>
  );
};

export default WithdrawViews;
