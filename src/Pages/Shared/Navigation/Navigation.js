import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Container } from "@mui/material";
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
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/logo.png";
import "./Navigation.css";

// navbar
function Navigation(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { user, logOut } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mt: 3, px: 2 }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? "nav-selected" : "nav-link"
          }
          to="/home"
        >
          Home
        </NavLink>

        <Divider />

        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? "nav-selected" : "nav-link"
          }
          to="/cars"
        >
          Cars
        </NavLink>

        <Divider />

        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? "nav-selected" : "nav-link"
          }
          to="/about"
        >
          About
        </NavLink>

        <Divider />

        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? "nav-selected" : "nav-link"
          }
          to="/contact"
        >
          Contact
        </NavLink>

        <Divider />

        {!user?.email ? (
          <NavLink
            className={(navInfo) =>
              navInfo.isActive ? "nav-selected" : "nav-link"
            }
            to="/login"
            style={{ display: "flex", alignItems: "center" }}
          >
            Login
            <LoginIcon sx={{ ml: 1 }} />
          </NavLink>
        ) : (
          <Box sx={{}}>
            <NavLink
              className={(navInfo) =>
                navInfo.isActive ? "nav-selected" : "nav-link"
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <Divider />
            {user?.email && <p className="nav-link">{user?.displayName}</p>}

            {user?.photoURL && (
              <img
                style={{ width: 50, borderRadius: "50%" }}
                src={user.photoURL}
                alt=""
              />
            )}
            <Divider />
            <Button
              onClick={logOut}
              sx={{ color: "#16425b" }}
              variant="text"
              endIcon={<LogoutIcon />}
            >
              Log Out
            </Button>
          </Box>
        )}

        <Divider />
      </nav>
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
                <nav
                  className="navbar"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive ? "nav-selected" : "nav-link"
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive ? "nav-selected" : "nav-link"
                    }
                    to="/cars"
                  >
                    Cars
                  </NavLink>

                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive ? "nav-selected" : "nav-link"
                    }
                    to="/about"
                  >
                    About
                  </NavLink>
                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive ? "nav-selected" : "nav-link"
                    }
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                  {!user?.email ? (
                    <NavLink
                      className={(navInfo) =>
                        navInfo.isActive ? "nav-selected" : "nav-link"
                      }
                      to="/login"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Login
                      <LoginIcon sx={{ ml: 1 }} />
                    </NavLink>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <NavLink
                        className={(navInfo) =>
                          navInfo.isActive ? "nav-selected" : "nav-link"
                        }
                        to="/dashboard"
                      >
                        Dashboard
                      </NavLink>
                      {user?.email && (
                        <span className="nav-link">{user?.displayName}</span>
                      )}
                      {user?.photoURL && (
                        <img
                          style={{
                            width: 50,
                            borderRadius: "50%",
                            marginRight: 10,
                          }}
                          src={user.photoURL}
                          alt=""
                        />
                      )}
                      <Button
                        onClick={logOut}
                        sx={{ color: "#16425b" }}
                        variant="text"
                        endIcon={<LogoutIcon />}
                      >
                        Log Out
                      </Button>
                    </Box>
                  )}
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
