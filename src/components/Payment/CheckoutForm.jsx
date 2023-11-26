import { clearCart } from "@/redux/features/cart/cartSlice";
import { usePlaceOrderMutation } from "@/redux/features/order/orderApi";
import { clearOrderDetails } from "@/redux/features/order/orderSlice";
import { clearPaymentIntent } from "@/redux/features/payment/paymentSlice";
import styles from "@/styles/Payment.module.css";
import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const { clientSecret, amount } = useSelector((state) => state.payment);
  const { user } = useSelector((state) => state.auth);
  const orderDetails = useSelector((state) => state.order);
  const { cars } = useSelector((state) => state.cart);

  const [placeOrder, { isSuccess, isLoading }] = usePlaceOrderMutation();
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      setProcessing(false);
      return;
    }
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setProcessing(false);
      toast.error(error.message);
    }

    // payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (intentError) {
      toast.error(intentError.message);
      setProcessing(false);
    } else {
      setSuccess("Your payment processed successfully");

      // save to database

      const orderData = {
        orderDetails: {
          ...orderDetails,
        },
        user: user?._id,
        cars: cars.map((car) => car._id),
        payment: {
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          last4: paymentMethod.card.last4,
          currency: paymentIntent.currency,
          status: "success",
        },
      };

      placeOrder(orderData);
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success("Order placed successfully");
      dispatch(clearCart());
      dispatch(clearOrderDetails());
      dispatch(clearPaymentIntent());
      navigate("/dashboard");
    }
  }, [isSuccess, isLoading, dispatch]);

  return (
    <div>
      <form className={styles.checkoutForm} onSubmit={handleSubmit}>
        <CardElement
          className={styles.cardElement}
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#457B9D",
                "::placeholder": {
                  color: "#457B9D",
                },
              },
              invalid: {
                color: "#FF1654",
              },
            },
          }}
        />
        <Button variant="contained" type="submit" disabled={!stripe || success}>
          {processing || isLoading ? (
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 0,
              }}
            >
              <CircularProgress size="20px" color="info" />
            </Box>
          ) : (
            `Pay $ ${amount}`
          )}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
