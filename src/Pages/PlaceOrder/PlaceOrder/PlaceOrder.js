import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import OthersBanner from "../../Shared/OthersBanner/OthersBanner";
import CarDetails from "../CarDetails/CarDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

const PlaceOrder = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  useEffect(() => {
    axios
      .get(`https://afternoon-tor-94038.herokuapp.com/cars/${id}`)
      .then((result) => {
        setCar(result.data);
      });
  }, [id]);
  return (
    <div>
      {/* navbar  */}
      <Navigation />
      {/* banner  */}
      <OthersBanner>Place Order</OthersBanner>
      <Box sx={{ bgcolor: "#edf2f4" }}>
        <Container sx={{ py: 6 }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Grid item xs={12} md={6}>
              <CarDetails car={car} />
            </Grid>
            <Grid item xs={12} md={6}>
              <OrderDetails car={car} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default PlaceOrder;
