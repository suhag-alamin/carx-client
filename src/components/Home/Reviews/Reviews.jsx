import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import SingleReview from "../../Card/ReviewCard";

// reviews section

const Reviews = () => {
  // dynamic title
  useDocumentTitle("Review");

  const [clientReviews, setClientReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios.get("https://carx-suhag.onrender.com/reviews").then((result) => {
      setClientReviews(result.data);
      setIsLoading(false);
    });
  }, []);

  // loading spinner
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "customBg.main" }}>
      <Container sx={{ py: 6 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={8} md={4}>
              <Typography variant="subtitle1">What Our Clients Say</Typography>
              <Typography variant="h3">
                CLIENT <span className="colored-text">REVIEWS</span>
              </Typography>
            </Grid>
            <Grid item xs={2} sm={8} md={8} sx={{ py: 2 }}>
              <Swiper
                navigation={true}
                grabCursor={true}
                modules={[Navigation]}
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
                    <SingleReview review={clientReview} />
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
