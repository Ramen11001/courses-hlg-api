"use strict";
const { User } = require("../models");
const { Product } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //For User
    async function getUserId() {
      const id_users = await User.findAll({
        attributes: ["id"],
      });
      return id_users;
    }
    const user_id = await getUserId();
    //For Product
    async function getCourseId() {
      const id_courses = await Course.findAll({
        attributes: ["id"],
      });
      return id_courses;
    }
    const course_id = await getProductId();
    return queryInterface.bulkInsert("Comments", [
      {
        rating: 1,
        text: "Lo tiene todo",
        userId: user_id[1].id,
        productId: course_id[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 2,
        text: "Perfect!!",
        userId: user_id[1].id,
        productId: course_id[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 3,
        text: "!!!!",
        userId: course_id[5].id,
        productId: course_id[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 4,
        text: "I prefer another level",
        userId: course_id[4].id,
        productId: course_id[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 5,
        text: "Amazing!!",
        userId: user_id[5].id,
        productId: course_id[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 3,
        text: "BAAAAAAH",
        userId: user_id[1].id,
        productId: course_id[5].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 1,
        text: ":)",
        userId: user_id[4].id,
        productId: course_id[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    //This is for delete the Products Table
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
