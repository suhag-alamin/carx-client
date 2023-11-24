import useAuth from "@/hooks/useAuth";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
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
import { Button, ListItemButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const drawerWidth = 240;

function Dashboard(props) {
  // dynamic title
  useDocumentTitle("Dashboard");

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logOut, admin } = useAuth();

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

      <ListItemButton color="primary">
        <ListItemIcon>
          <HomeIcon color="primary" />
        </ListItemIcon>
        <ListItemText
          as={Link}
          to="/"
          color="primary"
          sx={{ color: "secondary.main" }}
          primary="Home"
        />
      </ListItemButton>
      <ListItemButton color="primary">
        <ListItemIcon>
          <DashboardIcon color="primary" />
        </ListItemIcon>
        <ListItemText
          as={Link}
          to="/dashboard"
          color="primary"
          sx={{ color: "secondary.main" }}
          primary="Dashboard"
        />
      </ListItemButton>
      {/* normal user  */}
      {!admin && (
        <Box>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={Link}
              to={`/dashboard/my-orders`}
              sx={{ color: "secondary.main" }}
              primary="My Orders"
            />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <PaymentIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={Link}
              to={`/dashboard/payment`}
              sx={{ color: "secondary.main" }}
              primary="Pay"
            />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <RateReviewIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={Link}
              to={`/dashboard/review`}
              sx={{ color: "secondary.main" }}
              primary="Review"
            />
          </ListItemButton>
        </Box>
      )}

      {/* admin  */}
      {admin && (
        <Box>
          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettingsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={Link}
              to={`/dashboard/make-admin`}
              sx={{ color: "secondary.main" }}
              primary="Make Admin"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <BorderClearIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={Link}
              to={`/dashboard/manage-all-orders`}
              sx={{ color: "secondary.main" }}
              primary="Manage All Orders"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <WifiProtectedSetupIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={Link}
              to={`/dashboard/manage-products`}
              sx={{ color: "secondary.main" }}
              primary="Manage Products"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AddCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              as={Link}
              to={`/dashboard/add-product`}
              sx={{ color: "secondary.main" }}
              primary="Add Products"
            />
          </ListItemButton>
        </Box>
      )}

      {/* log out  */}
      <Box sx={{ mt: 10 }}>
        <Divider />
        <ListItemButton onClick={logOut}>
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <Button sx={{ p: 0, m: 0 }}>Log Out</Button>
        </ListItemButton>
      </Box>

      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "secondary.main",
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
          <Typography
            sx={{
              color: "info.main",
            }}
            variant="h6"
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
        <DashboardLayout />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
