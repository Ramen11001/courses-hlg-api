const { body } = require("express-validator");
const { User, Course } = require("../../../models");

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
    .isLength({ min: 5, max: 200 })
    .withMessage("El título debe tener entre 5 y 200 caracteres"),

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

  body("certificate")
    .notEmpty()
    .withMessage("El campo certificate es obligatorio")
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
    ])
    .withMessage("Área no válida. Debe ser una de las opciones predefinidas"),

  body("mode")
    .notEmpty()
    .withMessage("La modalidad del curso es obligatoria")
    .isIn(["Presencial", "Online", "Híbrida"])
    .withMessage(
      "La modalidad del curso debe ser: Presencial, Online o Híbrida",
    ),

  body("level")
    .notEmpty()
    .withMessage("El nivel es obligatorio")
    .isIn(["bajo", "medio", "alto"])
    .withMessage("El nivel debe ser: bajo, medio o alto"),

  // Foreign Key - User (instructor/creador)
  body("user_id")
    .notEmpty()
    .withMessage("El campo user_id es obligatorio.")
    .isInt()
    .withMessage("El campo user_id debe ser un número entero válido.")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),

  body("images")
    .optional()
    .isArray()
    .withMessage("El campo images debe ser un arreglo de URLs"),
];

/**
 * Validation rules for updating a course.
 * Ensures optional fields are correctly formatted.
 */
const coursePut = [
  body("title")
    .optional()
    .trim()
    .isString()
    .withMessage("El campo title debe ser una cadena de texto.")
    .isLength({ min: 5, max: 200 })
    .withMessage("El título debe tener entre 5 y 200 caracteres"),

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
    .optional()
    .trim()
    .isString()
    .withMessage("La ubicación debe ser texto")
    .isLength({ max: 200 })
    .withMessage("La ubicación no puede exceder los 200 caracteres"),

  body("cost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El costo debe ser un número positivo")
    .toFloat(),

  body("certificate")
    .optional()
    .isBoolean()
    .withMessage("El campo certificate debe ser un boolean."),

  body("area")
    .optional()
    .isIn([
      "Técnica",
      "Humanidades",
      "Salud",
      "Administración",
      "Deporte",
      "Belleza",
      "Artes",
      "Ciencias",
    ])
    .withMessage("Área no válida. Debe ser una de las opciones predefinidas"),

  body("mode")
    .optional()
    .isIn(["Presencial", "Online", "Híbrida"])
    .withMessage(
      "La modalidad del curso debe ser: Presencial, Online o Híbrida",
    ),

  body("level")
    .optional()
    .isIn(["bajo", "medio", "alto"])
    .withMessage("El nivel debe ser: bajo, medio o alto"),

  // Foreign Key - User (instructor/creador)
  body("user_id")
    .optional()
    .isInt()
    .withMessage("El campo user_id debe ser un número entero válido.")
    .custom(async (value) => {
      if (value) {
        const user = await User.findByPk(value);
        if (!user) {
          throw new Error("El usuario especificado no existe");
        }
      }
      return true;
    }),

  body("images")
    .optional()
    .isArray()
    .withMessage("El campo images debe ser un arreglo de URLs"),
];

module.exports = {
  coursePost,
  coursePut,
};
