"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get user id with queryInterface
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    // validator.
    if (users.length === 0) {
      throw new Error(
        "No hay usuarios en la base de datos. Ejecuta primero el seed de usuarios.",
      );
    }

    return queryInterface.bulkInsert("Comments", [
      // Jorge Alejandro
      {
        user_id: users[2]?.id || users[0]?.id,
        parent_id: null,
        content:
          "Excelente curso, muy completo y bien estructurado. Los profesores son muy atentos y resuelven todas las dudas. Lo recomiendo al 100%.",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // Susana
      {
        user_id: users[3]?.id || users[0]?.id,
        parent_id: null,
        content:
          "El material didáctico es muy bueno, pero las clases en vivo podrían ser más interactivas. A veces se sienten muy teóricas.",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // Ricardo
      {
        user_id: users[4]?.id || users[0]?.id,
        parent_id: null,
        content:
          "La plataforma tiene algunos bugs, pero el soporte técnico responde rápido. El contenido del curso es excelente, muy actualizado.",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // Luis Daniel
      {
        user_id: users[0]?.id || 1,
        parent_id: null,
        content:
          "Me encantó la flexibilidad de horarios. Pude compaginar el curso con mi trabajo sin problemas. Los ejercicios prácticos son muy útiles.",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // Sonia
      {
        user_id: users[1]?.id || users[0]?.id,
        parent_id: null,
        content:
          "La relación calidad-precio es inmejorable. Aprendí muchísimo en poco tiempo. Los proyectos finales son desafiantes pero muy gratificantes.",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // Jans
      {
        user_id: users[5]?.id || users[0]?.id,
        parent_id: null,
        content:
          "El certificado me ayudó a conseguir un ascenso en el trabajo. Muy contento con la inversión. Repetiría sin dudarlo.",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
