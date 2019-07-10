$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $(".login");
  var usernameInputL = $("input#usernameL-input");
  var passwordInputL = $("input#passwordL-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: usernameInputL.val().trim(),
      password: passwordInputL.val().trim()
    };

    if (!userData.username) {
      usernameInputL.css("border", "solid 1px red");
      $("#usernameL-feedback").text("Please enter a username");
      return;
    } else {
      usernameInputL.css("border", "none");
      $("#usernameL-feedback").text("");
    }

    if (!userData.password) {
      passwordInputL.css("border", "solid 1px red");
      $("#passwordL-feedback").text("Please enter a password");
      return;
    } else {
      passwordInputL.css("border", "none");
      $("#passwordL-feedback").text("");
    }


    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInputL.val("");
    passwordInputL.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/users/login", {
      username: username,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      $("#passwordL-feedback").text("Incorrect Username or Password");
    });
  }
});