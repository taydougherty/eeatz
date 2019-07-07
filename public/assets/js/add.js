$(document).ready(function() {

  // Budget Form
    var ButtonB = $(".signupB");
    var departmentNameInputB = $("input#departmentNameB-input");
    var budgetAmountInputB = $("input#budgetAmountB-input");
    var expirationDateInputB = $("input#expirationDateB-input");
    var addCategoryNameB = $("input#AddcategoryNameB-input");
 // Expenses Form
    var ButtonE = $(".signupE");
    var departmentNameInputE = $("input#departmentNameE-input");
    var expenseNameInputE = $("input#expenseNameE-input");
    var expenseCostInputE = $("input#expenseCostE-input");
    var expirationDateInputE = $("input#expirationDateE-input");
    var addCategoryNameE = $("input#addCategoryNameE-input");


    // validation
    departmentNameInputB.bind('input propertychange', function() {
    if (departmentNameInputB !== "Select A Department") {
      $("#departmentNameInputB-form").removeClass("has-success");

      $("#departmentNameInputB-form").addClass("has-error");
      $("#departmentNameInputB-feedback").text("Please select a department");
    } else {
      $("#departmentNameInputB-form").removeClass("has-error");

      $("#departmentNameInputB-form").addClass("has-success");
      $("#departmentNameInputB-feedback").text("Department name valid!");
    }
  });
// validation
  departmentNameInputE.bind('input propertychange', function() {
    if (departmentNameInputE !== "Select A Department") {
      $("#departmentNameInputE-form").removeClass("has-success");

      $("#departmentNameInputE-form").addClass("has-error");
      $("#departmentNameInputE-feedback").text("Department name must be at least 4 characters long");
    } else {
      $("#departmentNameInputE-form").removeClass("has-error");

      $("#departmentNameInputE-form").addClass("has-success");
      $("#departmentNameInputE-feedback").text("Department name valid!");
    }
  });
// validation
  expenseNameInputE.bind('input propertychange', function() {
    if (expenseNameInputE.val().trim().length < 4) {
      $("#expenseNameInputE-form").removeClass("has-success");

      $("#expenseNameInputE-form").addClass("has-error");
      $("#expenseNameInputE-feedback").text("Expense name must be at least 4 characters long");
    } else {
      $("#expenseNameInputE-form").removeClass("has-error");

      $("#expenseNameInputE-form").addClass("has-success");
      $("#expenseNameInputE-feedback").text("Expense name valid!");
    }
  });
  
    // Budget Button
    ButtonB.on("click", function(event) {
      event.preventDefault();
      
      var userData = {
        departmentName: departmentNameInputB.val().trim(),
        budgetAmount: budgetAmountInputB.val().trim(),
        expirationDate: expirationDateInputB.val().trim()
      };
  
      if (!userData.departmentName || !userData.budgetAmount || !userData.expirationDate) {
        return alert("Please don't leave fields blank");
      }

      addBudget(userData.departmentName, userData.budgetAmount, userData.expirationDate);
      departmentNameInputB.val("");
      budgetAmountInputB.val("");
      expirationDateInputB.val("");
    });

    // Expenses Button
    ButtonE.on("click", function(event) {
      event.preventDefault();

      var userData = {
        departmentName: departmentNameInputE.val().trim(),
        expenseName: expenseNameInputE.val().trim(),
        expenseCost: expenseCostInputE.val().trim(),
        expirationDate: expirationDateInputE.val().trim()
      };
  
      if (!userData.departmentNameInputE || !userData.expenseNameInputE || !userData.expenseCostInputE || !userData.expirationDateInputE) {
        return alert("Please don't leave fields blank");
      }
  
      addExpenses(userData.departmentName, userData.budgetAmount, userData.expirationDate);
      departmentNameInputE.val("");
      expenseNameInputE.val("");
      expenseCostInputE.val("");
      expirationDateInputE.val("");
    });
  
    // add budget
    function addBudget(departmentName, budgetAmount, expirationDate) {
      $.post("/api/budget", {
        departmentName: departmentName,
        budgetAmount: budgetAmount,
        expirationDate: expirationDate
      }).then(function(data) {
      
          window.location = data.redirect;
        
      }).catch(function(err) {
        console.log(err);
      });
    }

    // Add Expenses
    function addExpenses(departmentName, expenseName, expenseCost) {
      $.post("/api/expenses", {
        departmentName: departmentName,
        expenseName: expenseName,
        expenseCost: expenseCost,
        expirationDate: expirationDate
      }).then(function(data) {
      
          window.location = data.redirect;
        
      }).catch(function(err) {
        console.log(err);
      });
    }
  
  });
  