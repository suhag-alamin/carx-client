import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField, Box } from "@mui/material";

const FormAutocomplete = ({
  name,
  options,
  label,
  validation,
  getOptionLabel,
  renderOption,
  autoComplete,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      render={({ field: { onChange, value, ...field } }) => (
        <Autocomplete
          options={options}
          autoHighlight
          fullWidth
          getOptionLabel={
            getOptionLabel ? getOptionLabel : (option) => option.label
          }
          isOptionEqualToValue={(option, value) => option.code === value.code}
          onChange={(event, newValue) => {
            onChange(newValue);
          }}
          value={value || null} // Provide a default value
          renderOption={
            renderOption
              ? renderOption
              : (props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code})
                  </Box>
                )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              inputProps={{
                ...params.inputProps,
                autoComplete: autoComplete,
              }}
            />
          )}
          {...field}
        />
      )}
    />
  );
};

export default FormAutocomplete;
