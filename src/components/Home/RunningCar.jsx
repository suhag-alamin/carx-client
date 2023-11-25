import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import car from "@/images/car.png";
import wheel from "@/images/car-tier.png";
import styles from "@/styles/Home.module.css";

const RunningCar = () => {
  const windowScroll = () => {
    if (
      document.body.scrollTop > 150 ||
      document.documentElement.scrollTop > 150
    ) {
      document.getElementById("running-car").className = styles.inView;
    } else {
      document.getElementById("running-car").className = "";
    }
  };

  if (typeof window !== "undefined") {
    window.onscroll = function () {
      windowScroll();
    };
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
          <Box id="running-car" className="running-car">
            <div className={styles.runningBox}>
              <img
                style={{ width: "100%" }}
                className={styles.car}
                src={car}
                alt="running-car"
              />
              <img className={styles.wheel} src={wheel} alt="" />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
          <Box sx={{ px: 2, width: "75%" }}>
            <Typography color="secondary" variant="h3">
              OUR FLEET YOUR FLEET
            </Typography>
            <Divider />
            <Typography variant="body1" color="text.secondary">
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
