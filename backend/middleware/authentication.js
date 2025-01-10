const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
      // Extract token from the Authorization header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
          return res.error(
              null,
              "Forbidden: No token provided",
              403
          );
      }
      const token = authHeader.split(" ").pop();
      const SECRET = process.env.SECRET;

      // Verify the token
      jwt.verify(token, SECRET, (err, decoded) => {
          if (err) {
              return res.error(
                  null,
                  "Forbidden: Invalid or expired token",
                  403
              );
          }

          // Attach decoded token to request
          req.token = decoded;
          next();
      });
  } catch (error) {
      // Handle unexpected errors
      res.error(
          error,
          "Forbidden: Authentication failed",
          403
      );
  }
};



module.exports = authentication;