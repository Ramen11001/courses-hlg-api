"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  //TODO: PREGUNTAR CÖMO PONERLO
  class Tag extends Model {
    static associate(models) {
      Tag.belongsTo(models.Course, {
        foreignKey: "course_id",
        onDelete: "CASCADE",
      });
    }

    static getSearchAttributes() {
      return ["name"];
    }
  }

  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      
      },
      color: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "tags",
      underscored: true,
      timestamps: false,
    },
  );
  return Tag;
};
