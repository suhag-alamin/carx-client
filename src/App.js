import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/roboto/400.css";
import Payment from "@mui/icons-material/Payment";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import useAuth from "./hooks/useAuth";
import useDocumentTitle from "./hooks/useDocumentTitle";
import About from "./Pages/About/About/About";
import Cars from "./Pages/Cars/Cars/Cars";
import Contact from "./Pages/Contact/Contact/Contact";
import AddProduct from "./Pages/Dashboard/AddProduct/AddProduct";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import GiveReview from "./Pages/Dashboard/GiveReview/GiveReview";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import ManageAllOrders from "./Pages/Dashboard/ManageAllOrders/ManageAllOrders";
import ManageProducts from "./Pages/Dashboard/ManageProducts/ManageProducts";
import MyOrders from "./Pages/Dashboard/MyOrders/MyOrders";
import PaymentHome from "./Pages/Dashboard/Payment/PaymentHome";
import Home from "./Pages/Home/Home/Home";
import AdminRoute from "./Pages/Login/AdminRoute/AdminRoute";
import ForgetPassword from "./Pages/Login/ForgetPassword/ForgetPassword";
import Login from "./Pages/Login/Login/Login";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import Register from "./Pages/Login/Register/Register";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder/PlaceOrder";

// api link : https://afternoon-tor-94038.herokuapp.com/

// customize theme colors

const theme = createTheme({
  palette: {
    primary: {
      main: "#457B9D",
    },
    secondary: {
      main: "#16425B",
    },
    info: {
      main: "#F0F4EF",
    },
  },

  background: {
    default: "#F0F4EF",
  },
});

function App() {
  useDocumentTitle("Carx - Affordability at your fingertip", false);
  const { admin } = useAuth();
  return (
    <div className="App">
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Router>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/cars" element={<Cars />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route
                  exact
                  path="/forgetPassword"
                  element={<ForgetPassword />}
                />

                <Route
                  exact
                  path="/placeOrder/:id"
                  element={
                    <PrivateRoute>
                      <PlaceOrder />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                >
                  {/* normal user */}
                  {!admin && <Route path="/dashboard" element={<MyOrders />} />}
                  <Route path="myOrders" element={<MyOrders />} />

                  <Route path={`review`} element={<GiveReview />} />

                  <Route path={`payment`} element={<Payment />} />

                  <Route path={`payment/:id`} element={<PaymentHome />} />

                  {/* admin  */}

                  {admin && (
                    <Route
                      exact
                      path="/dashboard"
                      element={<ManageAllOrders />}
                    />
                  )}

                  <Route
                    path={`makeAdmin`}
                    element={
                      <AdminRoute>
                        <MakeAdmin />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path={`manageAllOrders`}
                    element={
                      <AdminRoute>
                        <ManageAllOrders />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path={`manageProducts`}
                    element={
                      <AdminRoute>
                        <ManageProducts />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path={`addProduct`}
                    element={
                      <AdminRoute>
                        <AddProduct />
                      </AdminRoute>
                    }
                  />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </CssBaseline>
    </div>
  );
}

export default App;
