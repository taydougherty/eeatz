var db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.home = function(req, res) {
    res.render('home/home');
};


// // req.body.table       "Budget", "Expense"
// // req.body.headers     "categories, amount"
// exports.allQuery = function (req, res) {
//     var currentDate = new Date();
//     var currentMonth = currentDate.getMonth();
//     var currentYear = currentDate.getFullYear();
//     if (req.query.table === "Expense") {
//         var database = db.expenses;
//         var dataControl = {
//             dateOccurred: {
//                 [Op.between]: [Date(currentYear, currentMonth, 1), Date(currentYear, currentMonth + 1, 0)]
//             }
//         }
//     } else if (req.query.table === "Budget") {
//         var database = db.budgets;
//         var dataControl = {
//             dateStart: {
//                 [Op.between]: [Date(currentYear, currentMonth, 1), Date(currentYear, currentMonth + 1, 0)]
//             }
//         }
//     }

//     if (req.query.name) {
//         dataControl.departmentName = req.query.name;
//     }

//     var attr = req.query.headers.split(", ");
//     database.findAll({
//         attributes: attr,
//         where: dataControl
//     }).then(function (data) {
//         if (data.length > 0) {
//             res.json({
//                 status: 200,
//                 data: data
//             });
//         } else {
//             res.json({
//                 status: 201,
//                 msg: "Cannot find any data"
//             });
//         }
//     })
// }

// req.body.table       "Budget", "Expense"
// req.body.headers     "categories, amount"
exports.allQuery = function (req, res) {
    if (req.query.table === "Expense") {
        var database = db.expenses;
        var dataControl = {
            dateOccurred: {
                [Op.lt]: (new Date())
            }
        }
    } else if (req.query.table === "Budget") {
        var database = db.budgets;
        var dataControl = {
            dateExpired: {
                [Op.gt]: (new Date())
            }
        }
    }

    if (req.query.name) {
        dataControl.departmentName = req.query.name;
    }

    var attr = req.query.headers.split(", ");
    database.findAll({
        attributes: attr,
        where: dataControl
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