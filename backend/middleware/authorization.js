// authorization.js
const User = require("../models/users");
const Role = require("../models/roles");
const Permission = require("../models/permissions");

const authorization = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      // Assume user role and permissions are attached to `req.user` via authentication
      const userId = req.token.userId;

      // Get user roles and permissions
      const user = await User.findByPk(userId, {
        include: {
          model: Role,
          as: "role",
          include: {
            model: Permission,
            as: "permissions",
            where: { permission: requiredPermission }, // Check if the user has the required permission
          },
        },
      });

      if (
        user &&
        user.role &&
        user.role.permissions &&
        user.role.permissions.length > 0
      ) {
        next(); // User has permission
      } else {
        res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};

module.exports = authorization;
