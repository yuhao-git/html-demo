'use strict';
const {
  Model
} = require('sequelize');

const { generateRandomString } = require('../utils/utils');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      },
      validate: {
        notEmpty: {
          msg: "邮箱不能为空"
        },
        isUnique: async (value, next) => {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            return next("邮箱已存在");
          }
          next();
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: generateRandomString(16),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sex: DataTypes.TINYINT,
    company: DataTypes.STRING,
    introduce: DataTypes.TEXT,
    role: DataTypes.TINYINT,
    // avatar: DataTypes.STRING,
    // status: DataTypes.TINYINT,
    // lastLoginAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};