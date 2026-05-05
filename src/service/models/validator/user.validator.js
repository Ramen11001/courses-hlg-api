const { body } = require("express-validator");
const { User } = require("../../../models");
const {
  DUPLICATE_USER_EMAIL,
  DUPLICATE_USER_PHONES,
  VALIDITY_YEAR,
} = require('../../../const/messages.const');

/**
 * Validation rules for creating a new user.
 */
const userPost = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("El campo firstName es obligatorio.")
    .isString().withMessage("El campo firstName debe ser texto.")
    .isLength({ min: 2, max: 50 }).withMessage("El campo firstName debe tener entre 2 y 50 caracteres."),
  
  body("lastName")
    .trim()
    .notEmpty().withMessage("El campo lastName es obligatorio.")
    .isString().withMessage("El campo lastName debe ser texto.")
    .isLength({ min: 2, max: 50 }).withMessage("El campo lastName debe tener entre 2 y 50 caracteres."),
  
  body("birthday")
    .notEmpty().withMessage("El campo birthday es obligatorio.")
    .isISO8601().withMessage("Formato de fecha inválido (YYYY-MM-DD)")
    .custom((value) => {
      const fechaNacimiento = new Date(value);
      const hoy = new Date();
      if (fechaNacimiento > hoy) {
        throw new Error("La fecha debe ser anterior a hoy");
      }
      return true;
    })
    .custom((value) => {
      const fechaNacimiento = new Date(value);
      const fechaLimite = new Date("2014-01-01");
      if (fechaNacimiento > fechaLimite) {
        throw new Error(VALIDITY_YEAR);
      }
      return true;
    }),
  
  body("phone")
    .trim()
    .optional()
    .custom(uniquePhoneNumbers),
  
  body("email")
    .notEmpty().withMessage("El campo email es obligatorio.")
    .isEmail().withMessage("Email inválido")
    .custom(uniqueEmails),
  
  body("password")
    .trim()
    .notEmpty().withMessage("El campo password es obligatorio.")
    .isString().withMessage("El campo password debe ser texto.")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres.")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/).withMessage("La contraseña debe tener una mayúscula y un número"),
  
  body("biography")
    .optional()
    .trim()
    .isString().withMessage("La biografía debe ser texto")
    .isLength({ max: 500 }).withMessage("La biografía no puede exceder los 500 caracteres"),
  
  body("entity_type")
    .optional()
    .isIn(["privado", "estatal"]).withMessage("Tipo de entidad debe ser 'privado' o 'estatal'"),

  body("images")
    .optional()
    .isArray().withMessage("El campo images debe ser un arreglo de URLs"),
];

/**
 * Validation rules for updating a user.
 */
const userPut = [
  body("firstName")
    .optional()
    .trim()
    .isString().withMessage("El campo firstName debe ser texto.")
    .isLength({ min: 2, max: 50 }).withMessage("El campo firstName debe tener entre 2 y 50 caracteres."),
  
  body("lastName")
    .optional()
    .trim()
    .isString().withMessage("El campo lastName debe ser texto.")
    .isLength({ min: 2, max: 50 }).withMessage("El campo lastName debe tener entre 2 y 50 caracteres."),
  
  body("birthday")
    .optional()
    .isISO8601().withMessage("Formato de fecha inválido (YYYY-MM-DD)")
    .custom((value) => {
      const fechaNacimiento = new Date(value);
      const hoy = new Date();
      if (fechaNacimiento > hoy) {
        throw new Error("La fecha debe ser anterior a hoy");
      }
      return true;
    })
    .custom((value) => {
      const fechaNacimiento = new Date(value);
      const fechaLimite = new Date("2014-01-01");
      if (fechaNacimiento > fechaLimite) {
        throw new Error(VALIDITY_YEAR);
      }
      return true;
    }),
  
  body("phone")
    .optional()
    .trim(),
    
  
  body("email")
    .optional()
    .isEmail().withMessage("Email inválido"),
  
  body("password")
    .optional()
    .trim()
    .isString().withMessage("El campo password debe ser texto.")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres.")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/).withMessage("La contraseña debe tener una mayúscula y un número"),
  
  body("biography")
    .optional()
    .trim()
    .isString().withMessage("La biografía debe ser texto")
    .isLength({ max: 500 }).withMessage("La biografía no puede exceder los 500 caracteres"),
  
  body("entity_type")
    .optional()
    .isIn(["privado", "estatal"]).withMessage("Tipo de entidad debe ser 'privado' o 'estatal'"),

  body("images")
    .optional()
    .isArray().withMessage("El campo images debe ser un arreglo de URLs"),
];

async function uniquePhoneNumbers(value) {
  if (!value) return true;
  const user = await User.findOne({ where: { phone: value } });
  if (user) {
    throw new Error(DUPLICATE_USER_PHONES);
  }
  return true;
}

async function uniqueEmails(value) {
  const user = await User.findOne({ where: { email: value } });
  if (user) {
    throw new Error(DUPLICATE_USER_EMAIL);
  }
  return true;
}

module.exports = {
  userPost,
  userPut,
};