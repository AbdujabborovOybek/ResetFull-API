const response = require("../Services/response.service");
const { verifyToken } = require("../Services/jwt.service");

const auth = async (req, res, next) => {
  const path = req.path;
  if (path === "/signin" || path === "/signup") return next();

  const token = req?.headers?.authorization?.split(" ")?.pop() || null;

  if (!token) return response.error(res, "Token is required");
  const user = await verifyToken(token);
  if (!user) return response.error(res, "Token is invalid");
  req.user = user || null;

  next();
};

module.exports = auth;
