import countries from "@/lib/countries";
import { setOrderDetails } from "@/redux/features/order/orderSlice";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import { setPaymentIntent } from "@/redux/features/payment/paymentSlice";
import { orderDetailsSchema } from "@/schemas/order";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Form from "../Forms/Form";
import FormAutocomplete from "../Forms/FormAutoComplete";
import FormTextField from "../Forms/FormTextField";

const OrderDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [
    createPaymentIntent,
    {
      isLoading: isPaymentIntentLoading,
      data: paymentIntentData,
      isSuccess,
      isError,
      error,
    },
  ] = useCreatePaymentIntentMutation();

  const onSubmit = (data) => {
    if (data) {
      const orderData = {
        totalAmount: total,
        deliveryDetails: {
          address: data.address,
          city: data.city,
          country: data.country.label || "Bangladesh",
          zipCode: data.zipCode || "0000",
          phone: data.country.phone + data.phoneNumber,
        },
      };

      dispatch(setOrderDetails(orderData));

      const createPaymentIntentData = {
        amount: total * 100,
        currency: "usd",
        email: user?.email,
      };
      createPaymentIntent(createPaymentIntentData);
    }
  };

  useEffect(() => {
    if (
      !isPaymentIntentLoading &&
      isSuccess &&
      paymentIntentData?.data?.paymentId
    ) {
      const paymentIntentInfoData = {
        paymentId: paymentIntentData?.data?.paymentId,
        amount: paymentIntentData?.data?.amount,
        currency: paymentIntentData?.data?.currency,
        clientSecret: paymentIntentData?.data?.clientSecret,
      };
      dispatch(setPaymentIntent(paymentIntentInfoData));
    }
    if (
      !isPaymentIntentLoading &&
      isError &&
      !paymentIntentData?.data?.paymentId
    ) {
      toast.error(error.message || "Payment failed!");
    }
  }, [paymentIntentData, isPaymentIntentLoading, isSuccess, isError, error]);

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h5" color="primary">
        Order Details
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          marginX: "auto",
        }}
      >
        <Box sx={{ mt: 3 }}>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(orderDetailsSchema)}
          >
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Grid item xs={12}>
                <FormAutocomplete
                  name="country"
                  options={countries}
                  label="Choose a country *"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormAutocomplete
                      name="countryCode"
                      options={countries}
                      label="Country Code *"
                      getOptionLabel={(option) =>
                        option.label + " " + option.phone
                      }
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt=""
                          />
                          ({option.label}) +{option.phone}
                        </Box>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormTextField
                      type="text"
                      label="Number *"
                      fullWidth
                      name="phoneNumber"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormTextField type="text" label="Address *" name="address" />
              </Grid>
              <Grid item xs={12}>
                <FormTextField type="text" label="City *" name="city" />
              </Grid>

              <Grid item xs={12}>
                <FormTextField type="text" label="Zip Code *" name="zipCode" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isPaymentIntentLoading}
                >
                  {isPaymentIntentLoading ? (
                    <Box
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        p: 0,
                      }}
                    >
                      <CircularProgress
                        size="20px"
                        sx={{
                          color: "info.main",
                        }}
                      />
                    </Box>
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Box>
    </>
  );
};

export default OrderDetails;
