'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('budgets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      departmentName: {
        type: Sequelize.STRING
      },
      budgetTotal: {
        type: Sequelize.INTEGER
      },
      dateStart: {
        type: Sequelize.DATE
      },
      dateExpired: {
        type: Sequelize.DATE
      },
      userId: {
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
    return queryInterface.dropTable('budgets');
  }
};