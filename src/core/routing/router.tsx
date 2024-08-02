import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Root Layout
import Layout from "../layout/Layout";

// Pages
import Surahs from "../../pages/Surahs/Surahs";
import SurahDetails from "../../pages/SurahDetails/SurahDetails";
import Juzs from "../../pages/Juzs/Juzs";
import Pages from "../../pages/Pages/Pages";
import Quran from "../../pages/Quran/Quran";
import ErrorPage from "../../pages/ErrorPage";

// Routes enum
import { Routes } from "./routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />} errorElement={<ErrorPage />}>
      <Route path={Routes.SURAHS} element={<Surahs />} />
      <Route path={`${Routes.SURAHS}/:surahId`} element={<SurahDetails />} />
      <Route path={Routes.JUZS} element={<Juzs />} />
      <Route path={Routes.PAGES} element={<Pages />} />
      <Route path={Routes.QURAN} element={<Quran />} />
    </Route>
  )
);

export const RouteProvider = () => <RouterProvider router={router} />;
