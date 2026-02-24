const { User } = require("../models");
const md5 = require("md5");
const moment = require("moment");
const {
  BIRTH_DAY_MESSAGE,
  WELCOME_MESSAGE,
} = require("../const/messages.const");
/**
 * Retrieves all users based on query options.
 *
 * @async
 * @function getUser
 * @param {object} [queryOptions={}] - Options for filtering and pagination.
 * @returns {Promise<Array>} - List of user matching query options.
 */
const getUser = async (queryOptions = {}) => {
  return await User.findAll({
    ...queryOptions,
    attributes: { exclude: ["password"] }, //
  });
};

/**
 * Retrieves a specific user by its ID.
 *
 * @async
 * @function getUserById
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<object|null>} - The found user or null if not found.
 */
const getUserById = async (id) => {
  return await User.findByPk(id);
};

/**
 * Creates a new user in the database.
 *
 * @async
 * @function createUser
 * @param {object} data - The data for the new user.
 * @returns {Promise<object>} - The newly created user.
 */
const createUser = async (data) => {
  data.password = md5(data.password);
  return await User.create(data); //data is generic
};

/**
 * Updates an existing user by ID.
 *
 * @async
 * @function updateUser
 * @param {number} id - The ID of the user to update.
 * @param {object} data - The new data for the user.
 * @returns {Promise<object|null>} - The updated user or null if not found.
 */
const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (user) {
    if (data.password) {
      data.password = md5(data.password);
    }
    return await user.update(data); //Sequelize's own function
  }
  return null;
};

/**
 * Deletes a user by ID.
 *
 * @async
 * @function deleteUser
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<object|null>} - A success message or null if the user was not found.
 */
const deleteUser = async (id) => {
  const users = await User.findByPk(id);
  if (!users) {
    return null;
  }

  await users.destroy(); //Sequelize's own function
  return { message: "Usuario eliminado exitosamente" };
};

/**
 * Gets all congrats messages to the users if exists the case
 * @returns all messages to the user or none
 */
async function getCongratsMessages(id) {
  const today = moment();

  // Search user
  const user = await User.findByPk(id, {
    attributes: ["id", "firstName", "lastName", "birthday"],
  });
  if (!user) return [];
  //If user exist
  let congratMessage = [];
  const fullName = `${user.firstName} ${user.lastName}`.trim();

  //Birthday
  if (today.format("MM/DD") === moment(user.birthday).format("MM/DD")) {
    const message = BIRTH_DAY_MESSAGE` ${fullName}`;
    congratMessage.push({
      type: "birthday",
      message,
    });
  }

  //Welcome (first login :V)
  const daysSinceCreation = today.diff(moment(user.createdAt), "days");
  //User less than 2 or 1. ???????????????????????????????????????????????????????
  if (daysSinceCreation < 2) {
    const message = WELCOME_MESSAGE` ${fullName}`;
    congratMessage.push({
      type: "welcome",
      message,
    });
  }

  return congratMessage;
}

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCongratsMessages,
};
