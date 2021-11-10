import { Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import car from "../../../images/car.jpg";
import wheel from "../../../images/car-tier.png";
import "./RunningCar.css";

const RunningCar = () => {
  const mainNav = document.querySelector(".main-nav");
  window.onscroll = function () {
    windowScroll();
  };
  function windowScroll() {
    mainNav?.classList.toggle(
      "in-view",
      mainNav.scrollTop > 200 || document.documentElement.scrollTop > 200
    );
  }
  return (
    <Box sx={{ py: 6 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <Box className="running-car main-nav">
            <img className="car " src={car} alt="" />
            <img className="wheel" src={wheel} alt="" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ pb: 3, fontWeight: 700 }}
            color="secondary"
            variant="h4"
          >
            OUR FLEET YOUR FLEET
          </Typography>
          <Divider />
          <Typography sx={{ pt: 2 }} paragraph color="text.secondary">
            Assertively iterate enterprise-wide portals through synergistic
            products. Efficiently build adaptive schemas after transparent
            quality vectors. Phosfluorescently optimize competitive resources
            after extensive convergence. Rapidiously optimize high-quality
            meta-services via distributed architectures. Credibly deliver
            24/365.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RunningCar;
