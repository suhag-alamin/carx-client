import * as yup from "yup";

export const orderDetailsSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10,14}$/, "Contact number is not valid")
    .required("Contact Number is required"),
  zipCode: yup.string().required("Zip code is required"),
  country: yup.object().shape({
    label: yup.string().required("Country name is required"),
    code: yup.string().required("Country code is required"),
    phone: yup.string().required("Country phone is required"),
  }),
  countryCode: yup.object().shape({
    label: yup.string().required("Country name is required"),
    code: yup.string().required("Country code is required"),
    phone: yup.string().required("Country phone is required"),
  }),
});
