/**
 * This module holds message enum to return to the web client as messages.
 * Constants must be both defined and exported in alphabetical order.
 */

const messageValidator = {
  DUPLICATE_USER_EMAIL: "No puede tener direcciones de correo duplicadas",
  DUPLICATE_USER_PHONES: "No puede tener números de teléfono duplicados",
  VALIDITY_YEAR: "Los usuarios deben tener más de 12 años. La fecha debe ser anterior al año 2014",
  BIRTH_DAY_MESSAGE: "Feliz cumpleaños!!",
  WELCOME_MESSAGE: "Bienvenido al catálogo de cursos de Holguín. Feliz viaje entre los caminos del saber!",
};

module.exports = {
  messageValidator,
  DUPLICATE_USER_EMAIL: messageValidator.DUPLICATE_USER_EMAIL,
  DUPLICATE_USER_PHONES: messageValidator.DUPLICATE_USER_PHONES,
  VALIDITY_YEAR: messageValidator.VALIDITY_YEAR,
  BIRTH_DAY_MESSAGE: messageValidator.BIRTH_DAY_MESSAGE,
  WELCOME_MESSAGE: messageValidator.WELCOME_MESSAGE,
};
