import useAuth from "@/hooks/useAuth";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, admin, isLoading } = useAuth();
  const { pathname } = useLocation();

  if (!admin || isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  if (user?.email && admin) {
    return children;
  }
  return <Navigate to="/" state={{ from: pathname }} />;
};

export default AdminRoute;
