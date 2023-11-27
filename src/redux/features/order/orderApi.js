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
    getOrders: builder.query({
      query: (arg) => ({
        url: "/orders",
        params: arg,
      }),
      providesTags: [tagTypes.order],
    }),
    getOrdersByUser: builder.query({
      query: (arg) => ({
        url: "/orders/user",
        params: arg,
      }),
      providesTags: [tagTypes.order],
    }),
    getSingleOrder: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: [tagTypes.order],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.order],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useGetOrdersByUserQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
