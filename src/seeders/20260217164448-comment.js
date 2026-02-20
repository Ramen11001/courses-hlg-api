"use strict";
const { User } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
   
    // Get existing users id
    async function getUserId() {
      const idUser = await User.findAll({
        attributes: ["id"],
      });
      return idUser;
    }
    const user_id = await getUserId();
    return queryInterface.bulkInsert("Comment", [
      //  Jorge Alejandro
      {
        course_supplier: user_id[3].id,
        user_id: user_id[2].id,
        parentId: null,
        content:
          "Excelente curso, muy completo y bien estructurado. Los profesores son muy atentos y resuelven todas las dudas. Lo recomiendo al 100%.",
        createdAt: new Date(now - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        deletedAt: null,
      },

      // Susana
      {
        course_supplier: user_id[4].id,
        user_id: user_id[3].id,
        parentId: null,
        content:
          "El material didáctico es muy bueno, pero las clases en vivo podrían ser más interactivas. A veces se sienten muy teóricas.",
        createdAt: new Date(now - 25 * 24 * 60 * 60 * 1000),
        deletedAt: null,
      },
      // Ricardo
      {
        course_supplier: user_id[2].id,
        user_id: user_id[4].id,
        parentId: null,
        content:
          "La plataforma tiene algunos bugs, pero el soporte técnico responde rápido. El contenido del curso es excelente, muy actualizado.",
        createdAt: new Date(now - 20 * 24 * 60 * 60 * 1000),
        updatedAt: now,
        deletedAt: null,
      },
      // Luis Daniel
      {
        course_supplier: user_id[3].id,
        user_id: user_id[0].id,
        parentId: null,
        content:
          "Me encantó la flexibilidad de horarios. Pude compaginar el curso con mi trabajo sin problemas. Los ejercicios prácticos son muy útiles.",
        createdAt: new Date(now - 15 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        deletedAt: null,
      },
      //  Sonia
      {
        course_supplier: user_id[5].id,
        user_id: user_id[1].id,
        parentId: null,
        content:
          "La relación calidad-precio es inmejorable. Aprendí muchísimo en poco tiempo. Los proyectos finales son desafiantes pero muy gratificantes.",
        createdAt: new Date(now - 10 * 24 * 60 * 60 * 1000),
        updatedAt: now,
        deletedAt: null,
      },
      // Jans
      {
        course_supplier: user_id[2].id,
        user_id: user_id[5].id,
        parentId: null,
        content:
          "El certificado me ayudó a conseguir un ascenso en el trabajo. Muy contento con la inversión. Repetiría sin dudarlo.",
        createdAt: new Date(now - 5 * 24 * 60 * 60 * 1000),
        updatedAt: now,
        deletedAt: null,
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Comment", null, {});
  },
};
