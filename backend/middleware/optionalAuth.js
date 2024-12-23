const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
      // No token provided, proceed without authentication
      return next();
    }

    const token = authHeader.split(" ").pop();
    const SECRET = process.env.SECRET;

    // Verify the token
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        // Invalid token, proceed as unauthenticated
        return next();
      }

      // Attach decoded token to request
      req.token = decoded;
      next();
    });
  } catch (error) {
    // Handle unexpected errors
    return next(error); // Pass error to the error-handling middleware
  }
};

module.exports = optionalAuth;


