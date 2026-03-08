const { body } = require("express-validator");
const { Comment, User } = require("../../../models");

/**
 * Validation rules for creating a new comment.
 * Ensures required fields are present and correctly formatted.
 */
const commentPost = [
  body("content")
    .notEmpty().withMessage("El contenido del comentario es obligatorio.")
    .isString().withMessage("El contenido debe ser una cadena de texto.")
    .isLength({ min: 10, max: 2000 }).withMessage("El comentario debe tener entre 10 y 2000 caracteres.")
    .trim(),

  body("user_id")
    .notEmpty().withMessage("El campo user_id es obligatorio.")
    .isInt().withMessage("El campo user_id debe ser un número entero válido.")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),

  body("course_id")
    .notEmpty().withMessage("El campo course_id es obligatorio.")
    .isInt().withMessage("El campo course_id debe ser un número entero válido."),
  // .custom(async (value) => {
  //   const course = await Course.findByPk(value);
  //   if (!course) {
  //     throw new Error("El curso especificado no existe");
  //   }
  //   return true;
  // }),

  body("parent_id")
    .optional()
    .isInt().withMessage("El campo parent_id debe ser un número entero válido.")
    .custom(async (value) => {
      if (value) {
        const parentComment = await Comment.findByPk(value);
        if (!parentComment) {
          throw new Error("El comentario padre especificado no existe");
        }
      }
      return true;
    }),
];

/**
 * Validation rules for updating a comment.
 * Ensures optional fields are correctly formatted.
 */
const commentPut = [
  body("content")
    .optional()
    .isString().withMessage("El contenido debe ser una cadena de texto.")
    .isLength({ min: 10, max: 2000 }).withMessage("El comentario debe tener entre 10 y 2000 caracteres.")
    .trim(),

  body("user_id")
    .optional()
    .isInt().withMessage("El campo user_id debe ser un número entero válido.")
    .custom(async (value) => {
      if (value) {
        const user = await User.findByPk(value);
        if (!user) {
          throw new Error("El usuario especificado no existe");
        }
      }
      return true;
    }),

  body("course_id") // Asumo que existe este campo
    .optional()
    .isInt().withMessage("El campo course_id debe ser un número entero válido."),
  // .custom(async (value) => {
  //   if (value) {
  //     const course = await Course.findByPk(value);
  //     if (!course) {
  //       throw new Error("El curso especificado no existe");
  //     }
  //   }
  //   return true;
  // }),

  body("parent_id")
    .optional()
    .isInt().withMessage("El campo parent_id debe ser un número entero válido.")
    .custom(async (value) => {
      if (value) {
        const parentComment = await Comment.findByPk(value);
        if (!parentComment) {
          throw new Error("El comentario padre especificado no existe");
        }
      }
      return true;
    }),
];

module.exports = {
  commentPost,
  commentPut,
};