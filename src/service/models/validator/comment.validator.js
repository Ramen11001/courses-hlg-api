const { body } = require("express-validator");
const db = require("../../../models");

/**
 * Validation rules for creating a new comment.
 * Ensures required fields are present and correctly formatted.
 */
const commentPost = [
  body("text")
    .notEmpty()
    .withMessage("El contenido del comentario es obligatorio.")
    .isString()
    .withMessage("El contenido debe ser una cadena de texto.")
    .isLength({ max: 2000 })
    .withMessage("El comentario debe tener un máximo de 2000 caracteres.")
    .trim(),
  body("rating")
    .notEmpty()
    .withMessage("El campo rating es obligatorio.")
    .isInt({ min: 1, max: 5 })
    .withMessage('El campo "rating" debe ser un número entre 1 y 5.'),
  body("user_id")
    .notEmpty()
    .withMessage("El campo user_id es obligatorio.")
    .isInt()
    .withMessage("El campo user_id debe ser un número entero válido.")
    .custom(async (value) => {
      const user = await db["User"].findByPk(value);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),

  body("course_id")
    .notEmpty()
    .withMessage("El campo course_id es obligatorio.")
    .isInt()
    .withMessage("El campo course_id debe ser un número entero válido.")
    .custom(async (value) => {
      const user = await db["Course"].findByPk(value);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
];

const commentPostUser = [
  body("text")
    .notEmpty()
    .withMessage("El contenido del comentario es obligatorio.")
    .isString()
    .withMessage("El contenido debe ser una cadena de texto.")
    .isLength({ max: 2000 })
    .withMessage("El comentario debe tener un máximo de 2000 caracteres.")
    .trim(),
  body("rating")
    .notEmpty()
    .withMessage("El campo rating es obligatorio.")
    .isInt({ min: 1, max: 5 })
    .withMessage('El campo "rating" debe ser un número entre 1 y 5.'),
  body("user_id")
    .notEmpty()
    .withMessage("El campo user_id es obligatorio.")
    .isInt()
    .withMessage("El campo user_id debe ser un número entero válido.")
    .custom(async (value) => {
      const user = await db["User"].findByPk(value);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
];

/**
 * Validation rules for updating a comment.
 * Ensures optional fields are correctly formatted.
 */
const commentPut = [
  body("text")
    .optional()
    .isString()
    .withMessage("El contenido debe ser una cadena de texto.")
    .isLength({ min: 10, max: 2000 })
    .withMessage("El comentario debe tener entre 10 y 2000 caracteres.")
    .trim(),
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('El campo "rating" debe ser un número entre 1 y 5.'),
  body("user_id")
    .optional()
    .isInt()
    .withMessage("El campo user_id debe ser un número entero válido.")
    .custom(async (value) => {
      if (value) {
        const user = await db["User"].findByPk(value);
        if (!user) {
          throw new Error("El usuario especificado no existe");
        }
      }
      return true;
    }),
  body("course_id")
    .optional()
    .isInt()
    .withMessage("El campo course_id debe ser un número entero válido."),
];

module.exports = {
  commentPost,
  commentPostUser,
  commentPut,
};
