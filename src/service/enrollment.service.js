const db = require("../models");

/**
 * Enroll a user in a course
 * @param {number} userId - User ID
 * @param {number} courseId - Course ID
 * @returns {Promise<Object>} - The enrollment record
 */
const enrollInCourse = async (userId, courseId) => {
  const existingEnrollment = await db['Enrollment'].findOne({
    where: { user_id: userId, course_id: courseId },
  });

  if (existingEnrollment) {
    throw new Error("Ya estás inscrito en este curso");
  }

  const course = await db['Course'].findByPk(courseId);
  if (!course) {
    throw new Error("Curso no encontrado");
  }

  return await db['Enrollment'].create({
    user_id: userId,
    course_id: courseId,
  });
};

/**
 * Cancel enrollment
 * @param {number} enrollmentId - Enrollment ID
 * @param {number} userId - User ID (for authorization)
 * @returns {Promise<Object>} - Success message
 */
const cancelEnrollment = async (enrollmentId, userId) => {
  const enrollment = await db['Enrollment'].findOne({
    where: { id: enrollmentId, user_id: userId },
  });

  if (!enrollment) {
    throw new Error("Inscripción no encontrada");
  }

  await enrollment.destroy();
  return { message: "Inscripción cancelada exitosamente" };
};

/**
 * Check if user is enrolled in a course
 * @param {number} userId - User ID
 * @param {number} courseId - Course ID
 * @returns {Promise<boolean>} - Enrollment status
 */
const isEnrolled = async (userId, courseId) => {
  const enrollment = await db['Enrollment'].findOne({
    where: { user_id: userId, course_id: courseId },
  });
  return !!enrollment;
};

/**
 * Get enrollment by user and course
 * @param {number} userId - User ID
 * @param {number} courseId - Course ID
 * @returns {Promise<Object|null>} - Enrollment object or null
 */
const getEnrollmentByUserAndCourse = async (userId, courseId) => {
  return await db['Enrollment'].findOne({
    where: { user_id: userId, course_id: courseId },
  });
};

/**
 * Get user's enrollments
 * @param {number} userId - User ID
 * @returns {Promise<Array>} - List of enrollments with course details
 */
const getUserEnrollments = async (userId) => {
  return await db['Enrollment'].findAll({
    where: { user_id: userId },
    include: [
      {
        model: db['Course'],
        as: 'course',
        include: [
          {
            model: db['User'],
            as: 'user',
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

module.exports = {
  enrollInCourse,
  cancelEnrollment,
  isEnrolled,
  getEnrollmentByUserAndCourse,
  getUserEnrollments,
};
