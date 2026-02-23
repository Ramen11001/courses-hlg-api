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
      Comment.hasMany(models.Comment);
      Comment.hasOne(models.Rating);
      Comment.belongsTo(models.Comment, {
        foreignKey: "parent_id",
        as: "replies",
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Comment",
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
