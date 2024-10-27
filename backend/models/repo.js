// In a separate file where you initialize Sequelize and models
const User = require('./users');
const Property = require('./properties');

// Define associations
User.hasMany(Property, {
    foreignKey: 'user_id', // Specify the foreign key in the Property model
});

Property.belongsTo(User, {
    foreignKey: 'user_id', // This must match the foreign key defined in the Property model
});
