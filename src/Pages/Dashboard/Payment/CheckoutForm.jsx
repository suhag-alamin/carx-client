import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import "./CheckoutForm.css";

const CheckoutForm = ({ order }) => {
  // dynamic title
  useDocumentTitle("Make Payment");
  const { _id, price, userName, userEmail } = order;
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .post("https://carx-suhag.onrender.com/create-payment-intent", {
        price,
      })
      .then((result) => {
        setClientSecret(result.data?.clientSecret);
      });
  }, [price]);

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
    } else {
      // console.log(paymentMethod);
    }

    // payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail,
          },
        },
      });

    if (intentError) {
      toast.error(intentError.message);
      setProcessing(false);
    } else {
      setSuccess("Your payment processed successfully");
      toast.success("Your payment processed successfully");

      setProcessing(false);

      // save to database
      const payment = {
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        last4: paymentMethod.card.last4,
        transaction: paymentIntent.id,
      };

      axios
        .put(`https://carx-suhag.onrender.com/orders/${_id}`, payment)
        .then((result) => {
          navigate("/dashboard/payment");
        });
    }
  };

  return (
    <div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <CardElement
          className="card-element"
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
                color: "#9e2146",
              },
            },
          }}
        />
        <Button variant="contained" type="submit" disabled={!stripe || success}>
          {processing ? (
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
            `Pay $ ${price}`
          )}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
