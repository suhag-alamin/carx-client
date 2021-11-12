import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    // axios
    //   .put(`https://afternoon-tor-94038.herokuapp.com/cars/${_id}`, data)
    //   .then((result) => {
    //     if (result.data?.modifiedCount > 0) {
    //       toast.info(
    //         "Product Updated. To see the updated version, please refresh."
    //       );
    //     }
    //   });
  };
  return (
    <Container sx={{ py: 2 }}>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Make Admin
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          marginX: "auto",
          width: "50%",
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
                <span className="error">Car Name is required</span>
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
