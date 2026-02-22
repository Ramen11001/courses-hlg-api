"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const md5 = require("md5");

    const users = [
      //id 0
      {
        firstName: "Luis Daniel",
        lastName: "Tasis Pérez",
        birthday: new Date("1974-06-17"),
        email: "luisdaniel@email.com",
        phone: "+53 53-97-60-01",
        password: md5("h76yujfg"),
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //id 1
      {
        firstName: "Sabina Sonia",
        lastName: "Quesada Parera",
        birthday: new Date("1945-12-30"),
        email: "sonia@email.com",
        phone: "+53 55-67-81-90",
        password: md5("ixcddfvvfk645"),
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //id 2
      {
        firstName: "Jorge Alejandro",
        lastName: "Fernández Pérez",
        birthday: new Date("2001-01-11"),
        email: "jorgealejandro@email.com",
        phone: "+53 55-55-99-46",
        password: md5("id33r875frgffk"),
        role: "COURSE_SUPPLIER",
        biography: "Me encanta enseñar",
        rating: 3,
        location: "UHO Holguín",
        entity_type: "estatal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // id 3
      {
        firstName: "Susana",
        lastName: "Hernández Parera",
        birthday: new Date("1971-07-09"),
        email: "susana@email.com",
        phone: "+53 54-94-35-44",
        password: md5("advf4t5ggf"),
        role: "COURSE_SUPPLIER",
        biography: "Me encanta enseñar y ver a mis alumnos crecer",
        rating: 5,
        location: "Joven Club",
        entity_type: "estatal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //id 4
      {
        firstName: "Ricardo Nicomedez",
        lastName: "Hernández Rodríguez",
        birthday: new Date("1945-10-15"),
        email: "ricardo@email.com",
        phone: "+53 55-34-67-98",
        password: md5("id4533rdfk"),
        role: "COURSE_SUPPLIER",
        biography:
          "Me encanta enseñar y ver a mis alumnos crecer. Es mi vocación",
        rating: 4,
        location: "Joven Club",
        entity_type: "privado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //id 5
      {
        firstName: "Jans",
        lastName: "Hernández Parera",
        birthday: new Date("1984-03-13"),
        email: "jans@email.com",
        phone: "+53 56-67-92-08",
        password: md5("ittrr67887tdk"),
        role: "COURSE_SUPPLIER",
        biography:
          "Me encanta enseñar y ver a mis alumnos crecer. Es mi vocación :)",
        rating: 5,
        location: "Joven Club",
        entity_type: "privado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //id 6
      {
        firstName: "Administrador",
        lastName: "Administrador",
        birthday: new Date("2004-03-30"),
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
