"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });

      Notification.belongsTo(models.CurseSupplier, {
        onDelete: "CASCADE",
        foreignKey: "curseSupplier_id",
      });
    }
  }
  Notification.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      viewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // Foreign Keys
      course_supplier: {
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
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
    },
  );
  return Notification;
};
