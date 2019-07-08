'use strict';

module.exports = (sequelize, DataTypes) => {
  const budget = sequelize.define('budgets', {
    departmentName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1]
      }
    },
    budgetTotal: {
      type:DataTypes.DECIMAL(30, 2),
      allowNull:false
    },
    dateStart: {
      type:DataTypes.DATE,
      allowNull:false
    },
    dateExpired: {
      type:DataTypes.DATE,
      allowNull:false
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1]
      }
    }
  });
  budget.associate = function(models) {
    // associations can be defined here
  };
  return budget;
};