const express = require("express");
var router = express.Router();
const courseService = require("../service/course.service");
const {
  coursePost,
  coursePut,
} = require("../service/models/validator/course.validator");
const { validationResult } = require("express-validator");
const { filterPagination } = require("../service/query/filter/filter.service");

/**
 * Route handler for creating a new course.
 * Validates the request body before passing it to the service.
 *
 * @route POST /courses
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.post("/", coursePost, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newCourse = await courseService.createCourse(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el curso" });
  }
});

/**
 * Route handler for retrieving courses with pagination and filtering.
 * Uses middleware to modify query options before passing them to the service.
 *
 * @route GET /courses
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/", filterPagination, async (req, res) => {
  try {
    const courses = await courseService.getCourses(req.queryOptions);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
});

/**
 * Route handler for retrieving a specific course by ID.
 * Returns a 404 error if the course is not found.
 *
 * @route GET /courses/:id
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.get("/:id", async (req, res) => {
  try {
    const course = await courseService.getCoursesById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el curso" });
  }
});

/**
 * Route handler for updating a course by ID.
 * Validates the request body and returns a 404 error if the course is not found.
 *
 * @route PUT /courses/:id
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
// routes/courseRoutes.js
router.put("/:id", coursePut, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Debes iniciar sesión" });
    }

    const updatedCourse = await courseService.updateCourse(
      req.params.id,
      req.body,
      req.user.id,
    );

    res.json(updatedCourse);
  } catch (error) {
    if (error.message === "Curso no encontrado") {
      return res.status(404).json({ error: error.message });
    }

    if (error.message === "No tienes permiso para editar este curso") {
      return res.status(403).json({ error: error.message });
    }

    res.status(500).json({ error: "Error al actualizar el curso" });
  }
});

/**
 * Route handler for deleting a course by ID.
 * Returns a 404 error if the course does not exist.
 *
 * @route DELETE /courses/:id
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await courseService.deleteCourse(
      req.params.id,
      req.user.id,
    );
    if (!deletedCourse) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }
    res.json({ message: "Curso eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el curso" });
  }
});

module.exports = router;
