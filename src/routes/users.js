var express = require("express");
var router = express.Router();
const userService = require("../service/user.service");
const {
  userPost,
  userPut,
} = require("../service/models/validator/user.validator");
const { validationResult } = require("express-validator");
const { filterPagination } = require("../service/query/filter/filter.service");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const HttpError = require("http-errors");
const { User } = require("../models");
const authService = require("../service/auth.service");
const SECRET_KEY = authService.SECRET_KEY;

/**
 * Route handler for creating a new user.
 * Validates the request body before passing it to the service.
 *
 * @route POST /user
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.post("/", userPost, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

/**
 * Route handler for retrieving user with pagination and filtering.
 * Uses middleware to modify query options before passing them to the service.
 *
 * @route GET /user
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/", filterPagination, async (req, res) => {
  try {
    const users = await userService.getUser(req.queryOptions);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

/**
 * Route handler for retrieving a specific user by ID.
 * Returns a 404 error if the user is not found.
 *
 * @route GET /user/:id
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/:id", async (req, res) => {
  try {
    const users = await userService.getUserById(req.params.id);
    if (!users) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

/**
 * Route handler for updating a user by ID.
 * Validates the request body and returns a 404 error if the user is not found.
 *
 * @route PUT /user/:id
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.put("/:id", userPut, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

/**
 * Password password using the token
 * @route POST /user/forgot
 */
router.post('/forgot', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new HttpError('El email es obligatorio', 400));
    }

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(200).json({
        message: 'Si el email existe, recibirás instrucciones para restablecer tu contraseña'
      });
    }

    const token = jwt.sign(
      { user: user.id },
      SECRET_KEY,
      { expiresIn: 86400 }
    );

    // TODO: implement emailsend 
    const msg = await mailer.renderHtml({
      requestUrl: req.body.requestUrl,
      username: user.firstName || user.username,
      token: token,
    }, 'emails/reset-password');

    await mailer.send(user.email, 'Solicitud de cambio de contraseña', msg);

    return res.status(200).json({
      message: 'Se han enviado las instrucciones a tu correo electrónico'
    });

  } catch (error) {
    console.error('Error en forgot password:', error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

/**
 * Reset password using the token
 * @route POST /user/reset
 */
router.post('/reset', async (req, res, next) => {
  try {
    const { resetToken, password } = req.body;

    if (!resetToken) {
      return next(new HttpError('Debe proveer el token de verificación', 401));
    }

    if (!password) {
      return next(new HttpError('Debe proveer la nueva contraseña', 401));
    }

    if (password.length < 6) {
      return next(new HttpError('La contraseña debe tener al menos 6 caracteres', 400));
    }

    let decoded;
    try {
      decoded = jwt.verify(resetToken, SECRET_KEY);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return next(new HttpError('El token ha expirado', 401));
      }
      return next(new HttpError('Token inválido', 401));
    }


    const user = await User.findByPk(decoded.user);

    if (!user) {
      return next(new HttpError('Usuario no encontrado', 404));
    }

    await user.update({
      password: md5(password)
    });

    return res.status(200).json({
      message: 'Contraseña actualizada exitosamente'
    });

  } catch (error) {
    console.error('Error en reset password:', error);
    next(error);
  }
});

/**
 * Route handler for deleting a user by ID.
 * Returns a 404 error if the user does not exist.
 *
 * @route DELETE /user/:id
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedUsers = await userService.deleteUser(req.params.id);
    if (!deletedUsers) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

module.exports = router;
