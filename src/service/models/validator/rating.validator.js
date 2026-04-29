const { body } = require("express-validator");

/**
 * Validation rules for rating.
 * Ensures required fields are present and correctly formatted.
 */
const validateRatingData = [
    body("rating")
        .notEmpty().withMessage("El campo rating es obligatorio.")
        .isInt({ min: 1, max: 5 }).withMessage('El campo "rating" debe ser un número entre 1 y 5.'),

    body("user_id")
        .notEmpty().withMessage("El campo user_id es obligatorio.")
        .isInt().withMessage("El campo user_id debe ser un número entero válido."),

    body("course_id")
        .notEmpty().withMessage("El campo course_id es obligatorio.")
        .isInt().withMessage("El campo course_id debe ser un número entero válido."),

    body("comment")
        .optional()
        .isString().withMessage("El comentario debe ser texto.")
        .isLength({ max: 500 }).withMessage("El comentario no puede exceder los 500 caracteres.")
        .trim(),
];

module.exports = {
    validateRatingData,
};