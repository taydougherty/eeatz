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
      allowNull:true
    },
    dateStart: {
      type:DataTypes.DATE,
      allowNull:true
    },
    dateExpired: {
      type:DataTypes.DATE,
      allowNull:true
    }
    // ,
    // username: {
    //   type: DataTypes.STRING,
    //   allowNull:true,
    //   validate: {
    //     len: [1]
    //   }
    // }
  });
  budget.associate = function(models) {
    // associations can be defined here
  };
  return budget;
};