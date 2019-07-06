'use strict';
module.exports = (sequelize, DataTypes) => {
  const expenses = sequelize.define('expenses', {
    departmentName: DataTypes.STRING,
    expenseName: DataTypes.STRING,
    expenseCost: DataTypes.INTEGER,
    dateOccurred: DataTypes.DATE,
    userId: DataTypes.STRING
  }, {});
  expenses.associate = function(models) {
    // associations can be defined here
  };
  return expenses;
};