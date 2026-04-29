"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE "comments" ALTER COLUMN "course_id" DROP NOT NULL;'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE "comments" ALTER COLUMN "course_id" SET NOT NULL;'
    );
  },
};
