'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rating.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });
      Rating.belongsTo(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: "comment_id",
      });
    }
  }
  Rating.init({
    // Foreign Keys
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    // Foreign Keys
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Comment",
        key: "id",
      },
    },
    rating: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: "Rating",
    tableName: "rating",
  });
  return Rating;
};