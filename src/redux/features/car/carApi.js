import { api } from "@/redux/api/apiSlice";

const carApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query({
      query: (arg) => ({
        url: "/cars",
        method: "GET",
        params: arg,
      }),
      providesTags: ["Car"],
    }),
  }),
});

export const { useGetCarsQuery } = carApi;
