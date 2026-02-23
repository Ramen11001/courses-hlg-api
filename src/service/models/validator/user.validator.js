const { body } = require("express-validator");
const {
    DUPLICATE_USER_EMAIL,
    DUPLICATE_USER_PHONES,
    UNIQUE_EMAIL,
    UNIQUE_USERNAME,
    VALIDITY_YEAR,
} = require('../const/messages.const')
/**
 * Validation rules for creating a new user.
 * Ensures required fields are present and correctly formatted.
 */
const validateUserData = [
    body("fristName")
        .trim()
        .notEmpty()
        .withMessage("El campo fristName es obligatorio.")
        .isString()
        .isLength({ min: 1 }),
    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("El campo lastName es obligatorio.")
        .isString()
        .isLength({ min: 1 })
        .withMessage("El campo lastName debe ser una cadena de texto."),
    body("birthday")
        .notEmpty()
        .withMessage("El campo birthday es obligatorio."),
    body("email")
        .notEmpty(),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("El campo password es obligatorio.")
        .isString()
        .isLength({ min: 4 })
        .withMessage("El campo password debe ser una cadena de texto."),
    body("biography")
        .notEmpty(),
    body("entity_type")
        .notEmpty()
];

/**
 * Validation rules for updating a user.
 * Ensures optional fields are correctly formatted.
 */
const validateUserDataUpdate = [
    body("fristName")
        .trim()
        .optional()
        .withMessage("El campo fristName es obligatorio.")
        .isString()
        .isLength({ min: 1 }),
    body("lastName")
        .trim()
        .optional()
        .withMessage("El campo lastName es obligatorio.")
        .isString()
        .isLength({ min: 1 })
        .withMessage("El campo lastName debe ser una cadena de texto."),
    body("birthday")
        .optional()
        .withMessage("El campo birthday es obligatorio."),
    body("email")
        .optional(),
    body("password")
        .trim()
        .optional()
        .withMessage("El campo password es obligatorio.")
        .isString()
        .isLength({ min: 4 })
        .withMessage("El campo password debe ser una cadena de texto."),
    body("biography")
        .optional(),
    body("entity_type")
        .optional()
];

module.exports = {
    validateUserData,
    validateUserDataUpdate
};
