'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userId: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    restaurantName: DataTypes.STRING,
    restaurantId: DataTypes.INTEGER
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};