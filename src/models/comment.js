"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });

      Comment.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course",
        onDelete: "CASCADE",
      });
    }
  }

  Comment.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
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
        allowNull: true,
        references: {
          model: "courses",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
    },
  );

  return Comment;
};
