import { Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./CarDetails.css";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const CarDetails = ({ car }) => {
  const {
    carName,
    description,
    price,
    img,
    gallery1,
    gallery2,
    gallery3,
    gallery4,
  } = car;
  return (
    <>
      <Box sx={{ width: "100%    " }}>
        <Typography
          sx={{ textAlign: "center", mb: 3 }}
          variant="h5"
          color="primary"
        >
          Product Details
        </Typography>
        <Divider />
        <Swiper
          navigation={true}
          grabCursor={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
          style={{ marginTop: 20 }}
        >
          <SwiperSlide>
            <img
              className="car-gallery-img"
              style={{ width: "100%" }}
              src={img}
              alt=""
            />
          </SwiperSlide>
          {gallery1 && (
            <SwiperSlide>
              <img
                className="car-gallery-img"
                style={{ width: "100%" }}
                src={gallery1}
                alt=""
              />
            </SwiperSlide>
          )}
          {gallery2 && (
            <SwiperSlide>
              <img
                className="car-gallery-img"
                style={{ width: "100%" }}
                src={gallery2}
                alt=""
              />
            </SwiperSlide>
          )}
          {gallery3 && (
            <SwiperSlide>
              <img
                className="car-gallery-img"
                style={{ width: "100%" }}
                src={gallery3}
                alt=""
              />
            </SwiperSlide>
          )}
          {gallery4 && (
            <SwiperSlide>
              <img
                className="car-gallery-img"
                style={{ width: "100%", height: 400 }}
                src={gallery4}
                alt=""
              />
            </SwiperSlide>
          )}
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
