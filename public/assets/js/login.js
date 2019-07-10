$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $(".login");
  var usernameInputL = $("input#usernameL-input");
  var passwordInputL = $("input#passwordL-input");

// Username feedback
  usernameInputL.bind('input propertychange', function () {
    $("#login-feedback").text("");
    $("#login-feedback").css("color", "");
    if (usernameInputL.val().trim().length >= 2) {
      $("#usernameL-feedback").css("color", "");
      $("#usernameL-feedback").text("");
    }
  });
  usernameInputL.focusout(function () {
    if (usernameInputL.val().trim().length < 2) {
      $("#usernameL-feedback").text("Username should be at least 2 characters long.");
      $("#usernameL-feedback").css("color", "red");
    }
  });

// Password feedback
passwordInputL.bind('input propertychange', function () {
     $("#login-feedback").text("");
     $("#login-feedback").css("color", "");
  if (passwordInputL.val().trim().length >= 2) {
    $("#passwordL-feedback").css("color", "");
    $("#passwordL-feedback").text("");
  }
});
passwordInputL.focusout(function () {
  if (passwordInputL.val().trim().length < 2) {
    $("#passwordL-feedback").text("Type your password");
    $("#passwordL-feedback").css("color", "red");
  }
});

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: usernameInputL.val().trim(),
      password: passwordInputL.val().trim()
    };

    if (!userData.username) {
      $("#usernameL-feedback").css("color", "red");
      $("#usernameL-feedback").text("Username should be at least 2 characters long.");

    }

    if (!userData.password) {
      $("#passwordL-feedback").css("color", "red");
      $("#passwordL-feedback").text("Please enter a password");
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/users/login", {
      username: username,
      password: password
    }).then(function (data) {
      usernameInputL.val("");
      passwordInputL.val("");
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function (err) {
      $("#login-feedback").css("color", "red");
      $("#login-feedback").text("Username or Password are Incorrect");
    });
  }
});