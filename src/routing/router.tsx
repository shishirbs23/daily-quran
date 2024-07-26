import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Root Layout
import Layout from "../core/layout/Layout";

// Pages
import Surahs from "../pages/Surahs";
import SurahDetails from "../pages/SurahDetails";
import Juzs from "../pages/Juzs";
import Quran from "../pages/Quran";
import ErrorPage from "../pages/ErrorPage";

// Routes enum
import { Routes } from "./routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />} errorElement={<ErrorPage />}>
      <Route path={Routes.SURAHS} element={<Surahs />} />
      <Route path={`${Routes.SURAHS}/:surahId`} element={<SurahDetails />} />
      <Route path={Routes.JUZS} element={<Juzs />} />
      <Route path={Routes.QURAN} element={<Quran />} />
    </Route>
  )
);

export const RouteProvider = () => <RouterProvider router={router} />;
