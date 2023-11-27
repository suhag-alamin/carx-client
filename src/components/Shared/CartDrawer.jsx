import { removeFromCart } from "@/redux/features/cart/cartSlice";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartDrawer = ({
  cartDrawerOpen,
  setCartDrawerOpen,
  toggleDrawer,
  anchor,
}) => {
  const { cars, total } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const closeDrawer = () => {
    setCartDrawerOpen({ ...cartDrawerOpen, [anchor]: false });
  };

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <List>
        {cars?.length > 0 ? (
          cars?.map((car) => (
            <React.Fragment key={car._id}>
              <ListItem disablePadding={true}>
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
          ))
        ) : (
          <ListItem>
            <ListItemText
              sx={{
                color: "error.main",
              }}
              primary="Your cart is empty!"
            />
          </ListItem>
        )}
      </List>

      {cars?.length > 0 && (
        <Box
          sx={{
            bgcolor: "customBg.main",
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Total: $ {total}
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Link to="/cart">
              <Button
                onClick={() => closeDrawer()}
                variant="outlined"
                color="secondary"
              >
                View Cart
              </Button>
            </Link>
            <Link to="/checkout">
              <Button
                onClick={() => closeDrawer()}
                variant="contained"
                color="secondary"
              >
                Checkout
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={anchor}
        open={cartDrawerOpen[anchor]}
        onClose={toggleDrawer(anchor, false)}
        // variant="temporary"
        // ModalProps={{
        //   keepMounted: true,
        // }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: {
              xs: "100%",
              md: "25%",
            },
            p: 2,
          },
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default CartDrawer;
