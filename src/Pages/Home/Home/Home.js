import { Typography } from "@mui/material";
import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";

const Home = () => {
  return (
    <div>
      <Navigation />
      <Typography variant="h3" color="primary">
        this is home
      </Typography>
      <Footer />
    </div>
  );
};

export default Home;
