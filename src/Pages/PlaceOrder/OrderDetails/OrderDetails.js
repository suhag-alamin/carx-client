import {
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import "./OrderDatails.css";

const OrderDetails = ({ car }) => {
  const { carName, price } = car;
  const { user } = useAuth();

  const [orderInfo, setOrderInfo] = useState({});

  /*   const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...orderInfo };
    newValue[field] = value;
    setOrderInfo(newValue);
  };

  const handleSubmit = (e) => {
    const { name, email, carName, phone, address, price } = orderInfo;
    // toast.warning("Password Not matched");
    console.log(orderInfo);
    e.preventDefault();
    // e.target.reset();
  }; */

  const {
    register,
    handleSubmit,
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
    console.log(data);
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
        {/*  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                type="text"
                name="name"
                value={user?.displayName}
                fullWidth
                label="Your Name"
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="email"
                fullWidth
                label="Email Address"
                name="email"
                value={user?.email}
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={carName}
                required
                fullWidth
                name="carName"
                label="Car Name"
                type="text"
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                value={price}
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Address"
                type="text"
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone Number"
                type="number"
                onBlur={handleOnBlur}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Place Order
          </Button>
        </Box> */}
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
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
                placeholder="Name"
                // value={user?.displayName}
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
                placeholder="Email"
                // value={user?.email}
                {...register("userEmail", { required: true })}
              />
              {errors.userEmail && (
                <span className="error">User Emails is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                placeholder="car Name"
                // value={carName}
                {...register("carName", { required: true })}
              />
              {errors.carName && (
                <span className="error">Service Name is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                fullWidth
                placeholder="Price"
                // value={price}
                {...register("price", { required: true })}
              />
              {errors.price && <span className="error">Price is required</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                placeholder="Address"
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
                placeholder="City"
                {...register("city", { required: true })}
              />
              {errors.city && <span className="error">City is required</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="tel"
                fullWidth
                placeholder="Phone"
                {...register("phone", {
                  required: true,
                })}
              />
              {errors.phone && <span className="error">City is required</span>}
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
