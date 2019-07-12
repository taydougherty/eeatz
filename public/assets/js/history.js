$(document).ready(function () {
    // var filterBudget = {
    //     // UserSearchActive = USA
    //     USA: false,
    //     RSA: false,
    //     MCSA: false,
    //     SCSA: false,
    //     DCA: false,
    //     DESA: false,

    // }

    // idea for filters, create object with each potential filter linked by boolean. Iterate over this object and grab the values marked true and input them into query
    var table
    var table_select = $(".table-select")
    table_select.on("click", function (event) {
        event.preventDefault();
        if (this.id === "bud-tab") {
            table = "budget"
            getBudget()
        }
        else if (this.id === "exp-tab") {
            table = "expenses"
            getExpense()
        }
        console.log(table)
    })

    function getBudget(filterBudget) {
        console.log(table)
        var filterString = filterBudget || "";
        if (filterString) {
            filterString = "/filter/" + filterString;
        }
        $.get("/history/budgets" + filterString, function (data) {
            Budget = data;
            if (!Budget || (Budget.length = 0)) {
                console.log("nope")
            }
            else {
                console.log("yup")
                console.log(Budget);
                initializeRows(Budget);
            }
        });
        budgetDepartmentNames()
    }
    function getExpense(filterExpense) {
        console.log(table)
        console.log("asdasdsa")
        var filterString = filterExpense || "";
        if (filterString) {
            filterString = "/filter/" + filterString;
        }
        $.get("/history/expenses" + filterString, function (data) {
            Expense = data;
            if (!Expense || (Expense.length = 0)) {
                console.log("nope")
            }
            else {
                console.log("yup")
                initializeRows(Expense);
            }
        });
        expenseDepartmentNames()
    }

    function initializeRows(data) {
        console.log(table)
        if (table === "budget") {
            var budData = data
            $("#budget-table").empty()
            for (var i = 0; i < budData.data.length; i++) {
                $("#budget-table").append(newBudgetRow(data.data[i]))
            }
        }
        else if (table === "expenses") {
            var expData = data
            $("#expenses-table").empty()
            for (var i = 0; i < expData.data.length; i++) {
                $("#expenses-table").append(newExpenseRow(data.data[i]))
            }
        }
    }
    function newBudgetRow(row) {

        var newRow = $("<tr>")
        var id = $("<td>").text(row.id)
        var department = $("<td>").text(row.departmentName)
        var total = $("<td>").text(row.budgetTotal)
        var start = $("<td>").text(row.dateStart)
        var end = $("<td>").text(row.dateExpired)
        var edit = $("<button>"); edit.addClass("editEntryB"); edit.attr("data-toggle", "modal"); edit.attr("data-target", "#editEntryModalB"); edit.val(row.id); edit.text("Edit"); edit.attr("data", JSON.stringify(row))
        newRow.append(id, department, total, start, end, edit)
        return newRow
    }
    function newExpenseRow(row) {
        var newRow = $("<tr>")
        var id = $("<td>").text(row.id)
        var department = $("<td>").text(row.departmentName)
        var subcat = $("<td>").text(row.expenseName)
        var cost = $("<td>").text(row.expenseCost)
        var date = $("<td>").text(row.dateOccurred)
        var edit = $("<button>"); edit.addClass("editEntryE"); edit.attr("data-toggle", "modal"); edit.attr("data-target", "#editEntryModalE"); edit.val(row.id); edit.text("Edit"); edit.attr("data", JSON.stringify(row))
        console.log(edit)
        newRow.append(id, department, subcat, cost, date, edit)
        return newRow
    }
    function onLoad() {
        table = "budget"
        getBudget()
    }
    onLoad()
    $(document.body).on("click", ".editEntryB", function () {
        var entry = JSON.parse($(this).attr("data"))
        $("#editHeaderB").text("Editing Entry#" + entry.id)
        $("#editCatB").val(entry.departmentName)
        $("#editBudTotal").val(entry.budgetTotal)
        $("#editAddDateB").val(entry.dateStart.replace("Z", ""))
        $("#editExpDateB").val(entry.dateExpired.replace("Z", ""))
    })
    $(document.body).on("click", ".editEntryE", function () {
        var entry = JSON.parse($(this).attr("data"))
        $("#editHeaderE").text("Editing Entry#" + entry.id)
        $("#editCatE").val(entry.departmentName)
        $("#editSubCatE").val(entry.expenseName)
        $("#editCostE").val(entry.expenseCost)
        $("#editAddDateE").val(entry.dateOccurred.replace("Z", ""))
    })
    $("#editSubmitB").on("click", function (event) {
        event.preventDefault();
        var id = ($("#editHeaderB").text()).split("Editing Entry#")[1]
        console.log(id)
        var departmentName = $("#editCatB").val()
        var budgetTotal = $("#editBudTotal").val()
        var dateStart = $("#editAddDateB").val()
        var dateExpired = $("#editExpDateB").val()
        var newEntry = {
            id: id,
            departmentName: departmentName,
            budgetTotal: budgetTotal,
            dateStart: dateStart,
            dateExpired: dateExpired
        }
        $.ajax({
            method: "PUT",
            url: "/history/budgets/editEntry",
            data: newEntry
        }).then(function (data) {
            console.log("update", data);
            getBudget()
        });

    })
    $("#editSubmitE").on("click", function (event) {
        event.preventDefault();
        var id = ($("#editHeaderE").text()).split("Editing Entry#")[1]
        console.log(id)
        var departmentName = $("#editCatE").val()
        var expenseName = $("#editSubCatE").val()
        var expenseCost = $("#editCostE").val()
        var dateOccurred = $("#editAddDateE").val()
        var newEntry = {
            id: id,
            departmentName: departmentName,
            expenseName: expenseName,
            expenseCost: expenseCost,
            dateOccurred: dateOccurred
        }
        $.ajax({
            method: "PUT",
            url: "/history/expenses/editEntry",
            data: newEntry
        }).then(function (data) {
            getExpense()
        });

    })



    function budgetDepartmentNames() {
        $.get("/history/budgetDropdown", function (data) {
            departmentNames = data;
            if (!departmentNames || (departmentNames.length = 0)) {
                console.log("nope")
            }
            else {
                console.log("yup")
                fillBudDept(departmentNames);
            }
        });
    }
    function fillBudDept(departmentNames) {
        console.log(departmentNames);
        for (i = 0; i < departmentNames.data.length; i++) {
            $("#editCatB").append($('<option>' + departmentNames.data[i].departmentName + '</option>'));
            console.log(departmentNames.data[i].departmentName);
        }
        // $("#editCatB").append($('<option>Add More</option>'));
    }
    function expenseDepartmentNames() {
        $.get("/history/expenseDropdown", function (data) {
            departmentNames = data;
            if (!departmentNames || (departmentNames.length = 0)) {
                console.log("nope")
            }
            else {
                console.log("yup")
                fillExpDept(departmentNames);
            }
        });
    }
    function fillExpDept(departmentNames) {
        console.log(departmentNames);
        for (i = 0; i < departmentNames.data.length; i++) {
            $("#editCatE").append($('<option>' + departmentNames.data[i].departmentName + '</option>'));
            console.log(departmentNames.data[i].departmentName);
        }
        // $("#editCatB").append($('<option>Add More</option>'));
    }
    // budgetRestNames()
    ;




    // A function to check if its on budget or expenses tab

    // A function to delete the table and remake it according to filters
    // A function for editing the entries via the modal









})