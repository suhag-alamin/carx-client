import Form from "@/components/Forms/Form";
import FormTextField from "@/components/Forms/FormTextField";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useMakeAdminMutation } from "@/redux/features/auth/authApi";
import { makeAdminSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { toast } from "react-toastify";

const MakeAdmin = () => {
  // dynamic title
  useDocumentTitle("Make Admin");

  const [makeAdmin, { isLoading, data, isError, error }] =
    useMakeAdminMutation();

  const onSubmit = (data) => {
    makeAdmin(data);
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
        <Box>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(makeAdminSchema)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormTextField type="email" label="User Email" name="email" />
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
          </Form>
        </Box>
      </Box>
    </Container>
  );
};

export default MakeAdmin;
