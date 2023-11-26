import { api } from "@/redux/api/apiSlice";

const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/message",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = messageApi;
