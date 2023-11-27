import App from "@/App";
import About from "@/pages/About";
import CarDetailsPage from "@/pages/CarDetailsPage";
import Cars from "@/pages/Cars";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Contact from "@/pages/Contact";
import AddCar from "@/pages/Dashboard/Admin/AddCar";
import MakeAdmin from "@/pages/Dashboard/Admin/MakeAdmin";
import ManageAllOrders from "@/pages/Dashboard/Admin/ManageAllOrders";
import ManageCars from "@/pages/Dashboard/Admin/ManageCars";
import Dashboard from "@/pages/Dashboard/Dashboard";
import GiveReview from "@/pages/Dashboard/User/GiveReview";
import MyOrders from "@/pages/Dashboard/User/MyOrders";
import ForgetPassword from "@/pages/ForgetPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import MainDashboard from "./MainDashboard";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/cars", element: <Cars /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },

      {
        path: "/cars/:id",
        element: <CarDetailsPage />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <MainDashboard />
          </PrivateRoute>
        ),
      },
      // normal user
      {
        path: "/dashboard/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/review",
        element: (
          <PrivateRoute>
            <GiveReview />
          </PrivateRoute>
        ),
      },

      // admin

      {
        path: "/dashboard/make-admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MakeAdmin />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-car",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddCar />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-cars",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCars />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-all-orders",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageAllOrders />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
