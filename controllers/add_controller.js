var db = require('../models');

exports.index = function(req, res) {
    res.render('add/add', {
        layout: 'main'
    });
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
