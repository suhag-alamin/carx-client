export const getErrorMessage = (obj, propertyPath) => {
  let value = obj;

  if (value[propertyPath]) {
    value = value[propertyPath];
  } else {
    return undefined;
  }
  return value.message;
};
