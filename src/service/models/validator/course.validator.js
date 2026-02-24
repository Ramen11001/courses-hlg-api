const { body } = require("express-validator");

/**
 * Validation rules for creating a new course.
 * Ensures required fields are present and correctly formatted.
 */
const coursePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El campo title es obligatorio.")
    .isString()
    .withMessage("El campo title debe ser una cadena de texto.")
    .withMessage("El título debe ser texto")
    .isLength({ min: 5, max: 200 }),
  body("description")
    .optional()
    .isString()
    .withMessage("El campo description debe ser una cadena de texto.")
    .isLength({ min: 20, max: 1000 })
    .withMessage("La descripción debe tener entre 20 y 1000 caracteres"),
  body("study_plan")
    .optional()
    .trim()
    .isString()
    .withMessage("El plan de estudio debe ser texto")
    .isLength({ max: 5000 })
    .withMessage("El plan de estudio no puede exceder los 5000 caracteres"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("La ubicación es obligatoria")
    .isString()
    .withMessage("La ubicación debe ser texto")
    .isLength({ max: 200 })
    .withMessage("La ubicación no puede exceder los 200 caracteres"),
  body("cost")
    .notEmpty()
    .withMessage("El costo es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El costo debe ser un número positivo")
    .toFloat(),
  body("tags").optional().isArray(),
  body("duration").notEmpty().isArray(),
  body("certificate")
    .notEmpty()
    .isBoolean()
    .withMessage("El campo certificate debe ser un boolean."),
  body("area")
    .notEmpty()
    .withMessage("El área es obligatoria")
    .isIn([
      "Técnica",
      "Humanidades",
      "Salud",
      "Administración",
      "Deporte",
      "Belleza",
      "Artes",
      "Ciencias",
    ]),
  body("mode")
    .notEmpty()
    .withMessage("La modalidad del curso es obligatorio")
    .isIn(["Presencial", "Online", "Híbrida"])
    .withMessage("La modalidad del curso: Presencial, Online o Híbrida"),
  body("level")
    .notEmpty()
    .withMessage("El nivel es obligatorio")
    .isIn(["bajo", "medio", "alto"])
    .withMessage("El nivel debe ser: bajo, medio o alto"),
  // Foreign Key - CourseSupplier
  body("user_id")
    .notEmpty()
    .withMessage("El campo userId es obligatorio.")
    .isInt()
    .withMessage("El campo userId debe ser un número entero válido."),
];

/**
 * Validation rules for updating a course.
 * Ensures optional fields are correctly formatted.
 */
const coursePut = [
  body("title")
    .trim()
    .optional()
    .withMessage("El campo title es obligatorio.")
    .isString()
    .withMessage("El campo title debe ser una cadena de texto.")
    .withMessage("El título debe ser texto")
    .isLength({ min: 5, max: 200 }),
  body("description")
    .optional()
    .isString()
    .withMessage("El campo description debe ser una cadena de texto.")
    .isLength({ min: 20, max: 1000 })
    .withMessage("La descripción debe tener entre 20 y 1000 caracteres"),
  body("study_plan")
    .optional()
    .trim()
    .isString()
    .withMessage("El plan de estudio debe ser texto")
    .isLength({ max: 5000 })
    .withMessage("El plan de estudio no puede exceder los 5000 caracteres"),
  body("location")
    .trim()
    .optional()
    .withMessage("La ubicación es obligatoria")
    .isString()
    .withMessage("La ubicación debe ser texto")
    .isLength({ max: 200 })
    .withMessage("La ubicación no puede exceder los 200 caracteres"),
  body("cost")
    .optional()
    .withMessage("El costo es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El costo debe ser un número positivo")
    .toFloat(),
  body("tags").optional().isArray(),
  body("duration").notEmpty().isArray(),
  body("certificate")
    .optional()
    .isBoolean()
    .withMessage("El campo certificate debe ser un boolean."),
  body("area")
    .optional()
    .withMessage("El área es obligatoria")
    .isIn([
      "Técnica",
      "Humanidades",
      "Salud",
      "Administración",
      "Deporte",
      "Belleza",
      "Artes",
      "Ciencias",
    ]),
  body("mode")
    .optional()
    .withMessage("La modalidad del curso es obligatorio")
    .isIn(["Presencial", "Online", "Híbrida"])
    .withMessage("La modalidad del curso: Presencial, Online o Híbrida"),
  body("level")
    .optional()
    .withMessage("El nivel es obligatorio")
    .isIn(["bajo", "medio", "alto"])
    .withMessage("El nivel debe ser: bajo, medio o alto"),
  // Foreign Key - CourseSupplier
  body("user_id")
    .optional()
    .withMessage("El campo userId es obligatorio.")
    .isInt()
    .withMessage("El campo userId debe ser un número entero válido."),
];

module.exports = {
  coursePost,
  coursePut,
};
