export const logout = () => {
  // JWT tokens remove
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  // cart চাইলে রাখবা, চাইলে clear
  // localStorage.removeItem("carryonix_cart");
};
