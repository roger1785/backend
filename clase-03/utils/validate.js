export const validatePrice = (price) => {
  if (typeof price !== "number" || price <= 0) {
    return false;
  }
  return true;
};
