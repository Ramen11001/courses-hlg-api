const express = require("express");
const router = express.Router();
const enrollmentService = require("../service/enrollment.service");
const authenticate = require("../middleware/authenticate");

/**
 * POST /enrollments
 * Enroll in a course
 */
router.post("/", authenticate, async (req, res) => {
  try {
    const { course_id } = req.body;
    const user_id = req.user.id;

    if (!course_id) {
      return res.status(400).json({ error: "course_id es requerido" });
    }

    const enrollment = await enrollmentService.enrollInCourse(user_id, course_id);
    res.status(201).json(enrollment);
  } catch (error) {
    if (error.message === "No puedes inscribirte en tu propio curso") {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /enrollments/:id
 * Cancel enrollment
 */
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const result = await enrollmentService.cancelEnrollment(
      req.params.id,
      req.user.id,
    );
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * GET /enrollments/check/:courseId
 * Check if user is enrolled in a course
 */
router.get("/check/:courseId", authenticate, async (req, res) => {
  try {
    const enrolled = await enrollmentService.isEnrolled(
      req.user.id,
      req.params.courseId,
    );
    res.json(enrolled);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /enrollments/my-enrollments
 * Get current user's enrollments
 */
router.get("/my-enrollments", authenticate, async (req, res) => {
  try {
    const enrollments = await enrollmentService.getUserEnrollments(req.user.id);
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /enrollments/enrollment/:courseId
 * Get enrollment object for a course
 */
router.get("/enrollment/:courseId", authenticate, async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentByUserAndCourse(
      req.user.id,
      req.params.courseId,
    );
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
