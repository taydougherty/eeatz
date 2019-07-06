'use strict';
module.exports = (sequelize, DataTypes) => {
  const budget = sequelize.define('budget', {
    departmentName: DataTypes.STRING,
    budgetTotal: DataTypes.INTEGER,
    dateStart: DataTypes.DATE,
    dateExpired: DataTypes.DATE,
    userId: DataTypes.STRING
  }, {});
  budget.associate = function(models) {
    // associations can be defined here
  };
  return budget;
};