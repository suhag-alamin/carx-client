import OrderDetails from "@/components/Car/OrderDetails";
import CheckoutForm from "@/components/Payment/CheckoutForm";
import OthersBanner from "@/components/Shared/OthersBanner";
import { stripeKey } from "@/config/stripe";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(stripeKey);

const Checkout = () => {
  const { paymentId } = useSelector((state) => state.payment);

  useDocumentTitle("Checkout");

  return (
    <div>
      <OthersBanner>Checkout</OthersBanner>
      <Container
        sx={{
          py: 6,
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          <Grid item xs={12} md={paymentId ? 8 : 12}>
            <OrderDetails />
          </Grid>
          {paymentId && (
            <Grid item xs={12} md={4}>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h5"
                color="primary"
              >
                Payment
              </Typography>
              <Divider />
              <Box
                sx={{
                  my: 2,
                }}
              >
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Checkout;
