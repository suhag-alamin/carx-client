import { Typography } from "@mui/material";
import React from "react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import Banner from "../Banner/Banner";
import FeaturedCars from "../FeaturedCars/FeaturedCars";

const Home = () => {
  // dynamic title
  useDocumentTitle("Carx - Affordability at your fingertip", false);
  return (
    <div>
      {/* navbar  */}
      <Navigation />
      {/* banner section  */}
      <Banner />
      <Typography variant="h3" color="primary">
        this is home
      </Typography>
      {/* featured cars section  */}
      <FeaturedCars />
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default Home;
