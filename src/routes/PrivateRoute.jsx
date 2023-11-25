import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.auth);

  const { pathname } = useLocation();
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (!user?.email && !isLoading) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
