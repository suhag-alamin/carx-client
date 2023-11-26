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
  }),
});

export const { useGetCarsQuery, useGetSingleCarQuery } = carApi;
