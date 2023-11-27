import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useCreateCarMutation } from "@/redux/features/car/carApi";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCar = () => {
  // dynamic title
  useDocumentTitle("Add Car");

  const [createCar, { data: carData, isLoading, isError, error }] =
    useCreateCarMutation();

  const formData = new FormData();
  const url = import.meta.env.VITE_CLOUDINARY_URL;

  const navigate = useNavigate();

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

    const gallery = [];

    formData.append("carName", data.carName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("file", data.img);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    // gallery
    for (let i = 0; i < files.length; i++) {
      //  upload image to cloudinary

      if (i === 0) {
        const file = files[i];
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        const uploadGallery = async () => {
          const pic = await axios.post(url, formData);
          gallery.push(pic.data.url);
        };
        uploadGallery();
      }
      if (i === 1) {
        const file = files[i];
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        const uploadGallery = async () => {
          const pic = await axios.post(url, formData);
          gallery.push(pic.data.url);
        };
        uploadGallery();
      }
      if (i === 2) {
        const file = files[i];
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        const uploadGallery = async () => {
          const pic = await axios.post(url, formData);
          gallery.push(pic.data.url);
        };
        uploadGallery();
      }
      if (i === 3) {
        const file = files[i];
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        const uploadGallery = async () => {
          const pic = await axios.post(url, formData);
          gallery.push(pic.data.url);
        };
        uploadGallery();
      }
    }

    // upload image to cloudinary
    const uploadImage = async () => {
      const pic = await axios.post(url, formData);
      uploadToDb(pic.data.url);
    };
    uploadImage();

    // upload to database
    const uploadToDb = (img) => {
      data.img = img;
      data.price = parseFloat(data.price);
      data.gallery = gallery;

      delete data.gallery1;
      delete data.gallery2;
      delete data.gallery3;
      delete data.gallery4;

      createCar(data);
      reset();
    };
  };

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(error.message);
    }
    if (!isLoading && carData) {
      toast.success(carData?.message || "Car added successfully!");
      navigate("/dashboard/manage-cars");
    }
  }, [carData, isLoading, isError, error]);

  return (
    <Container>
      <Typography sx={{ textAlign: "center" }} variant="h4" color="secondary">
        Add a Car.
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
                    <CircularProgress
                      size="20px"
                      sx={{
                        color: "info.main",
                      }}
                    />
                  </Box>
                ) : (
                  "Add Car"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AddCar;
