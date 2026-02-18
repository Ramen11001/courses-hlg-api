"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: "role_permissions",
      });
    }

    static getSearchAttributes() {
      return ["name", "group"];
    }
  }
  Permission.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //cómo funciona esto?
      group: {
        type: DataTypes.STRING,
      },
      // Foreign Keys
      role: {
        type: DataTypes.UUID,
        references: {
          model: "Role",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Permission",
    },
  );
  return Permission;
};
