import Form from "@/components/Forms/Form";
import FormTextField from "@/components/Forms/FormTextField";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFirebase from "@/hooks/useFirebase";
import { registerSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  useDocumentTitle("Register");

  const { handleEmailRegister, signInWithGoogle } = useFirebase();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (signUpInfo) => {
    const { name, email, password } = signUpInfo;

    handleEmailRegister(name, email, password, navigate);
  };

  const handleGoogleLogin = () => {
    signInWithGoogle(location, navigate);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign up</Typography>
        <Box sx={{ mt: 3 }}>
          <Form
            submitHandler={handleSubmit}
            resolver={yupResolver(registerSchema)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormTextField name="name" label="Your Name" />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="password"
                  label="Password"
                  name="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid sx={{ mb: 2 }} container justifyContent="flex-end">
              <Grid item>
                <Link style={{ color: "#16425b" }} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Divider />
            <Box sx={{ py: 1, textAlign: "center" }}>
              <Typography>Or Sign In Using Google</Typography>
              <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={handleGoogleLogin}
                  fullWidth
                  startIcon={<GoogleIcon />}
                  variant="outlined"
                >
                  Google LogIn
                </Button>
              </Box>
            </Box>
          </Form>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
