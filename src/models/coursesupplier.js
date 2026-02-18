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
    static associate(models) {
      CourseSupplier.hasMany(models.Course);
    }
  }
  CourseSupplier.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.TEXT,
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
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [
          { name: "facebook", link: null, enabled: false },
          { name: "instagram", link: null, enabled: false },
          { name: "twitter", link: null, enabled: false },
          { name: "linkedin", link: null, enabled: false },
          { name: "youtube", link: null, enabled: false },
          { name: "tiktok", link: null, enabled: false },
        ],
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
