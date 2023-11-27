import { usePostReviewMutation } from "@/redux/features/review/reviewApi";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const GiveReview = () => {
  const { user } = useSelector((state) => state.auth);

  const [postReview, { isLoading, data }] = usePostReviewMutation();

  const [star, setStar] = useState(2);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      data.rating = star;
      data.user = user._id;

      postReview(data);
      reset();
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      toast.success(data?.message || "Thanks for your review. 😍");
    }
  }, [isLoading, data]);

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" color="secondary">
        Please give your review.
      </Typography>
      <Divider />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
            marginX: "auto",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  fullWidth
                  label="Review"
                  required
                  multiline
                  {...register("review", { required: true })}
                />
                {errors.review && (
                  <span className="error">Review is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  color="secondary"
                  sx={{ mb: 1 }}
                  variant="subtitle1"
                >
                  Give us your rating
                </Typography>
                <Rating
                  precision={0.5}
                  size="large"
                  value={star}
                  required
                  onChange={(event, newValue) => {
                    setStar(newValue);
                  }}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      p: 0,
                    }}
                  >
                    <CircularProgress
                      size="20px"
                      sx={{
                        color: "info.main",
                      }}
                    />
                  </Box>
                ) : (
                  "Give Review"
                )}
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default GiveReview;
