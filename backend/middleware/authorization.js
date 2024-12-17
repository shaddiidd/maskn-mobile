// authorization.js
const User = require("../models/users");
const Role = require("../models/roles");
const Permission = require("../models/permissions");

const authorization = (requiredPermission) => {
  return async (req, res, next) => {
      try {
          // Assume user role and permissions are attached to `req.user` via authentication
          const userId = req.token.userId;

          // Fetch user with role and permissions
          const user = await User.findByPk(userId, {
              include: {
                  model: Role,
                  as: "role",
                  include: {
                      model: Permission,
                      as: "permissions",
                      where: { permission: requiredPermission }, // Filter required permission
                  },
              },
          });

          // Check if user has the required permission
          if (
              user &&
              user.role &&
              user.role.permissions &&
              user.role.permissions.length > 0
          ) {
              return next(); // User has the required permission
          }

          // Forbidden: User lacks the required permission
          return res.error(
              null,
              "Forbidden: Insufficient permissions",
              403
          );
      } catch (error) {
          // Handle unexpected server errors
          res.error(
              error,
              "Server error while checking permissions",
              500
          );
      }
  };
};


module.exports = authorization;
