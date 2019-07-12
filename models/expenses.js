'use strict';
module.exports = (sequelize, DataTypes) => {
  const expenses = sequelize.define('expenses', {
    // restaurantId: {
    //   type:DataTypes.INTEGER,
    //   allowNull:true,
    //   validate: {
    //     len: [1]
    //   }
    // },
    restaurantName: {
      type:DataTypes.STRING,
      allowNull:true,
      validate: {
        len: [1]
      }
    },
    departmentName: {
      type:DataTypes.STRING,
      allowNull:true,
      validate: {
        len: [1]
      }
    },
    expenseName: {
      type:DataTypes.STRING,
      allowNull:true,
      validate: {
        len: [1]
      }
    },
    expenseCost: {
      type:DataTypes.DECIMAL(30, 2),
      allowNull:true
    },
    dateOccurred: {
      type:DataTypes.DATE,
      allowNull:true
    }
    // ,
    // username: {
    //   type:DataTypes.STRING,
    //   allowNull:true,
    //   validate: {
    //     len: [1]
    //   }
    // }
  }, {});
  expenses.associate = function(models) {
    // associations can be defined here
  };
  return expenses;
};