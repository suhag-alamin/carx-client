import Form from "@/components/Forms/Form";
import FormTextField from "@/components/Forms/FormTextField";
import OthersBanner from "@/components/Shared/OthersBanner";
import useDocumentTitle from "@/hooks/useDocumentTitle";
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
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  useDocumentTitle("Cart");

  const { cars, total, tax, isCouponApplied } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (data.coupon === "20OFF") {
      dispatch(applyCoupon());
    } else {
      toast.error("Invalid coupon code!");
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
                <React.Fragment key={car?._id}>
                  <ListItem disablePadding>
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
                </React.Fragment>
              ))}
            </List>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography variant="body1">Have a coupon?</Typography>
                <Form submitHandler={onSubmit}>
                  <Box sx={{ my: 3, display: "flex", gap: 2 }}>
                    <FormTextField
                      type="text"
                      size="small"
                      label="Coupon Code e.g. 20OFF"
                      disabled={isCouponApplied}
                      name="coupon"
                      fullWidth={false}
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
                </Form>
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
