const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const db = require("../models");
const md5 = require("md5");
const { sendResetPasswordEmail } = require("./email.service");
require("dotenv").config({ path: require("path").join(__dirname, "..", "..", ".env") });
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
const register = async (firstName, lastName, email, password, birthday, phone, entity_type, images) => {
  const existingUser = await db['User'].findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  console.log('Register - images received:', images ? images.length + ' images' : 'no images');

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
    images: images || [],
  });

  console.log('Register - created user with images:', newUser.images);

  const fullName = `${newUser.firstName} ${newUser.lastName}`.trim();

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
 * Send forgot-password email with reset link
 * @param {string} email - User's email
 * @returns {Object} success message
 */
const forgotPassword = async (email) => {
  const user = await db["User"].findOne({ where: { email } });
  if (!user) {
    return { message: "Si el correo existe, recibirás un enlace para restablecer tu contraseña." };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 3600000); // 1 hour

  user.reset_token = resetToken;
  user.reset_token_expires = expires;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL || "http://localhost:4200"}/reset-password/${resetToken}`;
  await sendResetPasswordEmail(email, resetLink);

  return { message: "Si el correo existe, recibirás un enlace para restablecer tu contraseña." };
};

/**
 * Reset user password using a reset token
 * @param {string} token - Reset token
 * @param {string} newPassword - New password to set
 * @returns {Object} success status and message
 */
const resetPassword = async (token, newPassword) => {
  if (newPassword.length < 6) {
    const error = new Error("La contraseña debe tener al menos 6 caracteres");
    error.status = 400;
    throw error;
  }

  const user = await db["User"].findOne({ where: { reset_token: token } });
  if (!user) {
    const error = new Error("Enlace inválido o ya expiró");
    error.status = 400;
    throw error;
  }

  if (new Date() > new Date(user.reset_token_expires)) {
    user.reset_token = null;
    user.reset_token_expires = null;
    await user.save();
    const error = new Error("El enlace ha expirado. Solicita uno nuevo.");
    error.status = 400;
    throw error;
  }

  user.password = md5(newPassword).toString();
  user.reset_token = null;
  user.reset_token_expires = null;
  await user.save();

  return {
    message: "Contraseña actualizada exitosamente. Ya puedes iniciar sesión.",
  };
};

module.exports = { login, register, forgotPassword, resetPassword };
