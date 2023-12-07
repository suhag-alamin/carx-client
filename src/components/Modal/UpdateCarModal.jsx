import { useUpdateCarMutation } from "@/redux/features/car/carApi";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const { _id, carName, description, price, img, gallery } = car;

  const [newImg, setNewImg] = useState(img);
  const [newGallery, setNewGallery] = useState(gallery);
  const [isUploading, setIsUploading] = useState(false);

  const [updateCar, { isLoading, data, isError, error }] =
    useUpdateCarMutation();

  const handleImageChange = (name, urls) => {
    setIsUploading(true);
    if (name === "img") {
      setNewImg(urls[0]);
    } else {
      setNewGallery((prev) => [...prev, ...urls]);
    }
    setIsUploading(false);
  };

  const handleImageDelete = (name, url) => {
    if (name === "img") {
      setNewImg(null);
    } else {
      setNewGallery((prevGallery) =>
        prevGallery.filter((item) => item !== url)
      );
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm({
    defaultValues: {
      carName: carName,
      description: description,
      price: price,
    },
  });
  const onSubmit = (data) => {
    data.price = parseFloat(data.price);

    if (newImg) {
      data.img = newImg;
    }
    if (newGallery.length) {
      data.gallery = newGallery;
    }

    updateCar({ id: _id, data });
    reset();
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
      <Modal open={modalOpen} onClose={handleModalClose} closeAfterTransition>
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginX: "auto",
                maxHeight: "70vh",
                overflowY: "auto",
                padding: 1,
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
                      type="text"
                      fullWidth
                      required
                      multiline
                      label="Car Description"
                      {...register("description", { required: true })}
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

                  {/* car cover image update  */}

                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Cover Image
                    </Typography>
                    {newImg ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <img
                          src={newImg}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                        />
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleImageDelete("img", img)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    ) : (
                      <ImageUpload
                        name="img"
                        onChange={handleImageChange}
                        multiple={false}
                      />
                    )}
                  </Grid>

                  {/* car gallery update */}
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Gallery Images
                    </Typography>
                    {newGallery.map((url, index) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                        key={index}
                      >
                        <img
                          src={url}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                        />
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleImageDelete("gallery", url)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    ))}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Add More Images
                    </Typography>
                    <ImageUpload
                      name="gallery"
                      onChange={handleImageChange}
                      multiple={true}
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
