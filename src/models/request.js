"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      Request.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Request.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("become_teacher", "request_verification"),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
      reviewed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      review_message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reviewed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Request",
      tableName: "requests",
    }
  );
  return Request;
};
