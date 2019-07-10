var express = require('express');
var router = express.Router();

var history_controller = require('../controllers/history_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");
// I changed this to budget_history as the first table seen by default is the budget one
router.get('/',isAuthenticated , history_controller.index);

router.get('/budgets', history_controller.budget_history)

// router.get('/api/budget/filter:filter',history_controller.budget_history)
// router.get('/expenses', history_controller.expenses_history);


module.exports = router;