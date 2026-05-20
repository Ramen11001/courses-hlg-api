const db = require("../models");
const { createNotification } = require("./notification.service");

/**
 * Enroll a user in a course
 * @param {number} userId - User ID
 * @param {number} courseId - Course ID
 * @returns {Promise<Object>} - The enrollment record
 */
const enrollInCourse = async (userId, courseId) => {
  const course = await db['Course'].findByPk(courseId);
  if (!course) {
    throw new Error("Curso no encontrado");
  }

  if (course.user_id === userId) {
    throw new Error("No puedes inscribirte en tu propio curso");
  }

  const existingEnrollment = await db['Enrollment'].findOne({
    where: { user_id: userId, course_id: courseId },
  });

  if (existingEnrollment) {
    throw new Error("Ya estás inscrito en este curso");
  }

  const enrollment = await db['Enrollment'].create({
    user_id: userId,
    course_id: courseId,
  });

  let notification = null;
  try {
    notification = await createNotification(
      userId,
      "Inscripción al curso",
      `Te has inscrito al curso "${course.title}" exitosamente.`
    );
  } catch (notifErr) {
    console.error("============================================");
    console.error("ERROR creating notification for enrollment:");
    console.error(notifErr);
    console.error("============================================");
  }

  return { enrollment, notification };
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

  const course = await db['Course'].findByPk(enrollment.course_id);

  await enrollment.destroy();

  let notification = null;
  if (course) {
    try {
      notification = await createNotification(
        userId,
        "Inscripción cancelada",
        `Has cancelado tu inscripción al curso "${course.title}".`
      );
    } catch (notifErr) {
      console.error("============================================");
      console.error("ERROR creating notification for cancellation:");
      console.error(notifErr);
      console.error("============================================");
    }
  }

  return { message: "Inscripción cancelada exitosamente", notification };
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
