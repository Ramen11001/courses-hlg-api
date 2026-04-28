"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Duration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Duration.belongsTo(models.Course, {
        foreignKey: "course_id",
        onDelete: "CASCADE",
      });
    }
  }
  Duration.init(
    {
      init_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      //EXAMPLE: 12 semanas
      duration_time: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "Duration",
    },
  );
  return Duration;
};
