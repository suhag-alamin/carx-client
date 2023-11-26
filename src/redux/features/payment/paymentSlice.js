import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientSecret: null,
  paymentId: null,
  currency: null,
  amount: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentIntent: (state, action) => {
      state.clientSecret = action.payload.clientSecret;
      state.paymentId = action.payload.paymentId;
      state.currency = action.payload.currency;
      state.amount = action.payload.amount;
    },
    clearPaymentIntent: (state) => {
      state.clientSecret = null;
      state.paymentId = null;
      state.currency = null;
      state.amount = null;
    },
  },
});

export const { setPaymentIntent, clearPaymentIntent } = paymentSlice.actions;

export default paymentSlice.reducer;
