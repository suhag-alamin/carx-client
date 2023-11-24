import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Container, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Jvw1LGITY56CrX5VJRHNFpXy4tLNzFhkN82MDTtAmbCqy2wMlk7IfoxiDMyckwgqIZkI8B7MVzObX86W2qnMdaF00GELkrPsc"
);

const PaymentHome = () => {
  // dynamic title
  useDocumentTitle("Payment");
  const { id } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    axios
      .get(`https://carx-suhag.onrender.com/allOrders/${id}`)
      .then((result) => setOrder(result.data));
  }, [id]);
  return (
    <Container sx={{ py: 2 }}>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Please make payment for{" "}
        <span style={{ color: "primary.main", fontWeight: 700 }}>
          {order?.carName}
        </span>
      </Typography>
      <Divider />
      <Box sx={{ my: 4 }}>
        {order?.price && (
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order} />
          </Elements>
        )}
      </Box>
    </Container>
  );
};

export default PaymentHome;
