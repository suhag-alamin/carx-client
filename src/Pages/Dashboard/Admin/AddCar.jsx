import ImageUpload from "@/components/Forms/ImageUpload";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCar = () => {
  // dynamic title
  useDocumentTitle("Add Car");

  const [gallery, setGallery] = useState([]);
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [createCar, { data: carData, isLoading, isError, error }] =
    useCreateCarMutation();

  const navigate = useNavigate();

  const handleImageChange = (name, urls) => {
    setIsUploading(true);
    if (name === "img") {
      setImg(urls[0]);
      setIsUploading(false);
    } else {
      setGallery(urls);
      setIsUploading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    if (!img) {
      toast.error("Car Image is required");
      return;
    }

    if (!gallery.length) {
      toast.error("Car Gallery Images are required");
      return;
    }

    data.img = img;
    data.price = parseFloat(data.price);
    data.gallery = gallery;

    createCar(data);
    reset();
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
              <Typography variant="body2" color="text.secondary">
                Upload Cover Image
              </Typography>
              <ImageUpload
                name="img"
                onChange={handleImageChange}
                multiple={false}
              />
            </Grid>

            {/* car gallery image upload */}

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Upload Gallery Images
              </Typography>
              <ImageUpload
                name="gallery"
                onChange={handleImageChange}
                multiple={true}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                disabled={isLoading || isUploading}
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
