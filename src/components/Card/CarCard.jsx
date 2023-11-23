import styles from "@/styles/Car.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
import { useNavigate } from "react-router";

const CarCard = ({ car }) => {
  const { _id, carName, description, img, price } = car;

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/place-order/${id}`);
  };
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
        <CardActions>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={() => handleClick(_id)}
          >
            Buy Now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CarCard;
