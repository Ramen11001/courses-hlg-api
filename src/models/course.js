"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });

      Course.hasOne(models.Duration);

      Course.hasMany(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: "course_id", // ← Especifica explícitamente el foreignKey
        as: "comments",
      });
    }
  }

  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 200],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [20, 1000],
        },
      },
      study_plan: {
        type: DataTypes.TEXT,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      certificate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      area: {
        type: DataTypes.ENUM(
          "Técnica",
          "Humanidades",
          "Salud",
          "Administración",
          "Deporte",
          "Belleza",
          "Artes",
          "Ciencias",
        ),
        allowNull: false,
      },
      mode: {
        type: DataTypes.ENUM("Presencial", "Online", "Híbrida"),
        defaultValue: "Presencial",
        allowNull: false,
      },
      level: {
        type: DataTypes.ENUM("bajo", "medio", "alto"),
        defaultValue: "medio",
        allowNull: false,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "courses",
    },
  );
  return Course;
};
