import {
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #16425b",
  boxShadow: 24,
  p: 4,
};

const UpdateProductModal = ({ modalOpen, handleModalClose, car }) => {
  const { _id, carName, price } = car;
  const [isLoading, setIsLoading] = useState(false);

  const formData = new FormData();
  const url = "https://api.cloudinary.com/v1_1/dkw1ovah4/image/upload";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      carName: carName,
      price: price,
    },
  });
  const onSubmit = (data) => {
    data.img = data.img[0];
    data.price = parseFloat(data.price);

    formData.append("carName", data.carName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("file", data.img);
    formData.append("upload_preset", "llqbnsmr");

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
      setIsLoading(true);
      axios
        .put(`https://carx-suhag.onrender.com/cars/${_id}`, data)
        .then((result) => {
          if (result.data?.modifiedCount > 0) {
            toast.info(
              "Product Updated. To see the updated version, please refresh."
            );
            setIsLoading(false);
            handleModalClose();
          }
        });
    };
  };
  return (
    <>
      <Modal
        keepMounted
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
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
                    <TextField
                      type="file"
                      fullWidth
                      required
                      helperText="Update Car Image"
                      {...register("img")}
                    />
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
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
                      "Update Product"
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

export default UpdateProductModal;
