import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const item = action.payload;
    //   const existItem = state.cars.find((x) => x.id === item.id);
    //   if (existItem) {
    //     state.cars = state.cars.map((x) => (x.id === existItem.id ? item : x));
    //   } else {
    //     state.cars = [...state.cars, item];
    //   }
    //   state.total = state.cars.reduce((acc, item) => acc + item.price, 0);
    // },
    addToCart: (state, action) => {
      const isExist = state.cars.find((car) => car._id === action.payload._id);
      if (!isExist) {
        state.cars.push(action.payload);
      }
      state.total = state.cars.reduce((acc, car) => acc + car.price, 0);
    },
    removeFromCart: (state, action) => {
      state.cars = state.cars.filter((car) => car._id !== action.payload);
      state.total = state.cars.reduce((acc, car) => acc + car.price, 0);
    },
    clearCart: (state) => {
      state.cars = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
