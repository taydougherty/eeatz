$(document).ready(function () {

    var valid = false;

    // Budget Form
    var ButtonB = $(".signupB");
    var departmentNameInputB = $("#departmentNameB-input");
    var budgetAmountInputB = $("input#budgetAmountB-input");
    var expirationDateInputB = $("input#expirationDateB-input");
    var addCategoryNameInputB = $("input#addCategoryNameB-input");

    // Grab departmant names
    function budgetDepartmentNames() {
        $.get("/add/budgetDropdown", function (data) {
            departmentNames = data;
            if (!departmentNames || (departmentNames.length = 0)) {
                console.log("nope")
            }
            else {
                console.log("yup")
                fill(departmentNames);
            }
        });
    }
    function fill(departmentNames) {
        console.log(departmentNames);
        for (i = 0; i <departmentNames.data.length; i++) {
            $("#departmentNameB-input").append($('<option>'+departmentNames.data[i].departmentName+'</option>'));
            console.log(departmentNames.data[i].departmentName);
        }
        $("#departmentNameB-input").append($('<option>Add More</option>'));
    }
    budgetDepartmentNames();

    // Open and close add more input on Budget form
    document.getElementById('departmentNameB-form').onchange = function () {
        if ($("#departmentNameB-input").val() == "Add More") {
            $("#addCategoryNameB-form").removeClass("display_node");
        } else if ($("#departmentNameB-input").val() !== "Add More") {
            $("#addCategoryNameB-form").addClass("display_node");
            addCategoryNameInputB.val("");
        }
        if ($("#departmentNameB-input").val() !== "Add More" && $("#departmentNameB-input").val() !== "Select A Department") {
            valid = true;
            $("#addCategoryNameB-feedback").text("");
        }
        if ($("#departmentNameB-input").val() != "Select A Department") {
            $("#departmentNameB-feedback").text("");
        }
    }

    // Validation Budget Amount Budget
    budgetAmountInputB.bind('input propertychange', function () {
        if (budgetAmountInputB.val().trim().length >= 1) {
            $("#budgetAmountB-feedback").text("");
            valid = true;
        }
    });
    budgetAmountInputB.focusout(function () {
        if (budgetAmountInputB.val().trim().length < 1) {
            $("#budgetAmountB-feedback").text("Please enter a valid amount.");
            valid = false;
        }
    });

    // validation Expiration Date Bufget
    expirationDateInputB.bind('input propertychange', function () {
        if (expirationDateInputB.val().trim().length = 8 && expirationDateInputB.val().trim().split("-")[0] >= moment().year()) {
            $("#expirationDateB-feedback").text("");
            valid = true;
        }
    });
    expirationDateInputB.focusout(function () {
        if (expirationDateInputB.val().trim().length < 8 || expirationDateInputB.val().trim().split("-")[0] < moment().year()) {
            $("#expirationDateB-feedback").text("Please enter a valid date.");
            valid = false;
        }
    });

    // Add Category Name Budget
    addCategoryNameInputB.bind('input propertychange', function () {
        if (departmentNameInputB.val().trim() == "Add More" && addCategoryNameInputB.val().trim().length >= 3) {
            $("#addCategoryNameB-feedback").text("");
            valid = true;
        }
    });
    addCategoryNameInputB.focusout(function () {
        if (departmentNameInputB.val().trim() == "Add More" && addCategoryNameInputB.val().trim().length < 3) {
            $("#addCategoryNameB-feedback").text("Department name must be at least 3 characters long.");
            valid = false;
        }
    });

    // Budget Button
    ButtonB.on("click", function (event) {
        event.preventDefault();

        // validation Department Name Input Budget
        if (departmentNameInputB.val() == "Select A Department") {
            $("#departmentNameB-feedback").text("Please select a department.");
            valid = false;
        }

        // Validation Budget Amount Budget
        if (budgetAmountInputB.val().trim().length < 1) {
            $("#budgetAmountB-feedback").text("Please enter a valid amount.");
            valid = false;
        }

        // validation Expiration Date Bufget
        if (expirationDateInputB.val().trim().length < 8 || expirationDateInputB.val().trim().split("-")[0] < moment().year()) {
            $("#expirationDateB-feedback").text("Please enter a valid date.");
            valid = false;
        }

        // validation AddCategory Name Budget
        if (departmentNameInputB.val() == "Add More" && addCategoryNameInputB.val().trim().length < 3) {
            $("#addCategoryNameB-feedback").text("Department name must be at least 3 characters long.");
            valid = false;
        }

        // to add new category
        var department;

        if ($("#departmentNameB-input").val() == "Add More") {
            department = addCategoryNameInputB.val().trim();
        } else {
            department = departmentNameInputB.val().trim();
        }

        console.log(department);
        // regex to remove commas
        budgetTotal = (budgetAmountInputB.val().trim()).replace(",", "");
        
        var userDataB = {
            departmentName: department,
            budgetTotal: budgetTotal,
            // dateStart: moment(),
            dateExpired: expirationDateInputB.val().trim()
        };

        // User Data Test
        // if (!userData.departmentName || userData.departmentName == "Select A Department" || !userData.budgetTotal || !userData.dateExpired) {
        //   return alert("Please don't leave fields blank");
        // }

        if (valid) {

            console.log("Form valid")

            // Add Budget
            $.post("/add/budgets", userDataB)
                .then(function (data) {
                    console.log("add.html", data);
                    alert("Budget Added!");
                });


            // Clean Inputs
            budgetAmountInputB.val("");
            expirationDateInputB.val("");
            addCategoryNameInputB.val("");
            $("#addCategoryNameB-form").addClass("display_node")
            $('.option option').prop('selected', function () {
                return this.defaultSelected;
            });

        } else {
            return console.log("Form not valid")
        }

    });
});
