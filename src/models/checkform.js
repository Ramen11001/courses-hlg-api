"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CheckForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CheckForm.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed_courses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      certificate: {
        type: DataTypes.ENUM("Sí", "No"),
        defaultValue: "estatal",
        allowNull: false,
      },
      rating_porcent: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      entity_type: {
        type: DataTypes.ENUM("privado", "estatal"),
        defaultValue: "estatal",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CheckForm",
      tableName: "checkForm",
    },
  );
  return CheckForm;
};
