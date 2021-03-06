var db = require('../models');

//this is the users_controller.js file
exports.registrationPage = function (req, res) {
  res.render('/', {
    layout: ('index')
  });
};

exports.signOutUser = function(req,res) {
  req.logout();
  res.redirect("/");
};

// login
exports.loginUser = function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
  res.json("/home");
};

// register a user
exports.signUpUser = function(req,res) {

  db.users.findAll({
    where: {username: req.body.username}
  }).then(function(users) {
    if (users.length > 0) {
      res.json({
        duplicateUser: true
      });
    //At some point, make sure that only one user can be associated with an email.
    } else {
      db.users.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        restaurantName: req.body.restaurantName
      }).then(function() {
        res.send({redirect: '/'});
      }).catch(function(err) {
        res.json(err);
      });
    }
  })
};

exports.restaurantDropdown = function (req, res) {
  db.users.findAll({
      attributes: ['restaurantName'],
      group: ['restaurantName']
  }).then(function (data) {
      if (data.length > 0) {
          res.json({
              status: 200,
              data: data
          });
      } else {
          res.json({
              status: 201,
              msg: "Cannot find any data"
          });
      }
  })
}