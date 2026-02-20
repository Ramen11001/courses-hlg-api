"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseClassification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CourseClassification.belongsTo(models.Course, {
        onDelete: "CASCADE",
        foreignKey: "course_id",
      });
    }
  }
  CourseClassification.init(
    {
      //revisar si así está correcto para hacer regresión lineal
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
      // Foreign Keys
      course_id: {
        type: DataTypes.UUID,
        references: {
          model: "Course",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "CourseClassification",
      tableName: "courseClassification",
    },
  );
  return CourseClassification;
};
