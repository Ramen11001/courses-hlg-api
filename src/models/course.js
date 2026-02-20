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
      Course.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });

      Course.hasOne(models.CourseClassification);
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

      // (Foreign Keys) only cs
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      tags: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      duration: {
        type: DataTypes.JSONB,
        defaultValue: [],

      },
      certificate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "course",
    },
  );
  return Course;
};
