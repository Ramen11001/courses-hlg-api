"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        autoIncrement: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      study_plan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      certificate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      tags: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      duration: {
        type: Sequelize.JSON,
        defaultValue: [],
        allowNull: false,
      },
      area: {
        type: Sequelize.ENUM(
          "Técnica",
          "Humanidades",
          "Salud",
          "Administración",
          "Deporte",
          "Belleza",
          "Artes",
          "Ciencias",
        ),
        allowNull: false,
      },
      mode: {
        type: Sequelize.ENUM("Presencial", "Online", "Híbrida"),
        defaultValue: "Presencial",
        allowNull: false,
      },
      level: {
        type: Sequelize.ENUM("bajo", "medio", "alto"),
        defaultValue: "medio",
        allowNull: false,
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
    await queryInterface.dropTable("Courses");
  },
};
