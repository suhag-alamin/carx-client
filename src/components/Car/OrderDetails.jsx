import countries from "@/lib/countries";
import { setOrderDetails } from "@/redux/features/order/orderSlice";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import { setPaymentIntent } from "@/redux/features/payment/paymentSlice";
import styles from "@/styles/Car.module.css";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [code, setCode] = useState("");

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data) {
      const orderData = {
        totalAmount: total,
        deliveryDetails: {
          address: data.address,
          city: data.city,
          country: data.country || "Bangladesh",
          zipCode: data.zipCode || "0000",
          phone: code + data.phoneNumber,
        },
      };

      dispatch(setOrderDetails(orderData));

      const createPaymentIntentData = {
        amount: total * 100,
        currency: "usd",
        email: user?.email,
      };
      createPaymentIntent(createPaymentIntentData);
      reset();
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
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Grid item xs={12}>
              <Autocomplete
                options={countries}
                autoHighlight
                fullWidth
                getOptionLabel={(option) => option.label}
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
                    {option.label} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country *"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-country",
                    }}
                    {...register("country", {
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                  />
                )}
              />
              {errors.country && (
                <span className={styles.error}>Country is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Autocomplete
                  sx={{ width: "50%" }}
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label + " " + option.phone}
                  onChange={(event, newValue) => {
                    setCode(newValue.phone);
                  }}
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country Code *"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-code",
                      }}
                    />
                  )}
                />
                <TextField
                  type="tel"
                  label="Number"
                  fullWidth
                  required
                  {...register("phoneNumber", {
                    required: true,
                    minLength: 10,
                    maxLength: 15,
                  })}
                />
              </Box>

              {errors.phoneNumber && (
                <span
                  style={{
                    marginLeft: 5,
                  }}
                  className={styles.error}
                >
                  Number is required
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                label="Address"
                required
                {...register("address", { required: true })}
              />
              {errors.address && (
                <span className={styles.error}>Address is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                label="City"
                required
                {...register("city", { required: true })}
              />
              {errors.city && (
                <span className={styles.error}>City is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="tel"
                fullWidth
                label="Zip Code"
                required
                {...register("zipCode", {
                  required: true,
                  minLength: 4,
                  maxLength: 6,
                })}
              />
              {errors.zipCode && (
                <span className={styles.error}>Zid Code is required</span>
              )}
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
        </Box>
      </Box>
    </>
  );
};

export default OrderDetails;
