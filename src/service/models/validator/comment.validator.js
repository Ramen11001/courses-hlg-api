const { body } = require("express-validator");

/**
 * Validation rules for creating a new comment.
 * Ensures required fields are present and correctly formatted.
 */
const commentPost = [
  body("content")
    .notEmpty()
    .withMessage("El contenido del comentario es obligatorio.")
    .isString()
    .withMessage("El contenido debe ser una cadena de texto.")
    .isLength({ min: 10, max: 2000 })
    .withMessage("El comentario debe tener entre 10 y 2000 caracteres.")
    .trim(),
  body("user_id")
    .notEmpty()
    .withMessage("El campo user_id es obligatorio.")
    .isInt()
    .withMessage("El campo user_id debe ser un número entero válido."),
  body("parent_id")
    .optional()
    .isInt()
    .withMessage("El campo parent_id debe ser un número entero válido."),
];

/**
 * Validation rules for updating a comment.
 * Ensures optional fields are correctly formatted.
 */
const commentPut = [
  body("content")
    .optional()
    .withMessage("El contenido del comentario es obligatorio.")
    .isString()
    .withMessage("El contenido debe ser una cadena de texto.")
    .isLength({ min: 10, max: 2000 })
    .withMessage("El comentario debe tener entre 10 y 2000 caracteres.")
    .trim(),
  body("user_id")
    .optional()
    .withMessage("El campo user_id es obligatorio.")
    .isInt()
    .withMessage("El campo user_id debe ser un número entero válido."),
  body("parent_id")
    .optional()
    .isInt()
    .withMessage("El campo parent_id debe ser un número entero válido."),
];

module.exports = {
  commentPost,
  commentPut,
};
