/* eslint-disable no-unused-vars */
import { baseAPI } from "@/config/baseApi";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: baseAPI,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.user?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery,
//   endpoints: (builder) => ({}),
//   tagTypes: ["User", "Car", "Service", "Part", "Order", "Invoice", "Payment"],
// });

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: baseAPI,
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["User", "Car", "Service", "Part", "Order", "Invoice", "Payment"],
});
