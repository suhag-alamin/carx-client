import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const CarDetails = ({ car }) => {
  const { carName, description, price, gallery, img } = car;
  return (
    <>
      <Box>
        <Typography
          sx={{ textAlign: "center", mb: 3 }}
          variant="h4"
          color="primary"
        >
          Product Details
        </Typography>
        <Divider />
        <Swiper
          navigation={true}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
          style={{ marginTop: 20 }}
        >
          <SwiperSlide>
            <img src={img} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gallery?.gallery1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gallery?.gallery2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gallery?.gallery3} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gallery?.gallery4} alt="" />
          </SwiperSlide>
        </Swiper>
      </Box>
      <Paper sx={{ px: 3, py: 2 }}>
        <Typography color="secondary" gutterBottom variant="h5" component="div">
          {carName}
        </Typography>
        <Typography sx={{ fontWeight: 700 }} gutterBottom variant="h6">
          $ {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Paper>
    </>
  );
};

export default CarDetails;
