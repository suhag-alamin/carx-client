import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFirebase from "@/hooks/useFirebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  useDocumentTitle("Register");

  const [signUpInfo, setSignUpInfo] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { handleEmailRegister, signInWithGoogle } = useFirebase();

  const navigate = useNavigate();
  const location = useLocation();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...signUpInfo };
    newValue[field] = value;
    setSignUpInfo(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = signUpInfo;
    if (name && email && password && password2) {
      if (password !== password2) {
        toast.warning("Password Not matched");
        return;
      }
      handleEmailRegister(name, email, password, navigate);
      e.target.reset();
    } else {
      toast.error(
        !name
          ? "Please enter your name"
          : !email
            ? "Please enter your email"
            : !password
              ? "Please enter password"
              : "Please enter confirm password"
      );
    }
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
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
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
                  label="Confirm Password"
                  name="password2"
                  onBlur={handleOnBlur}
                />
              </FormControl>
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
