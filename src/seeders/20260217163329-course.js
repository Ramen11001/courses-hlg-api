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

    const course = [
      {
        title: "Desarrollo Web Full Stack con JavaScript",
        description:
          "Aprende a crear aplicaciones web completas desde cero con Node.js, React y MongoDB. Incluye proyectos prácticos y mentorías personalizadas.",
        study_plan:
          "Módulo 1: Fundamentos de JavaScript\nMódulo 2: Backend con Node.js y Express\nMódulo 3: Frontend con React\nMódulo 4: Bases de datos con MongoDB\nMódulo 5: Despliegue y DevOps",
        location: "Joven Club",
        cost: 499.99,
        user_id: user_id[2]?.id,
        area: "Técnica",
        mode: "Híbrida",
        level: "alto",
        certificate: true,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
          "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Python para Ciencia de Datos e Inteligencia Artificial",
        description:
          "Domina Python y sus librerías para análisis de datos, machine learning y deep learning. Proyectos con datasets reales.",
        study_plan:
          "Semana 1-2: Python básico\nSemana 3-4: NumPy y Pandas\nSemana 5-6: Visualización con Matplotlib\nSemana 7-8: Machine Learning con Scikit-learn\nSemana 9-10: Deep Learning con TensorFlow\nSemana 11-12: Proyecto final",
        location: "Joven Club",
        cost: 799.99,
        user_id: user_id[3]?.id,
        area: "Técnica",
        mode: "Híbrida",
        level: "alto",
        certificate: false,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Diseño UX/UI de Productos Digitales",
        description:
          "Aprende a diseñar experiencias de usuario intuitivas y atractivas. Desde investigación hasta prototipado y testing.",
        study_plan:
          "Módulo 1: Fundamentos de UX\nMódulo 2: Investigación de usuarios\nMódulo 3: Wireframing y prototipado\nMódulo 4: Diseño visual UI\nMódulo 5: Testing y iteración\nMódulo 6: Portfolio y casos de estudio",
        location: "Joven Club",
        cost: 649.5,
        user_id: user_id[4]?.id,
        certificate: true,
        area: "Artes",
        mode: "Presencial",
        level: "medio",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
          "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Marketing Digital y Growth Hacking",
        description:
          "Estrategias avanzadas de marketing digital, SEO, SEM, email marketing y growth hacking para startups.",
        study_plan:
          "Semana 1: Fundamentos de marketing digital\nSemana 2: SEO y contenido\nSemana 3: SEM y publicidad pagada\nSemana 4: Email marketing y automatización\nSemana 5: Growth hacking\nSemana 6: Analítica y KPIs",
        location: "UHO Holguín",
        cost: 399.99,
        user_id: user_id[5]?.id,
        certificate: false,
        area: "Administración",
        mode: "Híbrida",
        level: "bajo",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
          "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "DevOps y Cloud Computing con AWS",
        description:
          "Aprende a implementar infraestructura como código, CI/CD, contenedores y servicios cloud de AWS.",
        study_plan:
          "Módulo 1: Fundamentos DevOps\nMódulo 2: Docker y contenedores\nMódulo 3: Kubernetes\nMódulo 4: CI/CD con Jenkins\nMódulo 5: AWS Services\nMódulo 6: Infraestructura como código con Terraform",
        location: "UHO Holguín",
        cost: 899.99,
        user_id: user_id[2]?.id,
        certificate: true,
        area: "Técnica",
        mode: "Híbrida",
        level: "alto",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Desarrollo de Aplicaciones Móviles con React Native",
        description:
          "Crea apps nativas para iOS y Android usando React Native. Incluye publicación en App Store y Google Play.",
        study_plan:
          "Semana 1-2: Fundamentos de React Native\nSemana 3-4: Navegación y estado\nSemana 5-6: APIs nativas y dispositivos\nSemana 7-8: UI/UX en móviles\nSemana 9-10: Testing y debugging\nSemana 11-12: Publicación y monetización",
        location: "UHO Holguín",
        cost: 549.99,
        user_id: user_id[5]?.id,
        area: "Técnica",
        mode: "Presencial",
        level: "medio",
        certificate: false,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Introducción a la Ciberseguridad",
        description:
          "Curso básico de seguridad informática para principiantes. Aprende a proteger sistemas y redes.",
        study_plan:
          "Módulo 1: Fundamentos de seguridad\nMódulo 2: Criptografía básica\nMódulo 3: Seguridad en redes\nMódulo 4: Ethical hacking\nMódulo 5: Seguridad en aplicaciones web",
        location: "UHO Holguín",
        cost: 299.99,
        user_id: user_id[3]?.id,
        certificate: true,
        area: "Técnica",
        mode: "Híbrida",
        level: "bajo",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800",
          "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Gestión de Proyectos con Metodologías Ágiles",
        description:
          "Aprende Scrum, Kanban y otras metodologías ágiles. Prepárate para certificaciones profesionales.",
        study_plan:
          "Módulo 1: Manifiesto Ágil\nMódulo 2: Scrum Framework\nMódulo 3: Kanban\nMódulo 4: Herramientas (Jira, Trello)\nMódulo 5: Liderazgo ágil\nMódulo 6: Preparación para certificación",
        location: "UHO Holguín",
        cost: 449.99,
        user_id: user_id[4]?.id,
        certificate: false,
        area: "Administración",
        mode: "Presencial",
        level: "medio",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("courses", course);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
