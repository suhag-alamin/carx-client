import { api } from "@/redux/api/apiSlice";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (arg) => ({
        url: "/reviews",
        method: "GET",
        params: arg,
      }),
      providesTags: ["Review"],
    }),
    getSingleReview: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    postReview: builder.mutation({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetSingleReviewQuery,
  usePostReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
