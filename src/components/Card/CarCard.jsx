import { addToCart } from "@/redux/features/cart/cartSlice";
import styles from "@/styles/Car.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const { _id, carName, description, img, price } = car;

  const dispatch = useDispatch();

  return (
    <Grid item xs={2} sm={4} md={6} lg={4}>
      <Card>
        <Box sx={{ overflow: "hidden" }} className={styles.carThumbBox}>
          <CardMedia
            className={styles.carThumb}
            component="img"
            height="240"
            image={img}
            alt={carName}
          />
          <Typography className={styles.carPrice} variant="subtitle1">
            $ {price}
          </Typography>
        </Box>

        <CardContent>
          <Typography color="secondary" gutterBottom variant="h5">
            {carName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description.slice(0, 80)}...
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Link to={`/cars/${_id}`}>
            <Button variant="outlined">Details</Button>
          </Link>
          <Button
            sx={{
              my: 2,
            }}
            variant="contained"
            endIcon={<AddShoppingCartIcon />}
            onClick={() => dispatch(addToCart(car))}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CarCard;
