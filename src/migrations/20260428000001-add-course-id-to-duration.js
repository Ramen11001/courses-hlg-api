'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('durations', 'course_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.addIndex('durations', ['course_id'], {
      name: 'durations_course_id_index',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('durations', 'course_id');
  },
};
