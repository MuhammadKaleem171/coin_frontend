// import Layout from "components/layouts";
// import { Dashboard, Login, ForgotPassword } from "pages";
// import { Welcome } from "pages/Welcome";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Detail from "../screens/Detail";
import Login from "../screens/Login";
import Main from "../screens/Main";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/detail" element={<Detail />} />
      {/* <Route element={<Layout />}>
        <Route path="/home" element={<Main />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Welcome />
      
      } />

       
         />
      </Route> */}
    </>
  )
);

export default router;
