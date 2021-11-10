import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/roboto/400.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import useDocumentTitle from "./hooks/useDocumentTitle";
import About from "./Pages/About/About/About";
import Contact from "./Pages/Contact/Contact/Contact";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Services from "./Pages/Services/Services/Services";

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
  return (
    <div className="App">
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route exact path="/home">
                <Home></Home>
              </Route>
              <Route exact path="/about">
                <About></About>
              </Route>
              <Route exact path="/contact">
                <Contact></Contact>
              </Route>
              <Route exact path="/services">
                <Services></Services>
              </Route>
              <Route exact path="/login">
                <Login></Login>
              </Route>
              <Route exact path="/register">
                <Register></Register>
              </Route>
              <Route path="/dashboard">
                <Dashboard></Dashboard>
              </Route>
              <Route path="*">
                <PageNotFound></PageNotFound>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </CssBaseline>
    </div>
  );
}

export default App;