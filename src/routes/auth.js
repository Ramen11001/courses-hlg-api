const express = require("express");
const router = express.Router();
const authService = require("../service/auth.service");

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
    const { firstName, lastName, email, password, birthday, phone, entity_type, images } = req.body;

    console.log('Register route - images in body:', images ? images.length + ' images' : 'no images');

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos" });
    }

    const result = await authService.register(firstName, lastName, email, password, birthday, phone, entity_type, images);

    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Error interno del servidor",
    });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "El email es requerido" });
    }
    const result = await authService.forgotPassword(email);
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Error al procesar la solicitud",
    });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token y nueva contraseña son requeridos",
      });
    }

    const result = await authService.resetPassword(token, newPassword);
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Error al procesar la solicitud",
    });
  }
});

module.exports = router;
