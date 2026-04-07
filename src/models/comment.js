"use strict";
const { Model } = require("sequelize");
/**
 * Represents a comment in the system.
 * Each comment is linked to a user and a course.
 */
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Defines associations between models.
     * This method is called automatically in `models/index.js` and is not part of the Sequelize lifecycle.
     *
     * @param {object} models - All defined models in the application.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "user_id", // Defined in migration, links comment to a specific user.
        onDelete: "CASCADE", // Enables cascading deletion when a user is removed.
      });
      Comment.belongsTo(models.Course, {
        //Because one comment can only have one course.
        foreignKey: "course_id", // Defined in migration, links comment to a specific course.
        onDelete: "CASCADE", // Enables cascading deletion when a course is removed.
      });
    }
  }

  // Initialize the Comment model with attributes
  Comment.init(
    {
      /**
       * The rating assigned in the comment.
       * Expected to be an integer.
       */
      rating: DataTypes.INTEGER,

      /**
       * The text content of the comment.
       * Expected to be a string.
       */
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    },
  );
  return Comment;
};
