import { Button, Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "@/styles/Car.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";

const CarDetails = ({ car }) => {
  const { carName, description, price, gallery, img } = car;

  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{ width: "100%    " }}>
        <Typography sx={{ textAlign: "center" }} variant="h5" color="primary">
          Product Details
        </Typography>
        <Divider />
        <Swiper
          navigation={true}
          grabCursor={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          style={{ marginTop: 20 }}
        >
          <SwiperSlide>
            <Box
              sx={{
                width: "70%",
                mx: "auto",
              }}
            >
              <img
                className={styles.carGalleryImg}
                style={{ width: "100%" }}
                src={img}
                alt=""
              />
            </Box>
          </SwiperSlide>
          {gallery?.map((g) => (
            <SwiperSlide key={g}>
              <Box
                sx={{
                  width: "70%",
                  mx: "auto",
                }}
              >
                <img
                  className={styles.carGalleryImg}
                  style={{ width: "100%" }}
                  src={g}
                  alt=""
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Paper sx={{ px: 3, py: 2 }}>
        <Typography color="secondary" gutterBottom variant="h5" component="div">
          {carName}
        </Typography>
        <Typography gutterBottom variant="h6">
          $ {price}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        <Button
          sx={{
            my: 2,
          }}
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
          onClick={() => dispatch(addToCart(car))}
        >
          Add to Cart
        </Button>
      </Paper>
    </>
  );
};

export default CarDetails;
