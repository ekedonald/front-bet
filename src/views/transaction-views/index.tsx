import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/Elements";

const Transaction = lazy(() => import(`./Transaction`));
const SingleTransaction = lazy(() => import(`./SingleTransaction`));

const TransactionView = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Transaction title="Transactions" />}
        />
        <Route
          path="/:id"
          element={<SingleTransaction title="Transaction details" />}
        />
      </Routes>
    </Suspense>
  );
};

export default TransactionView;
