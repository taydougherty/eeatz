var db = require('../models');

exports.index = function (req, res) {
    res.render('add/add', {
        layout: 'main'
    });
};



exports.createExpense = function (req, res) {
    console.log(req.body);
    db.expenses.create({
        departmentName: req.body.departmentName,
        expenseName: req.body.expenseName,
        expenseCost: req.body.expenseCost,
        dateOccurred: req.body.dateOccurred,
    })
};

exports.createBudget = function (req, res) {
    console.log(req.body);
    db.budgets.create({

        departmentName: req.body.departmentName,
        budgetTotal: req.body.budgetTotal,
        dateExpired: req.body.dateExpired,
        // need to add code to create pass in a moment();
        dateStart: 1,
    })
};

exports.budgetDropdown = function (req, res) {
    db.budgets.findAll({
        attributes: ['departmentName'],
        group: ['departmentName']
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

exports.expenseDropdown = function (req, res) {
    db.expenses.findAll({
        attributes: ['departmentName'],
        group: ['departmentName']
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
