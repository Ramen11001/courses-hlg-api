require('dotenv').config();
const db = require('./src/models');
const notificationService = require('./src/service/notification.service');

async function processCourseNotifications() {
  try {
    await db.sequelize.authenticate();
    console.log('Starting course notification process...');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    console.log(`Today: ${todayStr}, Tomorrow: ${tomorrowStr}`);

    // 1. Notify enrolled users about courses starting tomorrow
    const coursesStartingTomorrow = await db['Course'].findAll({
      include: [
        {
          model: db['Duration'],
          as: 'duration',
          where: {
            init_date: {
              [db.Sequelize.Op.eq]: tomorrowStr,
            },
          },
        },
        {
          model: db['Enrollment'],
          as: 'enrollments',
          include: [
            {
              model: db['User'],
              as: 'user',
              attributes: ['id', 'firstName', 'email'],
            },
          ],
        },
      ],
    });

    console.log(`Found ${coursesStartingTomorrow.length} courses starting tomorrow`);

    for (const course of coursesStartingTomorrow) {
      if (course.enrollments && course.enrollments.length > 0) {
        const userIds = course.enrollments.map(e => e.user_id);
        const title = 'Curso por comenzar';
        const message = `El curso "${course.title}" comienza mañana. ¡Estás inscrito!`;
        
        await notificationService.createBulkNotifications(userIds, title, message);
        console.log(`Notified ${userIds.length} users about course: ${course.title}`);
      }
    }

    // 2. Delete courses that start today and notify the owner
    const coursesStartingToday = await db['Course'].findAll({
      include: [
        {
          model: db['Duration'],
          as: 'duration',
          where: {
            init_date: {
              [db.Sequelize.Op.eq]: todayStr,
            },
          },
        },
        {
          model: db['User'],
          as: 'user',
          attributes: ['id', 'firstName', 'email'],
        },
      ],
    });

    console.log(`Found ${coursesStartingToday.length} courses starting today`);

    for (const course of coursesStartingToday) {
      const ownerId = course.user_id;
      const courseTitle = course.title;

      // Delete enrollments first (cascade should handle this, but just in case)
      await db['Enrollment'].destroy({
        where: { course_id: course.id },
      });

      // Delete the course
      await course.destroy();
      console.log(`Deleted course: ${courseTitle}`);

      // Notify the course owner
      await notificationService.createNotification(
        ownerId,
        'Curso eliminado',
        `Tu curso "${courseTitle}" ha sido eliminado automáticamente ya que ha alcanzado su fecha de inicio.`
      );
      console.log(`Notified owner about course deletion: ${courseTitle}`);
    }

    console.log('Course notification process completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error in course notification process:', error);
    process.exit(1);
  }
}

processCourseNotifications();
