const { body } = require("express-validator");
const {
  DUPLICATE_USER_EMAIL,
  DUPLICATE_USER_PHONES,
  VALIDITY_YEAR,
} = require("../const/messages.const");
/**
 * Validation rules for creating a new user.
 * Ensures required fields are present and correctly formatted.
 */
const userPost = [
  body("fristName")
    .trim()
    .notEmpty()
    .withMessage("El campo fristName es obligatorio.")
    .isString()
    .isLength({ min: 2, max: 50 }),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("El campo lastName es obligatorio.")
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("El campo lastName debe ser una cadena de texto."),
  body("birthday")
    .notEmpty()
    .withMessage("El campo birthday es obligatorio.")
    .withMessage("La fecha de nacimiento es obligatoria")
    .isISO8601()
    .withMessage("Formato de fecha inválido (YYYY-MM-DD)")
    .isBefore(new Date().toISOString())
    .withMessage("La fecha debe ser anterior a hoy")
    .isBefore("2014-01-01")
    .withMessage(VALIDITY_YEAR),
  body("phone")
    .trim()
    .custom((value) => uniquePhoneNumbers(value)),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email inválido")
    .custom((value) => uniqueEmails(value)),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo password es obligatorio.")
    .isString()
    .isLength({ min: 6 })
    .withMessage("El campo password debe ser una cadena de texto.")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/)
    .withMessage("La contraseña debe tener una mayúscula y un número"),
  body("biography")
    .optional()
    .trim()
    .isString()
    .withMessage("La biografía debe ser texto")
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracteres"),
  body("entity_type")
    .optional()
    .isIn(["privado", "estatal"])
    .withMessage("Tipo de entidad debe ser 'privado' o 'estatal'"),
];

/**
 * Validation rules for updating a user.
 * Ensures optional fields are correctly formatted.
 */
const userPut = [
  body("fristName")
    .trim()
    .optional()
    .withMessage("El campo fristName es obligatorio.")
    .isString()
    .isLength({ min: 2, max: 50 }),
  body("lastName")
    .trim()
    .optional()
    .withMessage("El campo lastName es obligatorio.")
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("El campo lastName debe ser una cadena de texto."),
  body("birthday")
    .optional()
    .withMessage("El campo birthday es obligatorio.")
    .withMessage("La fecha de nacimiento es obligatoria")
    .isISO8601()
    .withMessage("Formato de fecha inválido (YYYY-MM-DD)")
    .isBefore(new Date().toISOString())
    .withMessage("La fecha debe ser anterior a hoy")
    .isBefore("2014-01-01")
    .withMessage(VALIDITY_YEAR),
  body("phone")
    .trim()
    .custom((value) => uniquePhoneNumbers(value)),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email inválido")
    .custom((value) => uniqueEmails(value)),
  body("password")
    .trim()
    .optional()
    .withMessage("El campo password es obligatorio.")
    .isString()
    .isLength({ min: 6 })
    .withMessage("El campo password debe ser una cadena de texto.")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/)
    .withMessage("La contraseña debe tener una mayúscula y un número"),
  body("biography")
    .optional()
    .trim()
    .isString()
    .withMessage("La biografía debe ser texto")
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracteres"),
  body("entity_type")
    .optional()
    .isIn(["privado", "estatal"])
    .withMessage("Tipo de entidad debe ser 'privado' o 'estatal'"),
];

/**
 * Validation if another equal attribute exists
 */
const uniquePhoneNumbers = async function (value) {
  if (hasDuplicates(value, "phone")) throw new Error(DUPLICATE_USER_PHONES);
  return true;
};

const uniqueEmails = async function (value) {
  if (hasDuplicates(value, "email")) throw new Error(DUPLICATE_USER_EMAIL);
  return true;
};

function hasDuplicates(value, prop) {
  let seen = {};
  let hasDuplicates = value.some(function (currentObject) {
    return (
      seen.hasOwnProperty(currentObject[prop]) ||
      (seen[currentObject[prop]] = false)
    );
  });
  return hasDuplicates;
}

module.exports = {
  userPost,
  userPut,
};
