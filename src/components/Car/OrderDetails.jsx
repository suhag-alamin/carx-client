import { usePlaceOrderMutation } from "@/redux/features/order/orderApi";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import styles from "@/styles/Car.module.css";
import {
  Button,
  CssBaseline,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const OrderDetails = ({ car }) => {
  const { user } = useSelector((state) => state.auth);

  const [
    createPaymentIntent,
    { isLoading: isPaymentIntentLoading, data: paymentIntent },
  ] = useCreatePaymentIntentMutation();
  console.log(paymentIntent, isPaymentIntentLoading);

  const [placeOrder, { data: orderData }] = usePlaceOrderMutation();
  console.log(orderData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.displayName,
      userEmail: user?.email,
      carName: car?.carName,
      price: car?.price,
    },
  });
  const onSubmit = async (data) => {
    data.status = "pending";
    data.carImg = car?.img;
    // axios
    //   .post("https://carx-suhag.onrender.com/orders", data)
    //   .then((result) => {
    //     if (result.data?.insertedId) {
    //       toast.success(
    //         "Successfully added an order. Please proceed with payment."
    //       );
    //       reset();
    //     }
    //   });
    if (data) {
      const paymentIntentData = {
        amount: data.price * 100,
        currency: "usd",
        email: data.userEmail,
      };
      const paymentInfo = await createPaymentIntent(paymentIntentData);

      // paymentInfo.amount, paymentInfo.paymentId, paymentInfo.currency, paymentInfo.clientSecret

      const orderData = {
        car: car?._id,
        orderDetails: {
          totalAmount: paymentInfo?.amount / 100,
          status: "pending",
          color: data.color,
          deliveryDetails: {
            address: data.address,
            city: data.city,
            country: data.country || "Bangladesh",
            zip: data.zip || "0000",
            phone: data.phone,
          },
        },
        payment: {
          transactionId: paymentInfo?.paymentId,
          amount: paymentInfo?.amount / 100,
          currency: paymentInfo?.currency,
          status: paymentInfo?.paymentId ? "success" : "pending",
          last4: paymentInfo?.last4 || "0000",
        },
      };

      placeOrder(orderData);

      reset();
    }
  };
  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h5" color="primary">
        Order Details
      </Typography>
      <Divider />
      <CssBaseline />
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                label="Your Name"
                {...register("userName", { required: true })}
              />
              {errors.userName && (
                <span className={styles.error}>User Name is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                fullWidth
                label="Email Address"
                {...register("userEmail", { required: true })}
              />
              {errors.userEmail && (
                <span className={styles.error}>User Email is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                label="Car Name"
                {...register("carName", { required: true })}
              />
              {errors.carName && (
                <span className={styles.error}>Car Name is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                fullWidth
                label="Car Price $"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className={styles.error}>Price is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Select Color"
                fullWidth
                helperText="Please select your color"
                {...register("color")}
              >
                <MenuItem value="black">Black</MenuItem>
                <MenuItem value="red">Red</MenuItem>
                <MenuItem value="blue">Blue</MenuItem>
                <MenuItem value="yellow">Yellow</MenuItem>
                <MenuItem value="brown">Brown</MenuItem>
                <MenuItem value="green">Green</MenuItem>
                <MenuItem value="white">White</MenuItem>
              </TextField>
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
                label="Phone"
                required
                {...register("phone", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
              {errors.phone && (
                <span className={styles.error}>Phone Number is required</span>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Place Order
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default OrderDetails;
