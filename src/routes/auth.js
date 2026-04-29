const express = require("express");
const router = express.Router();
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
 * Reset password by email
 * @route POST /auth/reset-password
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email y nueva contraseña son requeridos",
      });
    }

    const result = await authService.resetPassword(email, newPassword);

    return res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Error al procesar la solicitud",
    });
  }
});

module.exports = router;
