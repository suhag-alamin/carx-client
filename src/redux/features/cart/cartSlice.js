import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  total: 0,
  tax: 0,
  coupon: "20OFF",
  isCouponApplied: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.cars.find((car) => car._id === action.payload._id);
      if (!isExist) {
        state.cars.push(action.payload);
      }

      const initialTotal = state.cars.reduce((acc, car) => acc + car.price, 0);

      state.tax = +(initialTotal * 0.1).toFixed(2);

      state.total = +initialTotal + state.tax;
    },
    removeFromCart: (state, action) => {
      state.cars = state.cars.filter((car) => car._id !== action.payload);
      state.total = state.cars.reduce((acc, car) => acc + car.price, 0);
    },
    clearCart: (state) => {
      state.cars = [];
      state.total = 0;
      state.tax = 0;
      state.isCouponApplied = false;
    },
    applyCoupon: (state) => {
      if (!state.isCouponApplied) {
        state.total = state.total * 0.8;
      }
      state.isCouponApplied = true;
    },
    removeCoupon: (state) => {
      state.total = state.total / 0.8;
      state.isCouponApplied = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
