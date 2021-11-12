import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [loginUpInfo, setLoginInfo] = useState({});
  const { handleEmailLogin, signInWithGoogle } = useAuth();

  const location = useLocation();
  const history = useHistory();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...loginUpInfo };
    newValue[field] = value;
    setLoginInfo(newValue);
  };

  const handleSubmit = (e) => {
    const { email, password } = loginUpInfo;
    handleEmailLogin(email, password, location, history);
    e.preventDefault();
    e.target.reset();
  };

  const handleGoogleLogin = () => {
    signInWithGoogle(location, history);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
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
            <TextField
              required
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              onBlur={handleOnBlur}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid sx={{ mb: 2 }} container>
              <Grid item xs>
                <Link
                  style={{ color: "#16425b" }}
                  to="/forgetPassword"
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
