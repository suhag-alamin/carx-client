import { Paper, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/system";

const ReviewCard = ({ review: clientReview }) => {
  const { user, review, rating } = clientReview;
  return (
    <Box sx={{ height: 1, py: 2, px: 1 }}>
      <Paper
        sx={{ px: 3, py: 2, borderRadius: 2, textAlign: "center" }}
        elevation={2}
      >
        <Typography variant="h5" color="primary">
          {user?.displayName}
        </Typography>
        <Typography variant="subtitle1" color="secondary.main">
          {user?.email}
        </Typography>
        <Typography color="text.secondary" variant="body1">
          {review}
        </Typography>
        <Rating defaultValue={rating} precision={0.5} readOnly />
      </Paper>
    </Box>
  );
};

export default ReviewCard;
