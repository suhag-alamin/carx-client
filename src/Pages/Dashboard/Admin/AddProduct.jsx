import useDocumentTitle from "@/hooks/useDocumentTitle";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddProduct = () => {
  // dynamic title
  useDocumentTitle("Add Product");
  const [isLoading, setIsLoading] = useState(false);

  const formData = new FormData();
  const url = "https://api.cloudinary.com/v1_1/dkw1ovah4/image/upload";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    data.img = data.img[0];
    const files = [
      data.gallery1[0],
      data.gallery2[0],
      data.gallery3[0],
      data.gallery4[0],
    ];

    formData.append("carName", data.carName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("file", data.img);
    formData.append("upload_preset", "llqbnsmr");
    // gallery
    for (let i = 0; i < files.length; i++) {
      //  upload image to cloudinary

      if (i === 0) {
        setIsLoading(true);
        const file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "llqbnsmr");
        const uploadGallery = async () => {
          const pic = await axios.post(url, formData);
          data.gallery1 = pic.data.url;
          setIsLoading(false);
        };
        uploadGallery();
      }
      if (i === 1) {
        setIsLoading(true);
        const file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "llqbnsmr");
        const uploadGallery = async () => {
          const pic = await axios.post(url, formData);
          data.gallery2 = pic.data.url;
          setIsLoading(false);
        };
        uploadGallery();
      }
      if (i === 2) {
        setIsLoading(true);
        const file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "llqbnsmr");
        const uploadGallery = async () => {
          const pic = await axios.post(url, formData);
          data.gallery3 = pic.data.url;
          setIsLoading(false);
        };
        uploadGallery();
      }
      if (i === 3) {
        setIsLoading(true);
        const file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "llqbnsmr");
        const uploadGallery = async () => {
          const pic = await axios.post(url, formData);
          data.gallery4 = pic.data.url;
          setIsLoading(false);
        };
        uploadGallery();
      }
    }

    // upload image to cloudinary
    const uploadImage = async () => {
      setIsLoading(true);
      const pic = await axios.post(url, formData);
      uploadToDb(pic.data.url);
      setIsLoading(false);
    };
    uploadImage();

    const uploadToDb = (img) => {
      data.img = img;
      data.price = parseFloat(data.price);
      setIsLoading(true);
      axios
        .post("https://carx-suhag.onrender.com/cars", data)
        .then((result) => {
          if (result.data?.insertedId) {
            toast.success("Car added successfully!");
            setIsLoading(false);
            reset();
          }
        });
    };
  };
  return (
    <Container>
      <Typography sx={{ textAlign: "center" }} variant="h4" color="secondary">
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
                label="Car Price $"
                {...register("price", { required: true })}
              />
              {errors.price && <span className="error">Price is required</span>}
            </Grid>

            {/* car primary image upload  */}
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                required
                helperText="Upload Car Image"
                {...register("img", { required: true })}
              />
              {errors.img && (
                <span className="error">Car Image is required</span>
              )}
            </Grid>

            {/* car gallery image upload */}

            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                required
                helperText="Upload car gallery image 1"
                {...register("gallery1", { required: true })}
              />
              {errors.gallery1 && (
                <span className="error">Gallery image 1 is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                required
                helperText="Upload car gallery image 2"
                {...register("gallery2", { required: true })}
              />
              {errors.gallery2 && (
                <span className="error">Gallery image 2 is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                required
                helperText="Upload car gallery image 3"
                {...register("gallery3", { required: true })}
              />
              {errors.gallery3 && (
                <span className="error">Gallery image 3 is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                required
                helperText="Upload car gallery image 4"
                {...register("gallery4", { required: true })}
              />
              {errors.gallery4 && (
                <span className="error">Gallery image 4 is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                loadingPosition="end"
                variant="contained"
                sx={{ mb: 2 }}
              >
                {isLoading ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      p: 0,
                    }}
                  >
                    <CircularProgress size="20px" color="info" />
                  </Box>
                ) : (
                  "Add Product"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AddProduct;
