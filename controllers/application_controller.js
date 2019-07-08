var db = require('../models');

exports.index = function(req, res) {
    res.render('index');
};

// req.body.table       "Budget", "Expense"
// req.body.headers     "categories, amount"
exports.allQuery = function (req, res) {
    if (req.body.table === "Expense") {
        var database = db.expenses;
    } else if (req.body.table === "Budget") {
        var database = db.budgets;
    }

    var attr = req.body.headers.split(", ");
    database.findAll({
        attributes: attr
        // where: {
        //     dateExpired: {
        //         [Op.gt]: moment().toDate()
        //     }
        // }
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