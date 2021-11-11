import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const [signUpInfo, setSignUpInfo] = useState({});

  const { handleEmailRegister, signInWithGoogle } = useAuth();

  const history = useHistory();
  const location = useLocation();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...signUpInfo };
    newValue[field] = value;
    setSignUpInfo(newValue);
  };

  const handleSubmit = (e) => {
    const { name, email, password, password2 } = signUpInfo;
    if (password !== password2) {
      alert("Password Not matched");
      e.preventDefault();
      return;
    }
    handleEmailRegister(name, email, password, history);
    e.preventDefault();
    e.target.reset();
  };

  const handleGoogleLogin = () => {
    signInWithGoogle(location, history);
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                type="text"
                name="name"
                fullWidth
                label="Your Name"
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="email"
                fullWidth
                label="Email Address"
                name="email"
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Re Enter Password"
                type="password"
                onBlur={handleOnBlur}
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
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
