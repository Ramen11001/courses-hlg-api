'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });

      Comment.belongsTo(models.Course, {
        onDelete: "CASCADE",
        foreignKey: "course_id",
      });
    }
  }

  Comment.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      validate: {
        min: 1,
        max: 5,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Course",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: "comments",
  });

  return Comment;
};