import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../images/logo.png";
import "./Navigation.css";

// navbar
function Navigation(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mt: 3, px: 2 }}>
      <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <li>
          <NavLink activeClassName="nav-selected" className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <Divider />
        <li>
          <NavLink
            activeClassName="nav-selected"
            className="nav-link"
            to="/cars"
          >
            Cars
          </NavLink>
        </li>
        <Divider />
        <li>
          <NavLink
            activeClassName="nav-selected"
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
        <Divider />
        <li>
          <NavLink
            activeClassName="nav-selected"
            className="nav-link"
            to="/about"
          >
            About
          </NavLink>
        </li>
        <Divider />
        <li>
          <NavLink
            activeClassName="nav-selected"
            className="nav-link"
            to="/contact"
          >
            Contact
          </NavLink>
        </li>
        <Divider />
        <li>
          <NavLink
            activeClassName="nav-selected"
            className="nav-link"
            to="/login"
          >
            Login
          </NavLink>
        </li>
        <Divider />
      </ul>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor: "#F0F4EF", boxShadow: 1, py: 1 }}>
        <Toolbar>
          <Container>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <img className="logo" src={logo} alt="" />
              </Link>

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <nav>
                  <ul style={{ display: "flex" }}>
                    <li>
                      <NavLink
                        activeClassName="nav-selected"
                        className="nav-link"
                        to="/"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        activeClassName="nav-selected"
                        className="nav-link"
                        to="/cars"
                      >
                        Cars
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        activeClassName="nav-selected"
                        className="nav-link"
                        to="/dashboard"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        activeClassName="nav-selected"
                        className="nav-link"
                        to="/about"
                      >
                        About
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        activeClassName="nav-selected"
                        className="nav-link"
                        to="/contact"
                      >
                        Contact
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        activeClassName="nav-selected"
                        className="nav-link"
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </Box>
            </Box>
          </Container>
          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" }, color: "#16425B" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "70%",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mb: 3 }}></Box>
    </Box>
  );
}

Navigation.propTypes = {
  window: PropTypes.func,
};

export default Navigation;
