import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(16, "Password is too long - should be 16 chars maximum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!`~@#$%^&*()_+=[\]{}|\\;:'",<.>/?])[a-zA-Z\d!`~@#$%^&*()_+=[\]{}|\\;:'",<.>/?-]{8,16}$/,
      "Password must include at least one number, one special character, one uppercase and one lowercase character."
    )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
