import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Badge, IconButton, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import CartDrawer from "./CartDrawer";
import { useState } from "react";

const CartBadge = () => {
  const { cars } = useSelector((state) => state.cart);

  const [cartDrawerOpen, setCartDrawerOpen] = useState({
    bottom: false,
    right: false,
  });
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const anchor = isMobile ? "bottom" : "right";

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setCartDrawerOpen({ ...cartDrawerOpen, [anchor]: open });
  };

  return (
    <>
      <IconButton
        sx={{
          mx: 2,
        }}
        onClick={toggleDrawer(anchor, true)}
      >
        <Badge badgeContent={cars?.length} max={9} color="secondary">
          <LocalMallIcon color="action" />
        </Badge>
      </IconButton>
      <CartDrawer
        cartDrawerOpen={cartDrawerOpen}
        setCartDrawerOpen={setCartDrawerOpen}
        toggleDrawer={toggleDrawer}
        anchor={anchor}
      />
    </>
  );
};

export default CartBadge;
