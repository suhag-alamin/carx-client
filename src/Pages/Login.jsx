import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFirebase from "@/hooks/useFirebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  useDocumentTitle("Login");

  const [loginUpInfo, setLoginInfo] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { handleEmailLogin, signInWithGoogle } = useFirebase();

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...loginUpInfo };
    newValue[field] = value;
    setLoginInfo(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginUpInfo;
    if (email && password) {
      handleEmailLogin(email, password, location, navigate);
    } else {
      toast.error(
        !email
          ? "Please enter your email"
          : !password
            ? "Please enter password"
            : "Something went wrong"
      );
    }
    e.target.reset();
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              required
              type="email"
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              onBlur={handleOnBlur}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                onBlur={handleOnBlur}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained">
              Sign In
            </Button>
            <Button onClick={handleDemoAdminLogin} fullWidth variant="outlined">
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
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
