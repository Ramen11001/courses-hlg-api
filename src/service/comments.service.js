const { Comment, User } = require("../models");
/**
 * Retrieves all comments based on query options.
 *
 * @async
 * @function getComment
 * @param {object} [queryOptions={}] - Options for filtering and pagination.
 * @returns {Promise<Array>} - List of comments matching query options.
 */
const getComment = async (queryOptions = {}) => {
  return await Comment.findAll(queryOptions);
};

/**
 * Retrieves a specific comment by its ID.
 *
 * @async
 * @function getCommentsById
 * @param {number} id - The ID of the comment to retrieve.
 * @returns {Promise<object|null>} - The found comment or null if not found.
 */
const getCommentsById = async (id) => {
  return await Comment.findByPk(id);
};

/**
 * Retrieves comments for a specific user
 * @param {number} user_id - ID of the user
 * @returns {Promise<Array>} - List of comments for the user
 */
const getCommentsByUser = async (user_id) => {
  return await Comment.findAll({
    where: { user_id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Creates a new comment in the database.
 *
 * @async
 * @function createComment
 * @param {object} data - The data for the new comment.
 * @returns {Promise<object>} - The newly created comment.
 */
const createComment = async (data) => {
  return await Comment.create(data);
};

/**
 * Updates an existing comment by ID.
 *
 * @async
 * @function updateComment
 * @param {number} id - The ID of the comment to update.
 * @param {object} data - The new data for the comment.
 * @returns {Promise<object|null>} - The updated comment or null if not found.
 */
const updateComment = async (id, data) => {
  const comments = await Comment.findByPk(id);
  if (comments) {
    return await comments.update(data);
  }
  return null;
};

/**
 * Deletes a comment by ID.
 *
 * @async
 * @function deleteComment
 * @param {number} id - The ID of the comment to delete.
 * @returns {Promise<object|null>} - A success message or null if the comment was not found.
 */
const deleteComment = async (id) => {
  const comments = await Comment.findByPk(id);
  if (!comments) {
    return null;
  }

  await comments.destroy();
  return { message: "Comentario eliminado exitosamente" };
};

module.exports = {
  getComment,
  getCommentsById,
  getCommentsByUser,
  createComment,
  updateComment,
  deleteComment,
};
