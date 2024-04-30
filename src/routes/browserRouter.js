import Layout from "components/layouts";
import { Dashboard, Login, ForgotPassword } from "pages";
import { Welcome } from "pages/Welcome";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);

export default router;
