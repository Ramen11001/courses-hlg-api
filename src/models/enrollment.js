"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      Enrollment.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });

      Enrollment.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course",
        onDelete: "CASCADE",
      });
    }
  }

  Enrollment.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Enrollment",
      tableName: "enrollments",
    },
  );

  return Enrollment;
};
