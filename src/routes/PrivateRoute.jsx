import useAuth from "@/hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (user?.email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: pathname }} />;
};

export default PrivateRoute;
