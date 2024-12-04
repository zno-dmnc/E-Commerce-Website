const jwt = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(403).json({ message: "No token" });
  }

  jwt.verify(token, "cloudProject", (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Failure to authenticate token" });
    }

    request.user = user;
    next();
  });
};

module.exports = authenticateToken;