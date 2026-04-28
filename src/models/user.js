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
      User.hasMany(models.Course, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Comment, {
        foreignKey: "user_id",
      });

      User.hasMany(models.Notification);
      User.hasOne(models.Role);

      User.hasMany(models.Enrollment, {
        foreignKey: "user_id",
        as: "enrollments",
        onDelete: "CASCADE",
      });
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
        type: DataTypes.STRING,
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
      rating: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    },
  );
  return User;
};
