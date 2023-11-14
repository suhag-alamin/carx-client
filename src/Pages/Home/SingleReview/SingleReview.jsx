import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Rating from "@mui/material/Rating";

const SingleReview = ({ review: clientReview }) => {
  const { userName, email, review, rating } = clientReview;
  return (
    <Box sx={{ height: 1, py: 2, px: 1 }}>
      <Paper
        sx={{ px: 3, py: 2, borderRadius: 2, textAlign: "center" }}
        elevation={2}
      >
        <Typography variant="h5" color="primary">
          {userName}
        </Typography>
        <Typography sx={{ mb: 1 }} variant="subtitle1" color="seconday">
          {email}
        </Typography>
        <Typography color="text.secondary" paragraph>
          {review}
        </Typography>
        <Rating
          name="half-rating-read"
          defaultValue={rating}
          precision={0.5}
          readOnly
        />
      </Paper>
    </Box>
  );
};

export default SingleReview;
