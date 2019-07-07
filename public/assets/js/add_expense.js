$(document).ready(function () {

    var valid = false;


    // Expenses Form
    var ButtonE = $(".signupE");
    var departmentNameInputE = $("#departmentNameE-input");
    var expenseNameInputE = $("input#expenseNameE-input");
    var expenseCostInputE = $("input#expenseCostE-input");
    var expirationDateInputE = $("input#expirationDateE-input");
    var addCategoryNameInputE = $("input#addCategoryNameE-input");

    // Open and close add more input on Expenses form
    document.getElementById('departmentNameE-form').onchange = function () {
        if ($("#departmentNameE-input").val() == "Add More") {
            $("#addCategoryNameE-form").removeClass("display_node");
        } else if ($("#departmentNameE-input").val() !== "Add More") {
            $("#addCategoryNameE-form").addClass("display_node");
            addCategoryNameInputE.val("");
        }
        if ($("#departmentNameE-input").val() !== "Add More" && $("#departmentNameE-input").val() !== "Select A Department") {
            valid = true;
            $("#addCategoryNameE-feedback").text("");
        }
        if ($("#departmentNameE-input").val() != "Select A Department") {
            $("#departmentNameE-feedback").text("");
        }
    }

    // validation Expense Name Expense
    expenseNameInputE.bind('input propertychange', function () {
        if (expenseNameInputE.val().trim().length >= 3) {
            $("#expenseNameE-feedback").text("");
            valid = true;
        }
    });
    expenseNameInputE.focusout(function () {
        if (expenseNameInputE.val().trim().length < 3) {
            $("#expenseNameE-feedback").text("Expense name must be at least 3 characters long");
            valid = false;
        }
    });

    // validation Expense Cost Expense
    expenseCostInputE.bind('input propertychange', function () {
        if (expenseCostInputE.val().trim().length >= 1) {
            $("#expenseCostE-feedback").text("");
            valid = true;
        }
    });
    expenseCostInputE.focusout(function () {
        if (expenseCostInputE.val().trim().length < 1) {
            $("#expenseCostE-feedback").text("Please enter a valid amount.");
            valid = false;
        }
    });

    // validation Expiration Date Expense
    expirationDateInputE.bind('input propertychange', function () {
        if (expirationDateInputE.val().trim().length = 8 && expirationDateInputE.val().trim().split("-")[0] >= moment().year()) {
            $("#expirationDateE-feedback").text("");
            valid = true;
        }
    });
    expirationDateInputE.focusout(function () {
        if (expirationDateInputE.val().trim().length < 8 || expirationDateInputE.val().trim().split("-")[0] < moment().year()) {
            $("#expirationDateE-feedback").text("Please enter a valid date.");
            valid = false;
        }
    });

    // Add Category Name Expense
    addCategoryNameInputE.bind('input propertychange', function () {
        if (departmentNameInputE.val().trim() == "Add More" && addCategoryNameInputE.val().trim().length >= 3) {
            $("#addCategoryNameE-feedback").text("");
            valid = true;
        }
    });
    addCategoryNameInputE.focusout(function () {
        if (departmentNameInputE.val().trim() == "Add More" && addCategoryNameInputE.val().trim().length < 3) {
            $("#addCategoryNameE-feedback").text("Department name must be at least 3 characters long.");
            valid = false;
        }
    });

    // Expenses Button
    ButtonE.on("click", function (event) {
        event.preventDefault();

        // validation Department Name Input Expense
        if (departmentNameInputE.val() == "Select A Department") {
            $("#departmentNameE-feedback").text("Please select a department.");
            valid = false;
        }

        // validation Expense Name Expense
        if (expenseNameInputE.val().trim().length < 3) {
            $("#expenseNameE-feedback").text("Expense name must be at least 3 characters long.");
            valid = false;
        }

        // validation Expense Cost Expense
        if (expenseCostInputE.val().trim().length < 1) {
            $("#expenseCostE-feedback").text("Please enter a valid amount.");
            valid = false;
        }

        // validation Expiration Date Expense
        if (expirationDateInputE.val().trim().length < 8 || expirationDateInputE.val().trim().split("-")[0] < moment().year()) {
            $("#expirationDateE-feedback").text("Please enter a valid date.");
            valid = false;
        }

        // validation AddCategory Name Expense
        if (departmentNameInputE.val() == "Add More" && addCategoryNameInputE.val().trim().length < 3) {
            $("#addCategoryNameE-feedback").text("Department name must be at least 3 characters long.");
            valid = false;
        }

        // to add new category
        var department;

        if ($("#departmentNameE-input").val() == "Add More") {
            department = addCategoryNameInputE.val().trim();
        } else {
            department = departmentNameInputE.val().trim();
        }

        console.log(department);

        var userDataE = {
            departmentName: department,
            expenseName: expenseNameInputE.val().trim(),
            expenseCost: expenseCostInputE.val().trim(),
            expirationDate: expirationDateInputE.val().trim()
        };

        // User Data Test
        // if (!userData.departmentName || userData.departmentName == "Select A Department" || !userData.expenseName || !userData.expenseCost || !userData.expirationDate) {
        //   return alert("Please don't leave fields blank");
        // }

        if (valid) {

            console.log("Form valid")

            // Add Expenses
            $.post("/api/expenses", userDataE)
                .then(function (data) {
                    console.log("add.html", data);
                    alert("Espense Added!");
                });


            // Clean Inputs
            expenseNameInputE.val("");
            expenseCostInputE.val("");
            expirationDateInputE.val("");
            addCategoryNameInputE.val("");
            $("#addCategoryNameE-form").addClass("display_node")
            $('.option option').prop('selected', function () {
                return this.defaultSelected;
            });

        } else {
            return console.log("Form not valid")
        }
    });

});

