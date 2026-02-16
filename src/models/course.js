"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.CourseSupplier, {
        onDelete: "CASCADE",
        foreignKey: "courseSupplier_id",
      });

      Course.hasOne(models.CourseClassification, {
        onDelete: "CASCADE",
        foreignKey: "course_id",
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

      // (Foreign Keys)
      course_supplier: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "CurseSupplier",
          key: "id",
        },
      },
      tags: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      duration: {
        type: DataTypes.ARRAY,
        allowNull: false,
      },
      certificate: {
        type: DataTypes.ENUM("sí", "no"),
        defaultValue: "sí",
        allowNull: false,
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
