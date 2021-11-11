import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ForgetPassword = () => {
  const [loginUpInfo, setLoginInfo] = useState({});

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...loginUpInfo };
    newValue[field] = value;
    setLoginInfo(newValue);
  };

  const handleSubmit = (e) => {
    const { email } = loginUpInfo;
    console.log(loginUpInfo);
    e.preventDefault();
    e.target.reset();
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
          backgroundImage: "url(https://source.unsplash.com/random)",
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link style={{ color: "#16425b" }} to="/login" variant="body2">
                  Remind it? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
