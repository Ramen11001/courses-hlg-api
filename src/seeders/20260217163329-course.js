"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    async function getCourseSupplierId() {
      const idCourseSupplier = await CourseSupplier.findAll({
        attributes: ["id"],
      });
      return idCourseSupplier;
    }
    const course_supplier_id = await getCourseSupplierId();
    return queryInterface.bulkInsert(
      "Course",
      course[
        ({
          title: "Desarrollo Web Full Stack con JavaScript",
          description:
            "Aprende a crear aplicaciones web completas desde cero con Node.js, React y MongoDB. Incluye proyectos prácticos y mentorías personalizadas.",
          study_plan:
            "Módulo 1: Fundamentos de JavaScript\nMódulo 2: Backend con Node.js y Express\nMódulo 3: Frontend con React\nMódulo 4: Bases de datos con MongoDB\nMódulo 5: Despliegue y DevOps",
          location: "Joven Club",
          cost: 499.99,
          course_supplier: course_supplier_id[3].id,
          tags: JSON.stringify([
            "JavaScript",
            "Node.js",
            "React",
            "MongoDB",
            "Full Stack",
          ]),
          duration: [12, "semanas"],
          certificate: "sí",
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
          course_supplier: course_supplier_id[1].id,
          tags: JSON.stringify([
            "Python",
            "Data Science",
            "Machine Learning",
            "AI",
            "TensorFlow",
          ]),
          duration: [22, "semanas"],
          certificate: "sí",
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
          course_supplier: course_supplier_id[2].id,
          tags: JSON.stringify(["UX", "UI", "Diseño", "Figma", "Prototipado"]),
          duration: [8, "semanas"],
          certificate: "sí",
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
          course_supplier: course_supplier_id[1].id,
          tags: JSON.stringify([
            "Marketing",
            "Growth Hacking",
            "SEO",
            "SEM",
            "Analítica",
          ]),
          duration: [6, "semanas"],
          certificate: "no",
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
          course_supplier: course_supplier_id[0].id,
          tags: JSON.stringify([
            "DevOps",
            "AWS",
            "Docker",
            "Kubernetes",
            "Cloud",
          ]),
          duration: [10, "semanas"],
          certificate: "sí",
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
          course_supplier: course_supplier_id[2].id,
          tags: JSON.stringify([
            "React Native",
            "Mobile",
            "iOS",
            "Android",
            "JavaScript",
          ]),
          duration: [12, "semanas"],
          certificate: "sí",
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
          course_supplier: course_supplier_id[3].id,
          tags: JSON.stringify([
            "Ciberseguridad",
            "Hacking Ético",
            "Redes",
            "Criptografía",
          ]),
          duration: [8, "semanas"],
          certificate: "sí",
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
          course_supplier: course_supplier_id[0].id,
          tags: JSON.stringify([
            "Agile",
            "Scrum",
            "Kanban",
            "Jira",
            "Project Management",
          ]),
          duration: [6, "semanas"],
          certificate: "sí",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        (this.title = course.map((titleOfCourse) => titleOfCourse.title)))
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Courses", { title: this.title }, {});
  },
};
