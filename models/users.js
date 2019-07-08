'use strict';

var bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [6]
      }
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1]
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    restaurantName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1]
      }
    }
  }, {
    hooks: {
      beforeCreate: function(user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    }
  });
  users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};