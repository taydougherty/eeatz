$(document).ready(function () {
  // Getting references to our form and input
  var signUpButton = $(".signup");
  var firstnameInput = $("input#firstname-input");
  var lastnameInput = $("input#lastname-input");
  var usernameInput = $("input#username-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var restaurantInput = $("#restaurant-input");
  var addRestaurantInput = $("#addRestaurant-input");

  var repeatPasswordInput = $("input#repeat-password-input");
  var repeatEmailInput = $("input#repeat-email-input");
  var valid;
  var passwordValid;
  var emailValid;

  // get existing restaurant names 
  // id for dropdown is restaurant-input
  function restaurantDropdown() {
    $.get("/users/restaurantdropdown", function (data) {
        restaurantNames = data;
        if (!restaurantNames || (restaurantNames.length = 0)) {
            console.log("nope")
        }
        else {
            console.log("yup")
            fill(restaurantNames);
        }
    });
}
function fill(restaurantNames) {
    console.log(restaurantNames);
    console.log(restaurantNames.data)
    if (restaurantNames.data === undefined) {
      
      $("#restaurant-input").append($('<option>Add More</option>'));
    }
    else {
      for (i = 0; i <restaurantNames.data.length; i++) {
        $("#restaurant-input").append($('<option>'+restaurantNames.data[i].restaurantName+'</option>'));
        console.log(restaurantNames.data[i].restaurantName);
    }
    $("#restaurant-input").append($('<option>Add More</option>'));
    }
}
restaurantDropdown();

  document.getElementById('restaurant-form').onchange = function () {
    if ($("#restaurant-input").val() == "Add More") {
      $("#addRestaurant-form").removeClass("display_node");
      $("#restaurant-form").removeClass("has-error");
      $("#restaurant-form").addClass("has-success");
      $("#addRestaurant-form").removeClass("has-success");
      $("#addRestaurant-form").addClass("has-error");
      $("#restaurant-feedback").text("");
    } else if ($("#restaurant-input").val() != "Add More") {
      $("#addRestaurant-form").addClass("display_node");
      $("#addRestaurant-form").removeClass("has-error");
      $("#addRestaurant-form").addClass("has-success");
      addRestaurantInput.val("");
    }
    if ($("#restaurant-input").val() !== "Add More" && $("#restaurant-input").val() !== "Select A Restaurant") {
      $("#restaurant-form").removeClass("has-error");
      $("#restaurant-form").addClass("has-success");
      $("#addRestaurant-feedback").text("");
    }
    if ($("#restaurant-input").val() != "Select A Restaurant") {
      $("#restaurant-feedback").text("");
      valid = true;
    }
    if ($("#restaurant-input").val() == "Select A Restaurant") {
      $("#restaurant-form").removeClass("has-success");
      $("#restaurant-form").addClass("has-error");
      $("#restaurant-feedback").text("Please select a restaurant.");
      $("#addRestaurant-feedback").text("");
    }
  }

  // Username "on-the-fly" validation
  addRestaurantInput.focusout(function () {
    if (addRestaurantInput.val().trim().length < 2) {
      $("#addRestaurant-form").removeClass("has-success");
      $("#addRestaurant-form").addClass("has-error");
      $("#addRestaurant-feedback").text("Restaurant name must be at least 2 characters long");
    }
  });
  addRestaurantInput.bind('input propertychange', function () {
    if (addRestaurantInput.val().trim().length >= 2) {
      $("#addRestaurant-form").removeClass("has-error");
      $("#addRestaurant-form").addClass("has-success");
      $("#addRestaurant-feedback").text("");
    }
  });

  // Username "on-the-fly" validation
  usernameInput.focusout(function () {
    if (usernameInput.val().trim().length < 2) {
      $("#username-form").removeClass("has-success");
      $("#username-form").addClass("has-error");
      $("#username-feedback").text("User name must be at least 2 characters long");
    }
  });
  usernameInput.bind('input propertychange', function () {
    if (usernameInput.val().trim().length >= 2) {
      $("#username-form").removeClass("has-error");
      $("#username-form").addClass("has-success");
      $("#username-feedback").text("");
    }
  });

  // First name "on-the-fly" validation
  firstnameInput.focusout(function () {
    if (firstnameInput.val().trim().length < 2) {
      $("#firstname-form").removeClass("has-success");
      $("#firstname-form").addClass("has-error");
      $("#firstname-feedback").text("First name must be at least 2 characters long");
    }
  });

  firstnameInput.bind('input propertychange', function () {
    if (firstnameInput.val().trim().length >= 2) {
      $("#firstname-form").removeClass("has-error");
      $("#firstname-form").addClass("has-success");
      $("#firstname-feedback").text("");
    }
  });

  // Last name "on-the-fly" validation
  lastnameInput.focusout(function () {
    if (lastnameInput.val().trim().length < 1) {
      $("#lastname-form").removeClass("has-success");
      $("#lastname-form").addClass("has-error");
      $("#lastname-feedback").text("Last name must be at least 1 characters long");
    }
  });

  lastnameInput.bind('input propertychange', function () {
    if (lastnameInput.val().trim().length >= 1) {
      $("#lastname-form").removeClass("has-error");
      $("#lastname-form").addClass("has-success");
      $("#lastname-feedback").text("");
    }
  });

  // Email "on-the-fly" validation
  emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  emailInput.focusout(function () {
    if (!emailRegEx.test($(this).val())) {
      $("#email-form").removeClass("has-success");
      $("#email-form").addClass("has-error");
      $("#email-feedback").text("Invalid Email");
      emailValid == false
    }
    if (emailInput.val().trim() !== repeatEmailInput.val().trim()) {
      $("#email-repeat-form").removeClass("has-success");
      $("#email-repeat-form").addClass("has-error");
      $("#email-repeat-feedback").text("Emails Don't Match");
    }
  });

  emailInput.bind('input propertychange', function () {
    if (emailRegEx.test($(this).val())) {
      $("#email-form").removeClass("has-error");
      $("#email-form").addClass("has-success");
      $("#email-feedback").text("");
      $("#email-additional-feedback").text("");
      emailValid == true;
    }
    if (emailInput.val().trim() == repeatEmailInput.val().trim()) {
      $("#email-repeat-form").removeClass("has-error");
      $("#email-repeat-form").addClass("has-success");
      $("#email-repeat-feedback").text("");
    }
  });

  // Check "on-the-fly" if repeated email matches email
  repeatEmailInput.focusout(function () {
    if (emailInput.val().trim() !== repeatEmailInput.val().trim()) {
      $("#email-repeat-form").removeClass("has-success");
      $("#email-repeat-form").addClass("has-error");
      $("#email-repeat-feedback").text("Emails Don't Match");
    }
  });

  repeatEmailInput.bind('input propertychange', function () {
    if (emailInput.val().trim() == repeatEmailInput.val().trim()) {
      $("#email-repeat-form").removeClass("has-error");
      $("#email-repeat-form").addClass("has-success");
      $("#email-repeat-feedback").text("");
    }
  });

  var passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  passwordInput.focusout(function () {
    if (!passwordRegEx.test($(this).val())) {
      $("#password-form").removeClass("has-success");
      $("#password-form").addClass("has-error");
      $("#password-feedback").text("Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be at least 8 characters long.");
      passwordValid == false;
    }
    if (passwordInput.val().trim() !== repeatPasswordInput.val().trim()) {
      $("#repeat-password-form").removeClass("has-success");
      $("#repeat-password-form").addClass("has-error");
      $("#repeat-password-feedback").text("Passwords Don't Match");
    }
  });

  passwordInput.bind('input propertychange', function () {
    if (passwordRegEx.test($(this).val())) {
      $("#password-form").removeClass("has-error");
      $("#password-form").addClass("has-success");
      $("#password-feedback").text("");
      passwordValid == true;
    }
    if (passwordInput.val().trim() == repeatPasswordInput.val().trim()) {
      $("#repeat-password-form").removeClass("has-error");
      $("#repeat-password-form").addClass("has-success");
      $("#repeat-password-feedback").text("");
    }
  });

  repeatPasswordInput.focusout(function () {
    if (passwordInput.val().trim() !== repeatPasswordInput.val().trim()) {
      $("#repeat-password-form").removeClass("has-success");
      $("#repeat-password-form").addClass("has-error");
      $("#repeat-password-feedback").text("Passwords Don't Match");
    }
  });

  repeatPasswordInput.bind('input propertychange', function () {
    if (passwordInput.val().trim() == repeatPasswordInput.val().trim()) {
      $("#repeat-password-form").removeClass("has-error");
      $("#repeat-password-form").addClass("has-success");
      $("#repeat-password-feedback").text("");
    }
  });

  // Check if emails match each other
  signUpButton.on("click", function (event) {

    if ($("#restaurant-input").val() == "Select A Restaurant") {
      $("#restaurant-feedback").text("Please select a restaurant");
      valid = false
    }

    if (usernameInput.val().trim().length < 2) {
      $("#username-form").removeClass("has-success");
      $("#username-form").addClass("has-error");
      $("#username-feedback").text("User name must be at least 2 characters long");
    }

    if (addRestaurantInput.val().trim().length < 2 && $("#restaurant-input").val() == "Add More") {
      $("#addRestaurant-form").removeClass("has-success");
      $("#addRestaurant-form").addClass("has-error");
      $("#addRestaurant-feedback").text("Restaurant name must be at least 2 characters long");
    }

    if (firstnameInput.val().trim().length < 2) {
      $("#firstname-form").removeClass("has-success");
      $("#firstname-form").addClass("has-error");
      $("#firstname-feedback").text("First name must be at least 2 characters long");
    }

    if (lastnameInput.val().trim().length < 1) {
      $("#lastname-form").removeClass("has-success");
      $("#lastname-form").addClass("has-error");
      $("#lastname-feedback").text("Last name must be at least 1 characters long");
    }

    if (emailInput.val().trim().length < 1) {
      $("#email-form").removeClass("has-success");
      $("#email-form").addClass("has-error");
      $("#email-feedback").text("Invalid Email");

    }
    console.log(emailRegEx.test($(this).val()))
    console.log(passwordRegEx.test($(this).val()))

    if (passwordInput.val().trim().length < 1) {
      $("#password-form").removeClass("has-success");
      $("#password-form").addClass("has-error");
      $("#password-feedback").text("Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be at least 8 characters long.");
    }

    if (passwordInput.val().trim() !== repeatPasswordInput.val().trim()) {
      $("#repeat-password-form").removeClass("has-success");
      $("#repeat-password-form").addClass("has-error");
      $("#repeat-password-feedback").text("Passwords Don't Match");
    }

    // Replace all alerts with modals

    var restaurant;

    if ($("#restaurant-input").val() == "Add More") {
      restaurant = addRestaurantInput.val().trim();
    } else {
      restaurant = restaurantInput.val().trim();
    }

    var userData = {
      username: usernameInput.val().trim(),
      firstName: firstnameInput.val().trim(),
      lastName: lastnameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      restaurantName: restaurant
    };

    console.log(usernameInput.val().trim())
    console.log(firstnameInput.val().trim())
    console.log(lastnameInput.val().trim())
    console.log(emailInput.val().trim())
    console.log(passwordInput.val().trim())
    console.log(restaurant)

    if (!userData.username || !userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.restaurantName || valid == false) {
      return alert("Please don't leave fields blank. Make sure you selected a restaurant.");
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.username, userData.firstName, userData.lastName, userData.email, userData.password, userData.restaurantName);
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, firstName, lastName, email, password, restaurantName) {
    $.post("/users/signup", {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      restaurantName: restaurantName
    }).then(function (data) {


      if (data.duplicateUser) {
        // Replace with Modal
        alert("Sorry, that username has been taken");
      } else {

        firstnameInput.val("");
        lastnameInput.val("");
        addRestaurantInput.val("");
        emailInput.val("");
        passwordInput.val("");
        usernameInput.val("");
        repeatPasswordInput.val("");
        repeatEmailInput.val("");
        $("#addrestaurant-form").addClass("display_node")
        $('.option option').prop('selected', function () {
          return this.defaultSelected;
        });

        window.location = data.redirect;
      }
    })
  }

});