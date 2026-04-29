const jwt = require("jsonwebtoken");
const db = require("../models");
const md5 = require("md5");
const SECRET_KEY = "secret_key";

/**
 * User authentication and token generation
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} JWT token and user data
 */
const login = async (email, password) => {
  const user = await db['User'].findOne({ where: { email } });

  if (!user) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  const encryptedPassword = md5(password).toString();

  const passwordMatches = user.password === encryptedPassword;

  if (!passwordMatches) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.firstName,
    },
    SECRET_KEY,
    { expiresIn: "24h" },
  );

  return { token, user: { email: user.email, id: user.id, role: user.role, name: user.firstName } };
};

/**
 * User registration
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} JWT token and user data
 */
const register = async (firstName, lastName, email, password, birthday, phone, entity_type) => {
  const existingUser = await db['User'].findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  const encryptedPassword = md5(password).toString();
  const newUser = await db['User'].create({
    firstName,
    lastName,
    email,
    password: encryptedPassword,
    birthday,
    phone,
    entity_type,
    role: "USER",
  });

  const fullName = `${newUser.firstName} ${newUser.lastName}`.trim();

  // Generar token para el nuevo usuario
  const token = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
    },
    SECRET_KEY,
    { expiresIn: "24h" },
  );

  return {
    token,
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      fullName: fullName,
      email: newUser.email,
      role: newUser.role,
    },
  };
};

/**
 * Reset user password directly by email
 * @param {string} email - User's email
 * @param {string} newPassword - New password to set
 * @returns {Object} success status and message
 */
const resetPassword = async (email, newPassword) => {
  if (newPassword.length < 6) {
    const error = new Error("La contraseña debe tener al menos 6 caracteres");
    error.status = 400;
    throw error;
  }

  const user = await db["User"].findOne({ where: { email } });
  if (!user) {
    const error = new Error("No se encontró un usuario con ese email");
    error.status = 404;
    throw error;
  }

  user.password = md5(newPassword).toString();
  await user.save();

  return {
    message: "Contraseña actualizada exitosamente. Ya puedes iniciar sesión.",
  };
};

module.exports = { login, register, resetPassword };
