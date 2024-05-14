import { RouteProps } from "react-router";
import { AppRoutes, Routes } from "@src/shared/enums/AppRoutes";
import MainPage from "@src/pages/MainPage/MainPage";
import AdditionalPage from "@src/pages/AdditionalPage/AdditionalPage";

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: Routes.MAIN,
  [AppRoutes.ADDITIONAL]: Routes.ADDITIONAL,
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.ADDITIONAL]: {
    path: RoutePath.additional,
    element: <AdditionalPage />,
  },
};
