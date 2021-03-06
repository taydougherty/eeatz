// Dependencies
// ============
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const passport = require("./config/passport");
const config = require("./config/extra-config");

// const aws = require('aws-sdk');

// let s3 = new aws.S3({
//     accessKeyId: process.env.S3_KEY,
//     secretAccessKey: process.env.S3_SECRET
// });

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
// });

// client.connect();

// Express settings
// ================

// instantiate our app
const app = express();

//allow sessions
app.use(session({ secret: 'booty Mctootie', cookie: { maxAge: 900000 } }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const isAuth = require("./config/middleware/isAuthenticated");
const authCheck = require('./config/middleware/attachAuthenticationStatus');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: config.sessionKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(authCheck);


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
// ------------------------------
module.exports = app;


