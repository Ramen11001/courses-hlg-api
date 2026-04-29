const db = require("../models");
const { Op, QueryTypes } = require("sequelize");

/**
 * Get all notifications for a user
 * @param {number} userId - User ID
 * @returns {Promise<Array>} - List of notifications
 */
const getUserNotifications = async (userId) => {
  try {
    const notifications = await db.sequelize.query(
      'SELECT id, title, message, viewed, user_id, "createdAt", "updatedAt" FROM notifications WHERE user_id = ? ORDER BY "createdAt" DESC',
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
    return notifications;
  } catch (error) {
    console.error('Error in getUserNotifications:', error);
    return [];
  }
};

/**
 * Create a new notification
 * @param {number} userId - User ID
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @returns {Promise<object>} - Created notification
 */
const createNotification = async (userId, title, message) => {
  return await db["Notification"].create({
    user_id: userId,
    title,
    message,
    viewed: false,
  });
};

/**
 * Mark notification as viewed
 * @param {number} notificationId - Notification ID
 * @param {number} userId - User ID for validation
 * @returns {Promise<object|null>} - Updated notification or null
 */
const markAsViewed = async (notificationId, userId) => {
  const notification = await db["Notification"].findOne({
    where: { id: notificationId, user_id: userId },
  });

  if (!notification) return null;

  await notification.update({ viewed: true });
  return notification;
};

/**
 * Delete a notification
 * @param {number} notificationId - Notification ID
 * @param {number} userId - User ID for validation
 * @returns {Promise<boolean>} - True if deleted
 */
const deleteNotification = async (notificationId, userId) => {
  const result = await db["Notification"].destroy({
    where: { id: notificationId, user_id: userId },
  });
  return result > 0;
};

/**
 * Generate course start notifications for enrolled users
 * @returns {Promise<number>} - Number of notifications created
 */
const generateCourseStartNotifications = async () => {
  const today = new Date();
  const threeDaysFromNow = new Date(today);
  threeDaysFromNow.setDate(today.getDate() + 3);

  const courses = await db["Course"].findAll({
    where: {
      start_date: {
        [Op.between]: [today, threeDaysFromNow],
      },
    },
    include: [
      {
        model: db["Enrollment"],
        as: "enrollments",
        include: [
          {
            model: db["User"],
            as: "user",
          },
        ],
      },
    ],
  });

  let notificationsCreated = 0;

  for (const course of courses) {
    if (course.enrollments && course.enrollments.length > 0) {
      for (const enrollment of course.enrollments) {
        const user = enrollment.user;
        if (user) {
          const existingNotification = await db["Notification"].findOne({
            where: {
              user_id: user.id,
              message: { [Op.like]: `%${course.title}%` },
            },
          });

          if (!existingNotification) {
            await createNotification(
              user.id,
              "Curso por iniciar",
              `El curso "${course.title}" está por iniciar. Si desea inscribirse, póngase en contacto con el profesor.`
            );
            notificationsCreated++;
          }
        }
      }
    }
  }

  return notificationsCreated;
};

module.exports = {
  getUserNotifications,
  createNotification,
  markAsViewed,
  deleteNotification,
  generateCourseStartNotifications,
};
