import styles from "@/styles/Home.module.css";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        className="mySwiper"
      >
        <SwiperSlide className={styles.singleSlideOne}>
          <Container sx={{ px: 6 }}>
            <Grid sx={{ px: 1 }} container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 8 }} variant="h1" color="info.main">
                  Chevrolet Traverse
                </Typography>
                <Typography
                  sx={{ mt: 2, mb: 3 }}
                  variant="body1"
                  color="info.main"
                >
                  New and Powerful SUV
                </Typography>
                <Link to="/cars">
                  {" "}
                  <Button variant="contained">Explore More</Button>
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
        <SwiperSlide className={styles.singleSlideTwo}>
          <Container sx={{ px: 6 }}>
            <Grid sx={{ px: 1 }} container spacing={3}>
              <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
                <Typography sx={{ mt: 12 }} variant="h1" color="info.main">
                  Audi 2021 S5 Cabriolet
                </Typography>
                <Typography
                  sx={{ mt: 2, mb: 3 }}
                  variant="body1"
                  color="info.main"
                >
                  A Black Diamond
                </Typography>
                <Link to="/cars">
                  {" "}
                  <Button variant="contained">Explore More</Button>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </SwiperSlide>
        <SwiperSlide className={styles.singleSlideThree}>
          <Container sx={{ px: 6 }}>
            <Grid sx={{ px: 1 }} container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 8 }} variant="h1" color="info.main">
                  Renegade 730S
                </Typography>
                <Typography
                  sx={{ mt: 2, mb: 3 }}
                  variant="body1"
                  color="info.main"
                >
                  Raise your limits over
                </Typography>
                <Link to="/cars">
                  {" "}
                  <Button variant="contained">Explore More</Button>
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
