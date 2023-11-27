import CartBadge from "@/components/Shared/CartBadge";
import useFirebase from "@/hooks/useFirebase";
import logo from "@/images/logo.png";
import styles from "@/styles/Navbar.module.css";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { logOut } = useFirebase();

  useEffect(() => {
    const checkScroll = () => {
      if (typeof document !== "undefined") {
        if (document.documentElement.scrollTop >= 200) {
          setIsScrolling(true);
        } else {
          setIsScrolling(false);
        }
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("scroll", checkScroll);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mt: 3, px: 2 }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? styles.navSelected : styles.navLink
          }
          to="/"
        >
          Home
        </NavLink>

        <Divider />

        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? styles.navSelected : styles.navLink
          }
          to="/cars"
        >
          Cars
        </NavLink>

        <Divider />

        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? styles.navSelected : styles.navLink
          }
          to="/about"
        >
          About
        </NavLink>

        <Divider />

        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? styles.navSelected : styles.navLink
          }
          to="/contact"
        >
          Contact
        </NavLink>

        <Divider />

        <>
          {!user?.email ? (
            <NavLink
              className={(navInfo) =>
                navInfo.isActive ? styles.navSelected : styles.navLink
              }
              to="/login"
              style={{ display: "flex", alignItems: "center" }}
            >
              Login
              <LoginIcon sx={{ ml: 1 }} />
            </NavLink>
          ) : (
            <Box>
              <NavLink
                className={(navInfo) =>
                  navInfo.isActive ? styles.navSelected : styles.navLink
                }
                to="/dashboard"
              >
                Dashboard
              </NavLink>
              <Divider />
              {/* //!need to work on this */}
              {/* {user?.email && (
               <p className={styles.navLink}>{user?.displayName}</p>
             )}
        
             {user?.photoURL && (
               <img
                 style={{ width: 50, borderRadius: "50%" }}
                 src={user.photoURL}
                 alt=""
               />
             )} */}
              <Divider />
              <Button
                onClick={logOut}
                variant="outlined"
                endIcon={<LogoutIcon />}
              >
                Log Out
              </Button>
            </Box>
          )}
        </>

        <Divider />
      </nav>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar
        position={isScrolling ? "fixed" : "sticky"}
        sx={{
          py: 1,
          transition: "all ease-in-out 0.5s",
          transform: isScrolling ? "translateY(0)" : "translateY(0)",
          top: isScrolling ? 0 : "-100%",
        }}
      >
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
                <img className={styles.logo} src={logo} alt="" />
              </Link>

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <nav
                  className={styles.navbar}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive ? styles.navSelected : styles.navLink
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive ? styles.navSelected : styles.navLink
                    }
                    to="/cars"
                  >
                    Cars
                  </NavLink>

                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive ? styles.navSelected : styles.navLink
                    }
                    to="/about"
                  >
                    About
                  </NavLink>
                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive ? styles.navSelected : styles.navLink
                    }
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                  {!user?.email ? (
                    <NavLink
                      className={(navInfo) =>
                        navInfo.isActive ? styles.navSelected : styles.navLink
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
                          navInfo.isActive ? styles.navSelected : styles.navLink
                        }
                        to="/dashboard"
                      >
                        Dashboard
                      </NavLink>
                      {/* //!need to work on this */}

                      {/* {user?.email && (
                        <span className={styles.navLink}>
                          {user?.displayName}
                        </span>
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
                      )} */}
                      <Button
                        onClick={logOut}
                        variant="outlined"
                        endIcon={<LogoutIcon />}
                      >
                        Log Out
                      </Button>
                    </Box>
                  )}

                  <CartBadge />
                </nav>
              </Box>
            </Box>
          </Container>
          <Box
            // edge="end"
            // onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, color: "secondary.main" }}
          >
            <CartBadge />
          </Box>
          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { md: "none" }, color: "secondary.main" }}
          >
            {" "}
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
    </Box>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
