"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const md5 = require("md5");

    const users = [
      {
        firstName: "Luis Daniel",
        lastName: "Tasis Pérez",
        age: 30,
        birthdaye: new Date("1974-06-17"),
        email: "luisdaniel@email.com",
        phone: "+53 53-97-60-01",
        password: md5("h76yujfg"),
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Sabina Sonia",
        lastName: "Quesada Parera",
        age: 27,
        birthdaye: new Date("1945-12-30"),
        email: "sonia@email.com",
        phone: "+53 55-67-81-90",
        password: md5("ixcddfvvfk645"),
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Administrador",
        lastName: "Administrador",
        age: 22,
        birthdaye: new Date("2004-03-30"),
        email: "admin@email.com",
        phone: "+53 55-55-91-47",
        password: md5("idrt6d6t6fdfdk"),
        role: "ADMINISTRADOR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    const emails = users.map((user) => user.email);
    await queryInterface.bulkDelete(
      "users",
      {
        email: emails,
      },
      {},
    );
  },
};
