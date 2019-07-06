'use strict';
module.exports = (sequelize, DataTypes) => {
  const expenses = sequelize.define('expenses', {
    departmentName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1]
      }
    },
    expenseName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1]
      }
    },
    expenseCost: {
      type:DataTypes.DECIMAL(30, 2),
      allowNull:false
    },
    dateOccurred: {
      type:DataTypes.DATE,
      allowNull:false
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1]
      }
    }
  }, {});
  expenses.associate = function(models) {
    // associations can be defined here
  };
  return expenses;
};