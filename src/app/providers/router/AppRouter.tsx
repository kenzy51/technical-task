import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "./routerConfig";
import { Loader } from "@src/shared/ui/loader";

export const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route path={path} key={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};
