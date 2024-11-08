// In a separate file where you initialize Sequelize and models
const User = require('./users');
const Property = require('./properties');
const Role = require('./roles');
const Permission = require('./permissions');
const RolePermission = require('./rolePermission');

// Define associations
User.hasMany(Property, {
    foreignKey: 'user_id', // Specify the foreign key in the Property model
});

Property.belongsTo(User, {
    foreignKey: 'user_id', // This must match the foreign key defined in the Property model
});

// Define Role-Permission Many-to-Many Relationship
Role.belongsToMany(Permission, {
    through: RolePermission,
    as: 'permissions',      // Alias for accessing permissions of a role
    foreignKey: 'role_id',  // Foreign key in the join table
  });
  
  Permission.belongsToMany(Role, {
    through: RolePermission,
    as: 'roles',            // Alias for accessing roles of a permission
    foreignKey: 'permission_id', // Foreign key in the join table
  });
  
  // Define User-Role Relationship
  User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
  Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
  