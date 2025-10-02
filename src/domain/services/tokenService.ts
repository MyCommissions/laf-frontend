// Example cleanup
export const tokenService = {
  // No direct get/set for JWT anymore
  clearUser: () => sessionStorage.removeItem("user"),
};
