/**
 * This module holds message enum to return to the web client as messages.
 * Constants must be both defined and exported in alphabetical order.
 */

export const messageValidator = {
    DUPLICATE_USER_EMAIL: 'No puede tener direcciones de correo duplicadas',
    DUPLICATE_USER_PHONES: 'No puede tener números de teléfono duplicados',
    UNIQUE_EMAIL: 'Ya existe un usuario con ese correo',
    UNIQUE_USERNAME: 'Ya existe un usuario con ese nombre',
    VALIDITY_YEAR: 'Los años válidos tienen que ser mayor que cero',
}

