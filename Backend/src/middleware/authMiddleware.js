export const protectedRoute = (req, res, next) => {
  if (!req.auth().isAuthenticated) {
    return resprotectedRoute
      .status(401)
      .json({ message: "Unauthorized - You must be logged in" });
  }

  next();
};
