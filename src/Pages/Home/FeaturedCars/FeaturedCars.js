import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleCar from "../../Shared/SingleCar/SingleCar";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://afternoon-tor-94038.herokuapp.com/cars")
      .then((result) => {
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
    <Box sx={{ bgcolor: "#edf2f4" }}>
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
        >
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
            <Button
              className="carx-outline-btn"
              variant="outlined"
              endIcon={<ArrowRightAltIcon />}
            >
              Explore More
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedCars;
