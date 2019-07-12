var db = require('../models');

exports.index = function (req, res) {
    res.render('history/history');
};
exports.budget_history = function (req, res) {
    db.budgets.findAll({}).then(function (data) {
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
exports.budgetEditEntry = function (req, res) {
    db.budgets.update(
        // Values to update
        {
            departmentName: req.body.departmentName,
            budgetTotal: req.body.budgetTotal,
            dateStart: req.body.dateStart,
            dateExpired: req.body.dateExpired
        },
        { // Clause
            where:
            {
                id: req.body.id
            }
        }
    ).then(function () {
        console.log("asdf")
    })
}