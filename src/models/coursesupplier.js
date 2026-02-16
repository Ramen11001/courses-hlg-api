"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseSupplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CourseSupplier.hasMany(models.Notification);
    }
  }
  CourseSupplier.init(
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
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      birthdaye: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
      },
      biography: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entity_type: {
        type: DataTypes.ENUM("privado", "estatal"),
        defaultValue: "estatal",
        allowNull: false,
      },
      social_media: {
        type: DataTypes.JSON,
        defaultValue: {
          facebook: null,
          instagram: null,
          twitter: null,
          linkedin: null,
          youtube: null,
          tiktok: null,
        },
      },
    },
    {
      sequelize,
      modelName: "CourseSupplier",
      tableName: "courseSupplier",
    },
  );
  return CourseSupplier;
};
