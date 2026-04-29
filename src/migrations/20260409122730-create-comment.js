"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rating: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        // ← Importante: snake_case
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users", // ← Asegura que coincida con tu tabla de users
          key: "id",
        },
        onDelete: "CASCADE",
      },
      course_id: {
        // ← Importante: snake_case
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "courses", // ← Debe coincidir con el nombre de la tabla courses
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("comments");
  },
};
