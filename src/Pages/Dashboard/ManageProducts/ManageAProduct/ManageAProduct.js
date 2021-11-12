import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateProductModal from "../UpdateProductModal/UpdateProductModal";

const ManageAProduct = ({ car, handleDelete }) => {
  const { _id, carName, img, price } = car;

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Grid item xs={2} sm={4} md={6} lg={4}>
        <Card sx={{ height: "100%", boxShadow: 1 }}>
          <Box sx={{ overflow: "hidden" }} className="car-thumb-box">
            <CardMedia
              className="car-thumb"
              component="img"
              height="300"
              image={img}
              alt={carName}
            />
          </Box>

          <CardContent>
            <Typography
              color="secondary"
              gutterBottom
              variant="h5"
              component="div"
            >
              {carName}
            </Typography>
            <Typography gutterBottom variant="h6">
              $ {price}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center", pb: 2, pr: 2 }}>
            <ButtonGroup variant="contained">
              <Button
                sx={{ px: 4 }}
                startIcon={<DeleteIcon />}
                onClick={() => handleModalOpen(_id)}
              >
                Edit
              </Button>
              <Button
                // className="carx-btn"
                // variant="contained"
                sx={{ px: 4 }}
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(_id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>
      {/* modal  */}
      <UpdateProductModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        car={car}
      />
    </>
  );
};

export default ManageAProduct;
