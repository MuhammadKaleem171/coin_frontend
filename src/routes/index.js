import {
  //  Navigate, Outlet,
  RouterProvider,
} from "react-router-dom";
import router from "./browserRouter";

const MainRoutes = () => {
  // const { accessToken, user } = useSelector((state) => state.auth)
  return <RouterProvider router={router} />;
};

export default MainRoutes;
