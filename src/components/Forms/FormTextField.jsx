/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

import { getErrorMessage } from "@/utils/schemaValidator";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const FormTextField = ({
  name,
  type = "text",
  size,
  value,
  placeholder,
  label,
  helperText,
  styleProp,
  disable,
  rows,
  onChange,
  defaultValue = "",
  variant = "outlined",
  fullWidth = true,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, name);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOnChange = (value) => {
    onChange ? onChange(value) : null;
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) =>
          type === "password" ? (
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                {label}
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
                label={label}
                size={size}
                {...field}
                placeholder={placeholder}
                value={value !== undefined ? value : field.value}
                sx={styleProp}
                disabled={disable}
                fullWidth={fullWidth}
              />
            </FormControl>
          ) : type === "text-area" ? (
            <TextField
              {...field}
              size={size}
              label={label}
              placeholder={placeholder}
              value={value !== undefined ? value : field.value}
              sx={styleProp}
              disabled={disable}
              rows={rows}
              variant={variant}
              fullWidth={fullWidth}
              helperText={helperText}
            />
          ) : type === "number" ? (
            <TextField
              {...field}
              type={type}
              size={size}
              placeholder={placeholder}
              value={value !== undefined ? value : field.value}
              sx={styleProp}
              disabled={disable}
              onChange={handleOnChange}
              defaultValue={value}
              fullWidth={fullWidth}
              helperText={helperText}
              label={label}
            />
          ) : (
            <TextField
              {...field}
              type={type}
              size={size}
              placeholder={placeholder}
              value={value !== undefined ? value : field.value}
              sx={styleProp}
              disabled={disable}
              fullWidth={fullWidth}
              helperText={helperText}
              label={label}
            />
          )
        }
      />

      {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default FormTextField;
