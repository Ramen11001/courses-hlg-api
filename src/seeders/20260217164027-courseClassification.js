"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get courses id
    const courses = await queryInterface.sequelize.query(
      'SELECT id, title FROM "Courses";',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    if (courses.length === 0) {
      throw new Error(
        "No hay cursos en la base de datos. Ejecuta primero el seed de cursos.",
      );
    }

    // Create course map by title
    const courseMap = {};
    courses.forEach((course) => {
      courseMap[course.title] = course.id;
    });

    const classifications = [
      {
        area: "Técnica",
        mode: "Híbrida",
        level: "alto",
        course_id: courseMap["Desarrollo Web Full Stack con JavaScript"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        area: "Técnica",
        mode: "Híbrida",
        level: "alto",
        course_id:
          courseMap["Python para Ciencia de Datos e Inteligencia Artificial"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        area: "Artes",
        mode: "Presencial",
        level: "medio",
        course_id: courseMap["Diseño UX/UI de Productos Digitales"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        area: "Administración",
        mode: "Híbrida",
        level: "bajo",
        course_id: courseMap["Marketing Digital y Growth Hacking"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        area: "Técnica",
        mode: "Híbrida",
        level: "alto",
        course_id: courseMap["DevOps y Cloud Computing con AWS"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        area: "Técnica",
        mode: "Presencial",
        level: "medio",
        course_id:
          courseMap["Desarrollo de Aplicaciones Móviles con React Native"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        area: "Técnica",
        mode: "Híbrida",
        level: "bajo",
        course_id: courseMap["Introducción a la Ciberseguridad"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        area: "Administración",
        mode: "Presencial",
        level: "medio",
        course_id: courseMap["Gestión de Proyectos con Metodologías Ágiles"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Verify that all course_ids exist
    const validClassifications = classifications.filter(
      (c) => c.course_id !== undefined,
    );

    if (validClassifications.length === 0) {
      throw new Error("No se encontraron cursos con los títulos especificados");
    }

    return queryInterface.bulkInsert(
      "CourseClassifications",
      validClassifications,
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("CourseClassifications", null, {});
  },
};
