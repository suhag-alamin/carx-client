import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { toast } from "react-toastify";

const AdminRoute = ({ children }) => {
  const { user, admin, isLoading } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (user?.email && !admin?.isAdmin && !isLoading) {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
};

export default AdminRoute;
