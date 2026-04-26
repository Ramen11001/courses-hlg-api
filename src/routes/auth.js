const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const router = express.Router();
const SECRET_KEY = "secret_key";
const authService = require("../service/auth.service");

// region POST
/**
 * Authentication path: `POST /auth/login`
 * @route POST /auth/login
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} token - JWT token and user data if authentication is successful
 */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son requeridos" });
    }

    const result = await authService.login(email, password);

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Error interno del servidor",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthday, phone, entity_type } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos" });
    }

    const result = await authService.register(firstName, lastName, email, password, birthday, phone, entity_type);

    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Error interno del servidor",
    });
  }
});

/**
 * Forgot password
 * @route POST /auth/forgot-password
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "El email es obligatorio",
      });
    }

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(200).json({
        message:
          "Si el email existe, recibirás instrucciones para restablecer tu contraseña",
      });
    }

    //24 h token
    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: 86400 }, // 24 horas
    );

    // TODO: implement email recovery
    return res.status(200).json({
      message: "Se han enviado las instrucciones a tu correo electrónico",
      resetToken: process.env.NODE_ENV === "development" ? token : undefined,
    });
  } catch (error) {
    console.error("Error en forgot password:", error);
    res.status(500).json({
      message: "Error al procesar la solicitud",
    });
  }
});

/**
 * Reset password
 * @route POST /auth/reset-password
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token y nueva contraseña son requeridos",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    // Token
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return res.status(400).json({
        message:
          "El enlace ha expirado o es inválido. Solicita un nuevo reseteo.",
      });
    }

    // Serch User
    const user = await db["User"].findByPk(decoded.user_id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: "Contraseña actualizada exitosamente. Ya puedes iniciar sesión.",
    });
  } catch (error) {
    console.error("Error en reset password:", error);
    res.status(500).json({
      message: "Error al procesar la solicitud",
    });
  }
});

module.exports = router;
