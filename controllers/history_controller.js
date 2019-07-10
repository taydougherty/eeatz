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
