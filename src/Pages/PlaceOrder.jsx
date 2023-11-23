import CarDetails from "@/components/Car/CarDetails";
import OrderDetails from "@/components/Car/OrderDetails";
import OthersBanner from "@/components/Shared/OthersBanner";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { CircularProgress, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {/* banner  */}
      <OthersBanner>Place Order</OthersBanner>
      {/* car and order details  */}
      <Box>
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