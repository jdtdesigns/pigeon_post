// Import Model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

// Create a User class and extend the Model class
class User extends Model { }

// Call User.init and setup a couple columns/fields - email & password as text strings
User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 6
    }
  }
}, {
  modelName: 'user',
  // Connection object
  sequelize: db
});

// Export the User model
module.exports = User;