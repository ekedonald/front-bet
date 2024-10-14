import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/Elements";

const Deposit = lazy(() => import(`./Deposit`));

const DepositViews = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Deposit title="Deposit" />}
        />
      </Routes>
    </Suspense>
  );
};

export default DepositViews;
