import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/Elements";

const Pool = lazy(() => import(`./Pool`));
const SinglePool = lazy(() => import(`./SinglePool`));

const PoolView = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Pool title="Pool" />}
        />
        <Route
          path="/:poolID"
          element={<SinglePool title="Create a bet" />}
        />
      </Routes>
    </Suspense>
  );
};

export default PoolView;
