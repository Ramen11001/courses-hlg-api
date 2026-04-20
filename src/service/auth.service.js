const jwt = require("jsonwebtoken");
const db = require("../models");
const SECRET_KEY = "secret_key";

/**
 * User authentication and token generation
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} JWT token and user data
 */
const login = async (email, password) => {
  const user = await db['User'].findOne({ where: { email } });

  if (!user || user.password !== password) {
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
    { expiresIn: "1h" },
  );

  return { token, user: { email: user.email, id: user.id, role: user.role, name: user.firstName, } };
};

/**
 * User registration
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} JWT token and user data
 */
const register = async (firstName, lastName, email, password) => {
  // Verificar si el usuario ya existe
  const existingUser = await db['User'].findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  // Crear nuevo usuario
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: "user",
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
    { expiresIn: "1h" },
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

module.exports = { login, register };
