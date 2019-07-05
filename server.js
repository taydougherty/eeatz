// Dependencies
// ============
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
// const passport = require("./config/passport");
// const config = require("./config/extra-config");

// Express settings
// ================

// instantiate our app
const app = express();

//allow sessions
app.use(session({ secret: 'booty Mctootie', cookie: { maxAge: 60000 }}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// const isAuth = require("./config/middleware/isAuthenticated");
// const authCheck = require('./config/middleware/attachAuthenticationStatus');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({ secret: config.sessionKey, resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(authCheck);


require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    })
});

// our module get's exported as app.
module.exports = app;


// var express = require("express");

// var app = express();
// var PORT = 3000;

// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("public"));

// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");


// // Serve index.handlebars to the root route, populated with all quote data.
// app.get("/", function(req, res) {
//     res.render("index");
// });

// app.get("/history", function(req, res) {
//     res.render("history");
// });

// app.get("/add", function(req, res) {
//     res.render("add");
// });

// app.get("/home", function(req, res) {
//     res.render("home");
// });



// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   // Log (server-side) when our server has started
//   console.log("Server listening on: http://localhost:" + PORT);
// });

