import { useGetReviewsQuery } from "@/redux/features/review/reviewApi";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "../Card/ReviewCard";
import CarxSkeleton from "./CarxSkeleton";

const Reviews = () => {
  const { data, isLoading } = useGetReviewsQuery();

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
              {isLoading ? (
                <CarxSkeleton count={1} />
              ) : (
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
                  {data?.data?.map((clientReview) => (
                    <SwiperSlide key={clientReview._id}>
                      <ReviewCard review={clientReview} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Reviews;
