import * as yup from "yup";

export const addCarSchema = yup.object().shape({
  carName: yup.string().required("Car name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
});

export const updateCarSchema = yup.object().shape({
  carName: yup.string().required("Car name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
});
