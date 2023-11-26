import { OrderStatus } from "@/constant/global";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAmount: 0,
  status: OrderStatus.pending,
  deliveryDetails: {
    address: "",
    city: "",
    country: "",
    zipCode: "",
    phone: "",
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.totalAmount = action.payload.totalAmount;
      state.deliveryDetails = action.payload.deliveryDetails;
    },
    clearOrderDetails: (state) => {
      state.totalAmount = 0;
      state.deliveryDetails = {
        address: "",
        city: "",
        country: "",
        zipCode: "",
        phone: "",
      };
    },
  },
});

export const { setOrderDetails, clearOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
