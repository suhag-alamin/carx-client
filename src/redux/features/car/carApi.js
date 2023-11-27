import { api } from "@/redux/api/apiSlice";
import { tagTypes } from "@/redux/tagTypes";

const carApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query({
      query: (arg) => ({
        url: "/cars",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.car],
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.car],
    }),
    createCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.car],
    }),
    updateCar: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cars/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.car],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.car],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetSingleCarQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;
