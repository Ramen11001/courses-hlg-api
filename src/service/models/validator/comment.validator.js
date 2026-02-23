const { body } = require("express-validator");

/**
 * Validation rules for creating a new comment.
 * Ensures required fields are present and correctly formatted.
 */
const validateCommentData = [
    body("content")
        .notEmpty()
        .withMessage("El campo content es obligatorio.")
        .isString()
        .withMessage("El campo content debe ser una cadena de texto."),
    body("user_id")
        .notEmpty()
        .withMessage("El campo user_id es obligatorio.")
        .isInt()
        .withMessage("El campo user_id debe ser un número entero válido."),
    body("parent_id")
        .isInt()
        .withMessage("El campo parent_id debe ser un número entero válido."),
];

/**
 * Validation rules for updating a comment.
 * Ensures optional fields are correctly formatted.
 */
const validateCommentDataUpdate = [
    body("content")
        .optional()
        .withMessage("El campo content es obligatorio.")
        .isString()
        .withMessage("El campo content debe ser una cadena de texto."),
    body("user_id")
        .optional()
        .withMessage("El campo user_id es obligatorio.")
        .isInt()
        .withMessage("El campo user_id debe ser un número entero válido."),
    body("parent_id")
        .optional
        .isInt()
        .withMessage("El campo parent_id debe ser un número entero válido."),
];

module.exports = {
    validateCommentData,
    validateCommentDataUpdate,
};
