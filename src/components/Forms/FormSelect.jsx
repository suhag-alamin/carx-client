/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { getErrorMessage } from "@/utils/schemaValidator";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormSelect = ({
  name,
  size,
  value,
  label,
  options,
  defaultValue = "",
  placeholder,
  helperText,
  onFieldChange,
  variant = "outlined",
  fullWidth = true,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, name);

  return (
    <>
      <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <FormControl fullWidth>
            <InputLabel id="select-label">{label}</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={value}
              label={label}
              placeholder={placeholder}
              size={size}
              fullWidth={fullWidth}
              onChange={(value) => {
                onChange(value);
                onFieldChange ? onFieldChange(value) : null;
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      {errorMessage ? (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      ) : (
        <Typography variant="body2">{helperText}</Typography>
      )}
    </>
  );
};

export default FormSelect;
