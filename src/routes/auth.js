const express = require("express");
const authService = require("../service/auth.service");
const router = express.Router();

/**
 * Authentication path: `POST /auth/login`
 * @route POST /auth/login
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} token and user data if authentication is successful
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "Email y password son requeridos",
      });
    }

    const result = await authService.login(email, password);

    res.json({
      message: "Login exitoso",
      ...result,
    });
  } catch (error) {
    if (error.message === "Credenciales inválidas") {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
