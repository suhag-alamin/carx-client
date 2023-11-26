import { api } from "@/redux/api/apiSlice";
import { tagTypes } from "@/redux/tagTypes";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
