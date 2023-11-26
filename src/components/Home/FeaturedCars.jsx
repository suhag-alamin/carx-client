import CarCard from "@/components/Card/CarCard";
import { useGetCarsQuery } from "@/redux/features/car/carApi";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import CarxSkeleton from "../Shared/CarxSkeleton";

const FeaturedCars = () => {
  const { data, isLoading } = useGetCarsQuery({
    limit: 3,
    sortBy: "createdAt",
    orderBy: "desc",
  });

  return (
    <Box sx={{ bgcolor: "customBg.main" }}>
      <Container sx={{ py: 5 }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          FEATURED <span className="colored-text">CARS</span>{" "}
        </Typography>
        {isLoading ? (
          <>
            <CarxSkeleton isCarCard={true} />
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
              >
                {data?.data?.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </Grid>
            </Box>
          </>
        )}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Link to="/cars">
            <Button variant="outlined" endIcon={<ArrowRightAltIcon />}>
              Explore More
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedCars;
