const { Course } = require("../models");

/**
 * Retrieves all courses based on query options.
 *
 * @async
 * @function getCourses
 * @param {object} [queryOptions={}] - Options for filtering and pagination.
 * @returns {Promise<Array>} - List of courses matching query options.
 */
const getCourses = async (queryOptions = {}) => {
  return await Course.findAll(queryOptions);
};

/**
 * Retrieves a specific courses by its ID.
 *
 * @async
 * @function getCoursesById
 * @param {number} id - The ID of the courses to retrieve.
 * @returns {Promise<object|null>} - The found courses or null if not found.
 */
const getCoursesById = async (id) => {
  return await Course.findByPk(id);
};

/**
 * Creates a new Course in the database.
 *
 * @async
 * @function createCourse
 * @param {object} data - The data for the new course.
 * @returns {Promise<object>} - The newly created course.
 */
const createCourse = async (data) => {
  return await Course.create(data); //data is generic
};

/**
 * Updates an existing Course by ID.
 *
 * @async
 * @function updateCourse
 * @param {number} id - The ID of the course to update.
 * @param {object} data - The new data for the course.
 * @returns {Promise<object|null>} - The updated course or null if not found.
 */
const updateCourse = async (id, data, user_id) => {
  const course = await Course.findByPk(id);

  if (!course) {
    throw new Error("Curso no encontrado");
  }

  if (course.user_id !== user_id) {
    throw new Error("No tienes permiso para editar este curso");
  }

  return await course.update(data);
};

/**
 * Deletes a course by ID.
 *
 * @async
 * @function deleteCourse
 * @param {number} id - The ID of the course to delete.
 * @returns {Promise<object|null>} - A success message or null if the course was not found.
 */
const deleteCourse = async (id, user_id) => {
  const course = await Course.findByPk(id);
  if (!course) {
    return null;
  }

  if (course.user_id !== user_id) {
    throw new Error("No tienes permiso para eliminar este curso");
  }
  await course.destroy(); //Sequelize's own function
  return { message: "Curso eliminado exitosamente" };
};

module.exports = {
  getCourses,
  getCoursesById,
  createCourse,
  updateCourse,
  deleteCourse,
};
