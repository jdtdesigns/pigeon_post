// Import express
const express = require('express');

// Import our view_routes
const view_routes = require('./controllers/view_routes');

// Create the port number and prepare for heroku with the process.env.PORT value
const PORT = process.env.PORT || 3333;

// Create the server app
const app = express();

// Open the static channel for our browser assets - ie. express.static on the public folder
app.use(express.static('./public'));

// Load our view routes at the root level '/'
app.use('/', view_routes);

// Start the server and log the port that it started on
app.listen(PORT, () => console.log('Server is running on port', PORT));