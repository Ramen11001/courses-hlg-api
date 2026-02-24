"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Comment);
      User.hasOne(models.Notification);
      User.hasOne(models.Course);
      User.hasOne(models.Role);
      User.hasOne(models.Rating);
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      phone: {
        type: DataTypes.STRING,
        unique: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
      },
      biography: {
        type: DataTypes.TEXT,
      },
      entity_type: {
        type: DataTypes.ENUM("privado", "estatal"),
        defaultValue: "estatal",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
    },
  );
  return User;
};
