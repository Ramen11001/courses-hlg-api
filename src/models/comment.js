'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    text: DataTypes.STRING,
    rating: {
      type: DataTypes.DOUBLE,
    },
    // Foreign Keys
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    // Foreign Keys
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