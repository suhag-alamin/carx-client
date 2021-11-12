import { Backdrop, Button, Fade, Grid, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
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
  const { _id, carName, img, price } = car;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      carName: carName,
      price: price,
      img: img,
    },
  });
  const onSubmit = (data) => {
    data.price = parseFloat(data.price);
    console.log(data);
    axios
      .put(`https://afternoon-tor-94038.herokuapp.com/cars/${_id}`, data)
      .then((result) => {
        console.log(result);
        if (result.data?.modifiedCount > 0) {
          toast.info("Product Updated");
          handleModalClose();
        }
      });
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
                      label="Car Price"
                      {...register("price", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="url"
                      fullWidth
                      label="Car Image"
                      helperText="Upload the image to imgbb or wherever you want and submit the live link."
                      {...register("img", { required: true })}
                    />
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                  >
                    Update Product
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
