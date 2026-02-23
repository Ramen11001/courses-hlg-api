const { body } = require("express-validator");

/**
 * Validation rules for rating.
 * Ensures required fields are present and correctly formatted.
 */
const validateRatingData = [
    body("rating")
        .withMessage("El campo rating es obligatorio.")
        .isInt({ min: 1, max: 5 })
        .withMessage('El campo "rating" debe ser un número entre 1 y 5.'),
]

export {
    validateRatingData
}