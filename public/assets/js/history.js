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
        console.log("asdasdsa")
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
                initializeRows(Budget);
            }
        });
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
    }


    function initializeRows(data) {
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
        var edit = $("<button>"); edit.addClass("editEntry"); edit.attr("data-toggle", "modal"); edit.attr("data-target", "#editEntryModalB"); edit.val(row.id); edit.text("Edit")
        newRow.append(id, department, total, start, end, edit)
        return newRow
    }
    function newExpenseRow(row) {

        var newRow = $("<tr>")
        var id = $("<td>").text(row.id)
        var department = $("<td>").text(row.departmentName)
        var total = $("<td>").text(row.    )
        var start = $("<td>").text(row.dateStart)
        var end = $("<td>").text(row.dateExpired)
        var edit = $("<button>"); edit.addClass("editEntry"); edit.attr("data-toggle", "modal"); edit.attr("data-target", "#editEntryModalB"); edit.val(row.id); edit.text("Edit")
        newRow.append(id, department, total, start, end, edit)
        return newRow
    }
    function onLoad() {
        table = "budget"
        getBudget()
    }
    onLoad()
})




// A function to check if its on budget or expenses tab

// A function to delete the table and remake it according to filters
// A function for editing the entries via the modal









