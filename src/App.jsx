import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/roboto/400.css";
import "./App.css";
import useDocumentTitle from "./hooks/useDocumentTitle";
import Layout from "./layouts/Layout";

const App = () => {
  useDocumentTitle("Carx - Affordability at your fingertip", false);
  return (
    <div>
      <Layout />
    </div>
  );
};

export default App;
