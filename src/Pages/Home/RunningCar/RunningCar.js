import { Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import car from "../../../images/car.png";
import wheel from "../../../images/car-tier.png";
import "./RunningCar.css";

const RunningCar = () => {
  window.onscroll = function () {
    windowScroll();
  };
  function windowScroll() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      document.getElementById("main-nav").className = "in-view";
    } else {
      document.getElementById("main-nav").className = "";
    }
  }
  return (
    <Box sx={{ py: 6 }}>
      <Grid
        sx={{ alignItems: "center" }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={8} lg={6}>
          <Box id="main-nav" className="running-car main-nav">
            <div className="runnig-box">
              <img
                style={{ width: "100%" }}
                className="car "
                src={car}
                alt=""
              />
              <img className="wheel" src={wheel} alt="" />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
          <Box sx={{ px: 2 }}>
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RunningCar;
