import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/Elements";
import Introduction from "./Introduction";
import GettingStarted from "./GettingStarted";
import FAQ from "./FAQ";

const Help = lazy(() => import(`./Help`));

const HelpViews = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Help title="Help" />}
        />
        <Route path="introduction" element={<Introduction />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="faq" element={<FAQ />} />
      </Routes>
    </Suspense>
  );
};

export default HelpViews;
