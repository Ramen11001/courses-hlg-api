const express = require("express");
const router = express.Router();
const commentService = require("../service/comments.service");
const {
  commentPost,
  commentPut,
} = require("../service/models/validator/comment.validator");
const { validationResult } = require("express-validator");
const { filterPagination } = require("../service/query/filter/filter.service");

/**
 * Route handler for creating a new comment.
 * Validates the request body before passing it to the service.
 *
 * @route POST /comments
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.post("/", commentPost, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newComment = await commentService.createComment(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el comentario" });
  }
});

/**
 * Route handler for retrieving comments with pagination and filtering.
 * Uses middleware to modify the query options before passing them to the service.
 *
 * @route GET /comments
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/", filterPagination, async (req, res) => {
  try {
    const comments = await commentService.getComment(req.queryOptions);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

/**
 * Route handler for retrieving a specific comment by ID.
 * Returns a 404 error if the comment is not found.
 *
 * @route GET /comments/:id
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/:id", async (req, res) => {
  try {
    const comment = await commentService.getCommentsById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el comentario" });
  }
});

/**
 * Get comments for a specific user
 * @route GET /comments/user/:userId
 */
router.get("/user/:user_id", filterPagination, async (req, res) => {
  try {
    const whereClause = req.params.user_id ? req.params.user_id : null;
    const comments = await commentService.getCommentsByUser(whereClause);

    res.json(comments);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

/**
 * Route handler for updating a comment by ID.
 * Validates the request body and returns a 404 error if the comment is not found.
 *
 * @route PUT /comments/:id
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.put("/:id", commentPut, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedComment = await commentService.updateComment(
      req.params.id,
      req.body,
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el comentario" });
  }
});

/**
 * Route handler for deleting a comment by ID.
 * Returns a 404 error if the comment does not exist.
 *
 * @route DELETE /comments/:id
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await commentService.deleteComment(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    res.json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
});

module.exports = router;
