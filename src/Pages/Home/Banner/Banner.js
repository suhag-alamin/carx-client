import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./Banner.css";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const Banner = () => {
  return (
    <Box>
      <Swiper
        navigation={true}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide className="single-slide-one">
          <Container sx={{ px: 6 }}>
            <Grid sx={{ px: 1 }} container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ fontSize: { xs: 30, sm: 60 }, mt: 8 }}
                  variant="h3"
                  color="info.main"
                >
                  Chevrolet Traverse
                </Typography>
                <Typography sx={{ mt: 2, mb: 3 }} paragraph color="info.main">
                  New and Powerful SUV
                </Typography>
                <Link to="/services">
                  {" "}
                  <Button variant="outlined" className="carx-btn">
                    Explore More
                  </Button>
                </Link>
              </Grid>
              <Grid
                sx={{ display: { xs: "none", md: "block" } }}
                item
                xs={12}
                md={6}
              ></Grid>
            </Grid>
          </Container>
        </SwiperSlide>
        <SwiperSlide className="single-slide-two">
          <Container sx={{ px: 6 }}>
            <Grid sx={{ px: 1 }} container spacing={3}>
              <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{ fontSize: { xs: 30, sm: 60 }, mt: 12 }}
                  variant="h3"
                  color="info.main"
                >
                  Audi 2021 S5 Cabriolet
                </Typography>
                <Typography sx={{ mt: 2, mb: 3 }} paragraph color="info.main">
                  A Black Diamond
                </Typography>
                <Link to="/services">
                  {" "}
                  <Button
                    variant="outlined"
                    sx={{ color: "#f0f4ef", borderColor: "#f0f4ef" }}
                  >
                    Explore More
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </SwiperSlide>
        <SwiperSlide className="single-slide-three">
          <Container sx={{ px: 6 }}>
            <Grid sx={{ px: 1 }} container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ fontSize: { xs: 30, sm: 60 }, mt: 8 }}
                  variant="h3"
                  color="info.main"
                >
                  Renegade 730S
                </Typography>
                <Typography sx={{ mt: 2, mb: 3 }} paragraph color="info.main">
                  Raise your limits over
                </Typography>
                <Link to="/services">
                  {" "}
                  <Button variant="outlined" className="carx-btn">
                    Explore More
                  </Button>
                </Link>
              </Grid>
              <Grid sx={{ display: { xs: "none", md: "block" } }}></Grid>
            </Grid>
          </Container>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Banner;
