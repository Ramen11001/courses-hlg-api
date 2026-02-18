"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courseSuppliers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      birthdaye: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("COURSE_SUPPLIER", "USER", "ADMINISTRADOR"),
        defaultValue: "USER",
      },
      biography: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entity_type: {
        type: Sequelize.ENUM("estatal", "privado"),
        defaultValue: "estatal",
        allowNull: false,
      },
      social_media: {
        type: Sequelize.ARRAY(DataTypes.JSONB),
        defaultValue: [
          { name: "facebook", link: null, enabled: false },
          { name: "instagram", link: null, enabled: false },
          { name: "twitter", link: null, enabled: false },
          { name: "linkedin", link: null, enabled: false },
          { name: "youtube", link: null, enabled: false },
          { name: "tiktok", link: null, enabled: false },
        ],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CourseSuppliers");
  },
};
