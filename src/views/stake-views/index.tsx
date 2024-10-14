import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/Elements";

const Stake = lazy(() => import(`./Stake`));
const SingleStake = lazy(() => import(`./SingleStake`));

const StakeViews = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Stake title="Stake" />}
        />
        <Route
          path="/:id"
          element={<SingleStake title="Bet Details" />}
        />
      </Routes>
    </Suspense>
  );
};

export default StakeViews;
