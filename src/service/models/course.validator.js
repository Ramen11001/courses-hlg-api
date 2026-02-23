const { body } = require("express-validator");

/**
 * Validation rules for creating a new course.
 * Ensures required fields are present and correctly formatted.
 */
const validateCourseData = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("El campo title es obligatorio.")
        .isString()
        .isLength({ min: 1 })
        .withMessage("El campo title debe ser una cadena de texto."),
    body("description")
        .optional()
        .isString()
        .withMessage("El campo description debe ser una cadena de texto."),
    body('study_plan'),
    body('location')
        .notEmpty()
        .withMessage("La locación es oblitaoria")
        .isString()
        .isLength({ min: 3 })
        .withMessage("El campo location debe ser una cadena de texto."),
    body("cost")
        .notEmpty()
        .isFloat({ gt: 0 })
        .withMessage("El campo cost debe ser un número positivo."),
    body('tags'),
    body('duration'),
    body('certificate')
        .isBoolean()
        .withMessage("El campo certificate debe ser un boolean."),
    body('area'),
    body('mode'),
    body('level'),
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
const validateCourseDataUpdate = [
    body("title")
        .trim()
        .optional()
        .withMessage("El campo title es obligatorio.")
        .isString()
        .isLength({ min: 1 })
        .withMessage("El campo title debe ser una cadena de texto."),
    body("description")
        .optional()
        .isString()
        .withMessage("El campo description debe ser una cadena de texto."),
    body('study_plan')
        .optional(),
    body('location')
        .optional()
        .withMessage("La locación es oblitaoria")
        .isString()
        .isLength({ min: 3 })
        .withMessage("El campo location debe ser una cadena de texto."),
    body("cost")
        .optional()
        .isFloat({ gt: 0 })
        .withMessage("El campo cost debe ser un número positivo."),
    body('tags')
        .optional(),
    body('duration')
        .optional(),
    body('certificate')
        .optional()
        .isBoolean()
        .withMessage("El campo certificate debe ser un boolean."),
    body('area')
        .optional(),
    body('mode')
        .optional(),
    body('level')
        .optional(),
    body("user_id")
        .optional()
        .withMessage("El campo userId es obligatorio.")
        .isInt()
        .withMessage("El campo userId debe ser un número entero válido."),
];

module.exports = {
    validateCourseData,
    validateCourseDataUpdate
};
