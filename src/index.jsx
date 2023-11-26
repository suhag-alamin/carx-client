import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import theme from "./theme/themeConfig";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <RouterProvider router={routes} />
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
          </ThemeProvider>
        </CssBaseline>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
