// Import express
const express = require('express');
const methodOverride = require('method-override');
const db = require('./config/connection');

const { engine } = require('express-handlebars');

const session = require('express-session');

// Import our view_routes
const view_routes = require('./controllers/view_routes');
const user_routes = require('./controllers/user_routes');
const coo_routes = require('./controllers/coo_routes');

// Create the port number and prepare for heroku with the process.env.PORT value
const PORT = process.env.PORT || 3333;

// Create the server app
const app = express();

// Open the static channel for our browser assets - ie. express.static on the public folder
app.use(express.static('./public'));

// Allow urlencoded form data to be sent from the client
app.use(express.urlencoded({ extended: false }));

// Open middleware for PUT and DELETE methods to be sent through client side forms
// You will see the ?_method=DELETE or ?_method=PUT parameter on the routes that I use to trigger these requests
app.use(methodOverride('_method'));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Load session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true
  }
}));

// Load our view routes at the root level '/'
app.use('/', [view_routes, coo_routes]);
// /auth/register
app.use('/auth', user_routes);

// Sync and create tables
db.sync({ force: false })
  .then(() => {
    // Start the server and log the port that it started on
    app.listen(PORT, () => console.log('Server is running on port', PORT));
  });