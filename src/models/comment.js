"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.hasMany(models.Comment, {
        foreignKey: "parentId",
        as: "replies",
        onDelete: "CASCADE",
      });

      Comment.belongsTo(models.Coursesupplier, {
        foreignKey: "course_id",
        onDelete: "CASCADE",
      });

      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [10, 2000],
            msg: "El comentario debe tener entre 10 y 2000 caracteres",
          },
          notEmpty: {
            msg: "El comentario no puede estar vacío",
          },
        },
      },
      // Foreign Keys
      course_supplier_id: {
        type: DataTypes.UUID,
        references: {
          model: "Coursesupplier",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      parentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Comments",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    },
  );
  return Comment;
};
