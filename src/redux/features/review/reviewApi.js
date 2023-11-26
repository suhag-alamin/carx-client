import { api } from "@/redux/api/apiSlice";
import { tagTypes } from "@/redux/tagTypes";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (arg) => ({
        url: "/reviews",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.review],
    }),
    getSingleReview: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    postReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review],
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
