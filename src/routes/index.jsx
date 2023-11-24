import App from "@/App";
import PaymentHome from "@/components/Payment/PaymentHome";
import About from "@/pages/About";
import Cars from "@/pages/Cars";
import Contact from "@/pages/Contact";
import AddProduct from "@/pages/Dashboard/Admin/AddProduct";
import MakeAdmin from "@/pages/Dashboard/Admin/MakeAdmin";
import ManageAllOrders from "@/pages/Dashboard/Admin/ManageAllOrders";
import ManageProducts from "@/pages/Dashboard/Admin/ManageProducts";
import Dashboard from "@/pages/Dashboard/Dashboard";
import GiveReview from "@/pages/Dashboard/User/GiveReview";
import MyOrders from "@/pages/Dashboard/User/MyOrders";
import Payment from "@/pages/Dashboard/User/Payment";
import ForgetPassword from "@/pages/ForgetPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import PlaceOrder from "@/pages/PlaceOrder";
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

      {
        path: "/place-order/:id",
        element: (
          <PrivateRoute>
            <PlaceOrder />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <MainDashboard />
          </>
        ),
      },
      // normal user
      {
        path: "/dashboard/my-orders",
        element: (
          <>
            <MyOrders />
          </>
        ),
      },
      {
        path: "/dashboard/review",
        element: (
          <>
            <GiveReview />
          </>
        ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <>
            <Payment />
          </>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <>
            <PaymentHome />
          </>
        ),
      },
      // admin

      {
        path: "/dashboard/make-admin",
        element: (
          <AdminRoute>
            <MakeAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-products",
        element: (
          <AdminRoute>
            <ManageProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-all-orders",
        element: (
          <AdminRoute>
            <ManageAllOrders />
          </AdminRoute>
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
