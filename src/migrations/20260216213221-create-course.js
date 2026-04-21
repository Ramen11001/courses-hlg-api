"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users", // Asegúrate que coincida con tu tabla de Users
          key: "id",
        },
        onDelete: "CASCADE",
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
        allowNull: true, // Cambiar a true porque en el modelo no tiene allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false, // Coincidir con el modelo
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
    await queryInterface.dropTable("courses");
  },
};
