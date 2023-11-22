import { CircularProgress, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import OthersBanner from "../../Shared/OthersBanner/OthersBanner";
import CarDetails from "../CarDetails/CarDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

const PlaceOrder = () => {
  // dynamic title
  useDocumentTitle("Place Order");
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://carx-suhag.onrender.com/cars/${id}`).then((result) => {
      setCar(result.data);
      setIsLoading(false);
    });
  }, [id]);

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
      {/* banner  */}
      <OthersBanner>Place Order</OthersBanner>
      {/* car and order details  */}
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
    </div>
  );
};

export default PlaceOrder;
