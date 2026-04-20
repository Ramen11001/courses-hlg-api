"use strict";

const db = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //For User
    async function getUserId() {
      const id_users = await db['User'].findAll({
        attributes: ["id"],
      });
      return id_users;
    }
    const user_id = await getUserId();
    //For Course
    const course_id = await queryInterface.sequelize.query(
      'SELECT id FROM courses ORDER BY id;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkInsert("comments", [
      {
        rating: 1,
        text: "Lo tiene todo",
        user_id: user_id[1].id,
        course_id: course_id[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 2,
        text: "Perfect!!",
        user_id: user_id[1].id,
        course_id: course_id[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 3,
        text: "!!!!",
        user_id: user_id[5].id,
        course_id: course_id[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 4,
        text: "I prefer another level",
        user_id: user_id[4].id,
        course_id: course_id[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 5,
        text: "Amazing!!",
        user_id: user_id[5].id,
        course_id: course_id[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 3,
        text: "BAAAAAAH",
        user_id: user_id[1].id,
        course_id: course_id[5].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 1,
        text: ":)",
        user_id: user_id[4].id,
        course_id: course_id[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    //This is for delete the Comment Table
    await queryInterface.bulkDelete("comments", null, {});
  },
};
