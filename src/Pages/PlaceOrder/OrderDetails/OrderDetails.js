import {
  Button,
  CssBaseline,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import "./OrderDatails.css";
import axios from "axios";

const OrderDetails = ({ car }) => {
  const { user } = useAuth();

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
  const onSubmit = (data) => {
    data.status = "pending";
    axios
      .post("https://afternoon-tor-94038.herokuapp.com/orders", data)
      .then((result) => {
        if (result.data?.insertedId) {
          toast.success(
            "Successfully added an order. Please proceed with payment."
          );
          reset();
        }
      });
  };
  console.log(errors);
  return (
    <>
      <Typography
        sx={{ textAlign: "center", mb: 3 }}
        variant="h5"
        color="primary"
      >
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
                <span className="error">User Name is required</span>
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
                <span className="error">User Email is required</span>
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
                <span className="error">Car Name is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                fullWidth
                label="Car Price"
                {...register("price", { required: true })}
              />
              {errors.price && <span className="error">Price is required</span>}
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
                <span className="error">Address is required</span>
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
              {errors.city && <span className="error">City is required</span>}
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
                <span className="error">Phone Number is required</span>
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
          {/* </form> */}
        </Box>
      </Box>
    </>
  );
};

export default OrderDetails;
