export const isLoggedIn = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};
