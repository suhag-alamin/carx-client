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

const OrderDetails = ({ car }) => {
  const { carName, price } = car;
  const { user } = useAuth();

  const [orderInfo, setOrderInfo] = useState({});

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...orderInfo };
    newValue[field] = value;
    setOrderInfo(newValue);
  };

  const handleSubmit = (e) => {
    const { name, email, password, password2 } = orderInfo;
    // toast.warning("Password Not matched");

    e.preventDefault();
    // e.target.reset();
  };
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                type="text"
                name="name"
                focused
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
                focused
                name="email"
                value={user?.email}
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="carName"
                label="Car Name"
                focused
                type="text"
                value={carName}
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="price"
                label="Price"
                focused
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
        </Box>
      </Box>
    </>
  );
};

export default OrderDetails;
