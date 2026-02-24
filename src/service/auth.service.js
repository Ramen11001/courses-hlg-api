const jwt = require("jsonwebtoken");
const { User } = require("../models");
const SECRET_KEY = "secret_key";

/**
 * User authentication and token generation
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} JWT token and user data
 */
const login = async (email, password) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user || user.password !== password) {
    throw new Error("Credenciales inválidas");
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "1h" },
  );

  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: fullName,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = { login };
