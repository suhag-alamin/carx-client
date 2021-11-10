import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import OthersBanner from "../../Shared/OthersBanner/OthersBanner";
import SingleCar from "../../Shared/SingleCar/SingleCar";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://afternoon-tor-94038.herokuapp.com/cars")
      .then((result) => {
        setCars(result.data);
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
    <div>
      {/* navbar  */}
      <Navigation />
      {/* banner  */}
      <OthersBanner>Cars</OthersBanner>
      {/* cars section  */}
      <Box sx={{ bgcolor: "#edf2f4" }}>
        <Container sx={{ py: 6 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
          >
            ALL <span className="colored-text">CARS</span>{" "}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
            >
              {cars.map((car) => (
                <SingleCar key={car._id} car={car} />
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default Cars;
