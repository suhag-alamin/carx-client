import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useMakeAdminMutation } from "@/redux/features/auth/authApi";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MakeAdmin = () => {
  // dynamic title
  useDocumentTitle("Make Admin");

  const [makeAdmin, { isLoading, data, isError, error }] =
    useMakeAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    makeAdmin(data);
    reset();
  };

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    if (!isLoading && data) {
      toast.success(data?.message || "Admin made successfully");
    }
  }, [isLoading, isError, error, data]);

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" color="secondary">
        Make Admin
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "auto",
          width: { xs: "80%", md: "50%" },
          py: 3,
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                fullWidth
                required
                label="User Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="error">User Email is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
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
                  "Make Admin"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default MakeAdmin;
