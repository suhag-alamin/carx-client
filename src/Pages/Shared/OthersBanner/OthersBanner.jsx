import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./OthersBanner.css";

const OthersBanner = ({ children }) => {
  return (
    <Box className="other-banner">
      <Typography color="info.main" variant="h4" sx={{ textAlign: "center" }}>
        {children}
      </Typography>
    </Box>
  );
};

export default OthersBanner;
