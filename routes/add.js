var express = require('express');
var router = express.Router();

var add_controller = require('../controllers/add_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/',isAuthenticated, add_controller.index);

router.get('/budgetDropdown', add_controller.budgetDropdown);

router.post('/expenses', isAuthenticated, add_controller.createExpense);

router.post('/budgets', isAuthenticated, add_controller.createBudget);

module.exports = router;