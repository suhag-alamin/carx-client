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

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    data.price = parseFloat(data.price);
    console.log(data);
    axios
      .post("https://afternoon-tor-94038.herokuapp.com/cars", data)
      .then((result) => {
        if (result.data?.insertedId) {
          toast.success("Car added successfully!");
          reset();
        }
      });
  };
  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Add a product.
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
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
                label="Car Name"
                {...register("carName", { required: true })}
              />
              {errors.carName && (
                <span className="error">Car Name is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                required
                multiline
                label="Car Description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="error">Car description is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                fullWidth
                required
                label="Car Price"
                {...register("price", { required: true })}
              />
              {errors.price && <span className="error">Price is required</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="url"
                fullWidth
                required
                label="Car Image"
                helperText="Upload the image to imgbb or wherever you want and submit the live link."
                {...register("img", { required: true })}
              />
              {errors.img && (
                <span className="error">Car Image is required</span>
              )}
            </Grid>

            {/* gallery */}

            <Grid item xs={12}>
              <TextField
                type="url"
                fullWidth
                label="Car Gallery image 1"
                helperText="Upload the image to imgbb or wherever you want and submit the live link."
                {...register("gallery1")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="url"
                fullWidth
                label="Car Gallery image 2"
                helperText="Upload the image to imgbb or wherever you want and submit the live link."
                {...register("gallery2")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="url"
                fullWidth
                label="Car Gallery image 3"
                helperText="Upload the image to imgbb or wherever you want and submit the live link."
                {...register("gallery3")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="url"
                fullWidth
                label="Car Gallery image 4"
                helperText="Upload the image to imgbb or wherever you want and submit the live link."
                {...register("gallery4")}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AddProduct;
