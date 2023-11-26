import OthersBanner from "@/components/Shared/OthersBanner";
import {
  applyCoupon,
  removeCoupon,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cars, total, tax, isCouponApplied } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  // const [totalAmount, setTotalAmount] = useState(total);
  // const [tax, setTax] = useState(0);

  // // let totalAmount = +total + calculateCax;
  // useEffect(() => {
  //   const calculateTax = +total * 0.1;
  //   setTax(calculateTax);
  //   setTotalAmount(+total + calculateTax);
  // }, [total]);

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data) => {
    if (data.coupon === "20OFF") {
      dispatch(applyCoupon());
      reset();
    } else {
      toast.error("Invalid coupon code!");
      reset();
    }
  };

  return (
    <div>
      <OthersBanner>View Cart</OthersBanner>
      <Container
        sx={{
          py: 6,
        }}
      >
        {cars?.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <List>
              {cars?.map((car) => (
                <>
                  <ListItem
                    key={car._id}
                    disablePadding
                    disableRipple
                    disableTouchRipple
                  >
                    <ListItemIcon>
                      <DirectionsCarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={car.carName}
                      secondary={`$ ${car.price}`}
                    />
                    <Button
                      sx={{
                        justifyContent: "flex-end",
                      }}
                      color="error"
                      variant="text"
                      title="Remove from cart"
                      onClick={() => dispatch(removeFromCart(car._id))}
                    >
                      <RemoveShoppingCartIcon />
                    </Button>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>

            <Box
              sx={{
                // bgcolor: "customBg.main",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography variant="body1">Have a coupon?</Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ my: 3, display: "flex", gap: 2 }}
                >
                  <TextField
                    type="text"
                    size="small"
                    label="Coupon Code e.g. 20OFF"
                    disabled={isCouponApplied}
                    {...register("coupon", { required: true })}
                  />

                  <Button
                    sx={{
                      m: 0,
                    }}
                    type="submit"
                    variant="outlined"
                    size="small"
                    disabled={isCouponApplied}
                  >
                    Apply
                  </Button>
                  {isCouponApplied && (
                    <Button
                      sx={{
                        m: 0,
                      }}
                      type="submit"
                      variant="contained"
                      size="small"
                      onClick={() => dispatch(removeCoupon())}
                    >
                      Reset
                    </Button>
                  )}
                </Box>
              </Box>
              <Divider />
              <Typography variant="subtitle2">
                Total Items: {cars?.length}
              </Typography>
              <Typography variant="subtitle2">Tax: $ {tax}</Typography>

              <Typography variant="subtitle1">Total: $ {total}</Typography>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Link to="/cars">
                  <Button variant="outlined" color="secondary">
                    Add More?
                  </Button>
                </Link>
                <Link to="/checkout">
                  <Button variant="contained" color="secondary">
                    Checkout
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "error.main",
              }}
            >
              Your cart is empty!
            </Typography>
            <Link to="/cars">
              <Button variant="contained">Add Car Now!</Button>
            </Link>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Cart;
