// Import the Sequelize constructor from sequelize
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a variable to determine if the app is running on Heroku
const is_production = process.env.PORT;
let sequelize;

// If running on Heroku, we pass the Jaws DB URL as our connection
if (is_production) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Otherwise, we use the local connection to develop
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    // Turn off SQL logging in the terminal
    logging: false
  });
}

// Export the connection object
module.exports = sequelize;