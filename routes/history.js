var express = require('express');
var router = express.Router();

var history_controller = require('../controllers/history_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/', isAuthenticated, history_controller.index);

router.get('/budgets', history_controller.budget_history)
router.get('/budgetDropdown', history_controller.budgetDropdown)
router.put('/budgets/editEntry', history_controller.budgetEditEntry)
router.get('/expenses', history_controller.expense_history)
router.get('/expenseDropdown', history_controller.expenseDropdown)
router.put('/expenses/editEntry', history_controller.expenseEditEntry)
// router.get('/api/budget/filter:filter',history_controller.budget_history)
// router.get('/expenses', history_controller.expenses_history);


module.exports = router;