'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restaurantId: {
        type: Sequelize.INTEGER
      },
      restaurantName: {
        type: Sequelize.STRING
      },
      departmentName: {
        type: Sequelize.STRING
      },
      expenseName: {
        type: Sequelize.STRING
      },
      expenseCost: {
        type: Sequelize.DECIMAL
      },
      dateOccurred: {
        type: Sequelize.DATE
      },
      username: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('expenses');
  }
};