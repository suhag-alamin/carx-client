import SingleCar from "@/components/Card/CarCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: "https://carx-suhag.onrender.com/cars",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    }).then((result) => {
      setCars(result.data?.cars);
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
    <Box sx={{ bgcolor: "customBg.main" }}>
      <Container sx={{ py: 5 }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          FEATURED <span className="colored-text">CARS</span>{" "}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
          >
            {cars.slice(0, 6).map((car) => (
              <SingleCar key={car._id} car={car} />
            ))}
          </Grid>
        </Box>
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
