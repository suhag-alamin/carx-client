import { useEffect } from "react";

import { FormProvider, useForm } from "react-hook-form";

const Form = ({ children, submitHandler, defaultValues, resolver }) => {
  const formConfig = {};

  if (!!defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  if (!!resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const handleOnSubmit = (data) => {
    submitHandler(data);
    reset();
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
