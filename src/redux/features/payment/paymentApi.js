import { api } from "@/redux/api/apiSlice";
import { tagTypes } from "@/redux/tagTypes";

const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/payment/create-payment-intent",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
