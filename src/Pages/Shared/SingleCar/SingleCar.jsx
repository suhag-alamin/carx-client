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
import "./SingleCar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router";

const SingleCar = ({ car }) => {
  const { _id, carName, description, img, price } = car;

  const navigate = useNavigate();
  const hanldeClick = (id) => {
    navigate(`/placeOrder/${id}`);
  };
  return (
    <Grid item xs={2} sm={4} md={6} lg={4}>
      <Card sx={{ height: "100%", boxShadow: 1 }}>
        <Box sx={{ overflow: "hidden" }} className="car-thumb-box">
          <CardMedia
            className="car-thumb"
            component="img"
            height="240"
            image={img}
            alt={carName}
          />
          <Typography className="car-price" variant="h6">
            $ {price}
          </Typography>
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
          <Typography variant="body2" color="text.secondary">
            {description.slice(0, 80)}...
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "end", pb: 2, pr: 2 }}>
          <Button
            className="carx-btn"
            variant="contained"
            sx={{ px: 4 }}
            startIcon={<ShoppingCartIcon />}
            onClick={() => hanldeClick(_id)}
          >
            Buy Now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default SingleCar;
