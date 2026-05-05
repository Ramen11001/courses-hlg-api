"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "images", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });

    await queryInterface.addColumn("courses", "images", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "images");
    await queryInterface.removeColumn("courses", "images");
  },
};
