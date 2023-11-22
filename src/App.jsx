import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/roboto/400.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import useDocumentTitle from "./hooks/useDocumentTitle";
import Layout from "./layouts/Layout";

const App = () => {
  useDocumentTitle("Carx - Affordability at your fingertip", false);
  return (
    <div>
      <Layout />
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
    </div>
  );
};

export default App;
