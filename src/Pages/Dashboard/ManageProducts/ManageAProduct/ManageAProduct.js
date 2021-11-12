import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageAProduct = ({ car, handleDelete }) => {
  const { _id, carName, img, price } = car;

  return (
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
          <Button
            className="carx-btn"
            variant="contained"
            sx={{ px: 4 }}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(_id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ManageAProduct;
