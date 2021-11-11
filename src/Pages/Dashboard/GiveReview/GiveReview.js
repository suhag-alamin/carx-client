import {
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const GiveReview = () => {
  const { user } = useAuth();
  const [start, setStar] = useState(2);
  console.log(start);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.displayName,
      email: user?.email,
    },
  });
  const onSubmit = (data) => {
    data.rating = start;
    axios
      .post("https://afternoon-tor-94038.herokuapp.com/reviews", data)
      .then((result) => {
        if (result.data?.insertedId) {
          toast.success("Thanks for your review. 😍");
          reset();
        }
      });
  };
  return (
    <Container sx={{ py: 2 }}>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Please give your review.
      </Typography>
      <Divider />
      <Container component="main" maxWidth="xs">
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
                  required
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
                  required
                  label="Email Address"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="error">User Email is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  fullWidth
                  label="Review"
                  required
                  multiline
                  {...register("review", { required: true })}
                />
                {errors.review && (
                  <span className="error">Review is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  color="secondary"
                  sx={{ mb: 1 }}
                  variant="subtitle1"
                >
                  Give us your rating
                </Typography>
                <Rating
                  precision={0.5}
                  size="large"
                  value={start}
                  required
                  onChange={(event, newValue) => {
                    setStar(newValue);
                  }}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Give Review
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default GiveReview;
