import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SingleReview from "../SingleReview/SingleReview";

// install Swiper modules
SwiperCore.use([Navigation]);

// reviews section

const Reviews = () => {
  const [clientReviews, setClinetReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://afternoon-tor-94038.herokuapp.com/reviews")
      .then((result) => {
        setClinetReviews(result.data);
        setIsLoading(false);
      });
  }, []);

  // loading spinner
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#edf2f4" }}>
      <Container sx={{ py: 6 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={8} md={4}>
              <Typography variant="subtitle1">What Our Clients Say</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, my: 2 }}>
                CLIENT <span className="colored-text">REVIEWS</span>{" "}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={8} md={8} sx={{ py: 2 }}>
              <Swiper
                navigation={true}
                grabCursor={true}
                className="mySwiper"
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                }}
              >
                {clientReviews.map((clientReview) => (
                  <SwiperSlide key={clientReview._id}>
                    <SingleReview review={clientReview}></SingleReview>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Reviews;
