import { useUpdateCarMutation } from "@/redux/features/car/carApi";
import {
  Button,
  CircularProgress,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ImageUpload from "../Shared/ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "customBg.main",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const UpdateCarModal = ({ modalOpen, handleModalClose, car }) => {
  if (!car) return null;

  const [gallery, setGallery] = useState([]);
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { _id, carName, price } = car;

  const [updateCar, { isLoading, data, isError, error }] =
    useUpdateCarMutation();

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

  // const formData = new FormData();
  // const url = import.meta.env.VITE_CLOUDINARY_URL;
  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm({
    defaultValues: {
      carName: carName,
      price: price,
    },
  });
  const onSubmit = (data) => {
    data.price = parseFloat(data.price);

    // const uploadToDb = (img) => {
    if (img) {
      data.img = img;
    }
    if (gallery.length) {
      data.gallery = gallery;
    }

    updateCar({ id: _id, data });
    reset();
    // };

    // if (data.img) {
    //   formData.append("carName", data.carName);
    //   formData.append("description", data.description);
    //   formData.append("price", data.price);
    //   formData.append("file", data.img);
    //   formData.append(
    //     "upload_preset",
    //     import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    //   );

    //   // upload image to cloudinary
    //   const uploadImage = async () => {
    //     const pic = await axios.post(url, formData);
    //     uploadToDb(pic.data.url);
    //   };
    //   uploadImage();
    // } else {
    //   uploadToDb(car.img);
    // }
  };

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(error.message || "Something went wrong!");
      handleModalClose();
    }
    if (!isLoading && data) {
      toast.success(data?.message || "Car Updated.");
      handleModalClose();
    }
  }, [isLoading, isError, error, data]);

  return (
    <>
      <Modal
        keepMounted
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginX: "auto",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      fullWidth
                      label="Car Name"
                      {...register("carName", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      fullWidth
                      label="Car Price $"
                      {...register("price", { required: true })}
                    />
                  </Grid>

                  {/* car primary image update  */}
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Upload Car Image
                    </Typography>
                    <ImageUpload
                      name="img"
                      onChange={handleImageChange}
                      multiple={false}
                    />
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    disabled={isUploading || isLoading}
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
                      "Update Car"
                    )}
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default UpdateCarModal;
