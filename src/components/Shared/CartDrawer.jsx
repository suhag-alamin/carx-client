import { removeFromCart } from "@/redux/features/cart/cartSlice";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";

const CartDrawer = ({ cartDrawerOpen, toggleDrawer, anchor }) => {
  const { cars } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

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
            <>
              <ListItem
                key={car._id}
                disablePadding
                disableRipple
                disableTouchRipple
              >
                <ListItemIcon>
                  <DirectionsCarIcon />
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button variant="outlined" color="secondary">
            View Cart
          </Button>
          <Button variant="contained" color="secondary">
            Checkout
          </Button>
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
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
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
