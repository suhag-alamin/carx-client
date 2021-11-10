import { Typography } from "@mui/material";
import React from "react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import Banner from "../Banner/Banner";
import FeaturedCars from "../FeaturedCars/FeaturedCars";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  // dynamic title
  useDocumentTitle("Carx - Affordability at your fingertip", false);
  return (
    <div>
      {/* navbar  */}
      <Navigation />
      {/* banner section  */}
      <Banner />
      {/* featured cars section  */}
      <FeaturedCars />
      {/* review section  */}
      <Reviews />
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default Home;
