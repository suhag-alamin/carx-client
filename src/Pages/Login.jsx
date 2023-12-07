import Form from "@/components/Forms/Form";
import FormTextField from "@/components/Forms/FormTextField";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFirebase from "@/hooks/useFirebase";
import { loginSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  useDocumentTitle("Login");

  const { handleEmailLogin, signInWithGoogle } = useFirebase();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (loginUpInfo) => {
    const { email, password } = loginUpInfo;

    handleEmailLogin(email, password, location, navigate);
  };

  const handleDemoAdminLogin = () => {
    const email = import.meta.env.VITE_DEMO_ADMIN_EMAIL;
    const password = import.meta.env.VITE_DEMO_ADMIN_PASSWORD;
    handleEmailLogin(email, password, location, navigate);
    toast.warning(
      "You are logged in as a demo admin. Please don't delete any car. You can create new car and update or delete them. Thank you.",
      {
        autoClose: 3000,
      }
    );
  };

  const handleGoogleLogin = () => {
    signInWithGoogle(location, navigate);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://source.unsplash.com/collection/24844936)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign in</Typography>
          <Box sx={{ mt: 1 }}>
            <Form
              submitHandler={handleSubmit}
              resolver={yupResolver(loginSchema)}
            >
              <Grid container spacing={2}>
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
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained">
                Sign In
              </Button>
              <Button
                onClick={handleDemoAdminLogin}
                fullWidth
                variant="outlined"
              >
                Demo Admin Sign In
              </Button>
              <Grid sx={{ mb: 2 }} container>
                <Grid item xs>
                  <Link
                    style={{ color: "#16425b" }}
                    to="/forget-password"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    style={{ color: "#16425b" }}
                    to="/register"
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
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
      </Grid>
    </Grid>
  );
};

export default Login;
