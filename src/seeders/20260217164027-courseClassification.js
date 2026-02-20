"use strict";
const { User } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    async function getCourseSupplierId() {
      const idCourseSupplier = await User.findAll({
        attributes: ["id"],
      });
      return idCourseSupplier;
    }
    const user_id = await getCourseSupplierId();
    const courses = await queryInterface.sequelize.query(
      'SELECT id, title FROM "courses";',
    );

    const courseList = courses[0];

    const courseMap = {};
    courseList.forEach((course) => {
      courseMap[course.title] = course.id;
    });
    return queryInterface.bulkInsert("CourseClassification", [
      {
        course_supplier: user_id[3].id,
        area: "Técnica",
        mode: "Online",
        level: "alto",
        courses: courseMap["Desarrollo Web Full Stack con JavaScript"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_supplier: user_id[2].id,
        area: "Técnica",
        mode: "Híbrida",
        level: "alto",
        courses:
          courseMap["Python para Ciencia de Datos e Inteligencia Artificial"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_supplier: user_id[4].id,
        area: "Artes",
        mode: "Presencial",
        level: "medio",
        courses: courseMap["Diseño UX/UI de Productos Digitales"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_supplier: user_id[5].id,
        area: "Administración",
        mode: "Online",
        level: "bajo",
        courses: courseMap["Marketing Digital y Growth Hacking"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_supplier: user_id[3].id,
        area: "Técnica",
        mode: "Híbrida",
        level: "alto",
        courses: courseMap["DevOps y Cloud Computing con AWS"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_supplier: user_id[4].id,
        area: "Técnica",
        mode: "Presencial",
        level: "medio",
        courses:
          courseMap["Desarrollo de Aplicaciones Móviles con React Native"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_supplier: user_id[2].id,
        area: "Técnica",
        mode: "Online",
        level: "bajo",
        courses: courseMap["Introducción a la Ciberseguridad"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_supplier: user_id[5].id,
        area: "Administración",
        mode: "Presencial",
        level: "medio",
        courses: courseMap["Gestión de Proyectos con Metodologías Ágiles"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("CourseClassification", null, {});
  },
};
