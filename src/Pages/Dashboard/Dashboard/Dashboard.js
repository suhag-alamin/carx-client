import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BorderClearIcon from "@mui/icons-material/BorderClear";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PaymentIcon from "@mui/icons-material/Payment";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import { Button, CircularProgress } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AdminRoute from "../../Login/AdminRoute/AdminRoute";
import AddProduct from "../AddProduct/AddProduct";
import GiveReview from "../GiveReview/GiveReview";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import ManageAllOrders from "../ManageAllOrders/ManageAllOrders";
import ManageProducts from "../ManageProducts/ManageProducts";
import MyOrders from "../MyOrders/MyOrders";
import Payment from "../Payment/Payment";

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logOut, admin, isLoading } = useAuth();
  const { path, url } = useRouteMatch();

  // loading spinner
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          py: 1,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box>
          {user?.photoURL ? (
            <div>
              <img
                style={{ width: 70, borderRadius: "50%", marginBottom: 5 }}
                src={user?.photoURL}
                alt=""
              />
              <p>{user?.displayName}</p>
            </div>
          ) : (
            <p>{user?.displayName}</p>
          )}
        </Box>
      </Toolbar>
      <Divider />

      <ListItem color="primary" button>
        <ListItemIcon>
          <HomeIcon color="primary" />
        </ListItemIcon>
        <ListItemText
          as={NavLink}
          to="/"
          color="primary"
          sx={{ color: "#457B9D" }}
          activeClassName="nav-selected"
          primary="Home"
        />
      </ListItem>
      <ListItem color="primary" button>
        <ListItemIcon>
          <DashboardIcon color="primary" />
        </ListItemIcon>
        <ListItemText
          as={NavLink}
          to={`${url}`}
          color="primary"
          sx={{ color: "#457B9D" }}
          activeClassName="nav-selected"
          primary="Dashboard"
        />
      </ListItem>
      {/* normal user  */}
      {!admin && (
        <Box>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={NavLink}
              to={`${url}/myOrders`}
              sx={{ color: "#457B9D" }}
              activeClassName="nav-selected"
              primary="My Orders"
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <PaymentIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={NavLink}
              to={`${url}/payment`}
              sx={{ color: "#457B9D" }}
              activeClassName="nav-selected"
              primary="Pay"
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <RateReviewIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={NavLink}
              to={`${url}/review`}
              sx={{ color: "#457B9D" }}
              activeClassName="nav-selected"
              primary="Review"
            />
          </ListItem>
        </Box>
      )}

      {/* admin  */}
      {admin && (
        <Box>
          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettingsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={NavLink}
              to={`${url}/makeAdmin`}
              sx={{ color: "#457B9D" }}
              activeClassName="nav-selected"
              primary="Make Admin"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BorderClearIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={NavLink}
              to={`${url}/manageAllOrders`}
              sx={{ color: "#457B9D" }}
              activeClassName="nav-selected"
              primary="Manage All Orders"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WifiProtectedSetupIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={NavLink}
              to={`${url}/manageProducts`}
              sx={{ color: "#457B9D" }}
              activeClassName="nav-selected"
              primary="Manage Products"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AddCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={NavLink}
              to={`${url}/addProduct`}
              sx={{ color: "#457B9D" }}
              activeClassName="nav-selected"
              primary="Add Products"
            />
          </ListItem>
        </Box>
      )}

      {/* log out  */}
      <Box sx={{ mt: 10 }}>
        <Divider />
        <ListItem onClick={logOut} button>
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <Button sx={{ p: 0, m: 0 }}>Log Out</Button>
        </ListItem>
      </Box>

      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: 2,
          mr: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Switch>
          {/* normal user */}
          {!admin && (
            <Route exact path={path}>
              <MyOrders />
            </Route>
          )}
          <Route path={`${path}/myOrders`}>
            <MyOrders />
          </Route>
          <Route path={`${path}/review`}>
            <GiveReview />
          </Route>
          <Route path={`${path}/payment`}>
            <Payment />
          </Route>
          {/* admin  */}

          {admin && (
            <AdminRoute exact path={path}>
              <ManageAllOrders />
            </AdminRoute>
          )}

          <AdminRoute path={`${path}/makeAdmin`}>
            <MakeAdmin />
          </AdminRoute>
          <AdminRoute path={`${path}/manageAllOrders`}>
            <ManageAllOrders />
          </AdminRoute>
          <AdminRoute path={`${path}/manageProducts`}>
            <ManageProducts />
          </AdminRoute>
          <AdminRoute path={`${path}/addProduct`}>
            <AddProduct />
          </AdminRoute>
        </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
