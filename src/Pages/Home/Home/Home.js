import { Typography } from "@mui/material";
import React from "react";
import Navigation from "../../Shared/Navigation/Navigation";

const Home = () => {
  return (
    <div>
      <Navigation />
      <Typography variant="h3" color="primary">
        this is home
      </Typography>
    </div>
  );
};

export default Home;
