import useDocumentTitle from "@/hooks/useDocumentTitle";
import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MakeAdmin = () => {
  // dynamic title
  useDocumentTitle("Make Admin");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    axios({
      method: "put",
      url: "https://carx-suhag.onrender.com/users/admin",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
      data: data,
    }).then((result) => {
      if (result.data?.modifiedCount > 0) {
        toast.success("Admin made successfully");
        reset();
      }
    });
  };
  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" color="secondary">
        Make Admin
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "auto",
          width: { xs: "80%", md: "50%" },
          py: 3,
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                fullWidth
                required
                label="User Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="error">User Email is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Make Admin
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default MakeAdmin;
