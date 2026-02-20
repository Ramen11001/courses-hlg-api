"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });
    }
  }
  Role.init(
    {
      role: {
        type: DataTypes.STRING,
      },
      // Foreign Keys
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
      modelName: "Role",
      tableName: "role",
    },
  );
  return Role;
};
