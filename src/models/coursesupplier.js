"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CourseSupplier extends Model {
    static associate(models) {
      CourseSupplier.hasMany(models.Notification);
      CourseSupplier.hasMany(models.Course);
    }
  }

  CourseSupplier.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      birthdaye: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      rating: {
        type: DataTypes.INTEGER,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entity_type: {
        type: DataTypes.ENUM("privado", "estatal"),
        defaultValue: "estatal",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CourseSupplier",
      tableName: "courseSupplier",
    },
  );

  return CourseSupplier;
};
