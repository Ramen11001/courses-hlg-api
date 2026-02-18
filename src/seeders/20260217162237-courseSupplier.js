"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const md5 = require("md5");

    const courseSuppliers = [
      {
        firstName: "Jorge Alejandro",
        lastName: "Fernández Pérez",
        age: 24,
        birthdaye: new Date("2001-01-11"),
        email: "jorgealejandro@email.com",
        phone: "+53 55-55-99-46",
        password: md5("id33r875frgffk"),
        role: "COURSE_SUPPLIER",
        biography: "Me encanta enseñar",
        rating: 3,
        location: "UHO Holguín",
        entity_type: "estatal",
        social_media: {
          facebook: null,
          instagram: null,
          twitter: null,
          linkedin: null,
          youtube: null,
          tiktok: null,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Susana",
        lastName: "Hernández Parera",
        age: 54,
        birthdaye: new Date("1971-07-09"),
        email: "susana@email.com",
        phone: "+53 54-94-35-44",
        password: md5("advf4t5ggf"),
        role: "COURSE_SUPPLIER",
        biography: "Me encanta enseñar y ver a mis alumnos crecer",
        rating: 5,
        location: "Joven Club",
        entity_type: "estatal",
        social_media: [
          { platform: "facebook", url: null },
          { platform: "instagram", url: null },
          { platform: "twitter", url: null },
          { platform: "linkedin", url: null },
          { platform: "youtube", url: null },
          { platform: "tiktok", url: null },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Ricardo Nicomedez",
        lastName: "Hernández Rodríguez",
        age: 25,
        birthdaye: new Date("1945-10-15"),
        email: "ricardo@email.com",
        phone: "+53 55-34-67-98",
        password: md5("id4533rdfk"),
        role: "COURSE_SUPPLIER",
        biography:
          "Me encanta enseñar y ver a mis alumnos crecer. Es mi vocación",
        rating: 4,
        location: "Joven Club",
        entity_type: "privado",
        social_media: [
          { platform: "facebook", url: null },
          { platform: "instagram", url: null },
          { platform: "twitter", url: null },
          { platform: "linkedin", url: null },
          { platform: "youtube", url: null },
          { platform: "tiktok", url: null },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jans",
        lastName: "Hernández Parera",
        age: 29,
        birthdaye: new Date("1984-03-13"),
        email: "jans@email.com",
        phone: "+53 56-67-92-08",
        password: md5("ittrr67887tdk"),
        role: "COURSE_SUPPLIER",
        biography:
          "Me encanta enseñar y ver a mis alumnos crecer. Es mi vocación :)",
        rating: 5,
        location: "Joven Club",
        entity_type: "privado",
        social_media: [
          { platform: "facebook", url: null },
          { platform: "instagram", url: null },
          { platform: "twitter", url: null },
          { platform: "linkedin", url: null },
          { platform: "youtube", url: null },
          { platform: "tiktok", url: null },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("courseSupplier", courseSuppliers);
  },

  async down(queryInterface, Sequelize) {
    const emails = courseSuppliers.map((supplier) => supplier.email);
    await queryInterface.bulkDelete(
      "courseSupplier",
      {
        email: emails,
      },
      {},
    );
  },
};
