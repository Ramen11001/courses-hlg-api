var express = require("express");
var router = express.Router();
const userService = require("../services/user.service");
const {
  userPost,
  userPut,
} = require("../service/models/validator/user.validator");
const { validationResult } = require("express-validator");
const { filterPagination } = require("../service/query/filter/filter.service");

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
