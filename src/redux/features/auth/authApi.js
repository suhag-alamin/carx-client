import { api } from "@/redux/api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    makeAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/make-admin",
        method: "PATCH",
        data,
      }),
    }),
  }),
});

export const { useMakeAdminMutation } = authApi;
