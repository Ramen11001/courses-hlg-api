const db = require("../models");

/**
 * Simple course recommendation using weighted feature similarity
 * This acts as a basic linear regression model where weights are manually tuned
 */
const getCourseSuggestions = async (userId) => {
  try {
    // 1. Get courses the user is enrolled in
    const enrollments = await db["Enrollment"].findAll({
      where: { user_id: userId },
      include: [
        {
          model: db["Course"],
          as: "course",
          include: ["comments"],
        },
      ],
    });

    if (!enrollments || enrollments.length === 0) {
      // If no enrollments, return popular courses (high rating)
      return await getPopularCourses();
    }

    // 2. Extract features from enrolled courses
    const userCourses = enrollments.map((enrollment) => enrollment.course).filter((course) => course);
    const userAreas = [...new Set(userCourses.map((course) => course.area))];
    const userLevels = [...new Set(userCourses.map((course) => course.level))];
    const avgUserCost = userCourses.reduce((sum, course) => sum + (course.cost || 0), 0) / userCourses.length;

    // 3. Get all courses except those user is enrolled in
    const enrolledCourseIds = userCourses.map((course) => course.id);
    const allCourses = await db["Course"].findAll({
      where: {
        id: { [db.Sequelize.Op.notIn]: enrolledCourseIds },
      },
      include: ["comments"],
    });

    // 4. Calculate similarity score for each course (simple weighted sum - acts as linear regression)
    const scoredCourses = allCourses.map((course) => {
      let score = 0;

      // Area match (weight: 3)
      if (userAreas.includes(course.area)) {
        score += 3;
      }

      // Level match (weight: 2)
      if (userLevels.includes(course.level)) {
        score += 2;
      }

      // Cost similarity (weight: 1.5, normalized)
      const costDiff = Math.abs((course.cost || 0) - avgUserCost);
      const maxCost = 1000; // Assuming max cost
      const costScore = Math.max(0, 1 - costDiff / maxCost);
      score += 1.5 * costScore;

      // Certificate bonus (weight: 1)
      if (course.certificate) {
        score += 1;
      }

      // Mode preference (simplified: give slight preference to same mode)
      const userModes = [...new Set(userCourses.map((course) => course.mode))];
      if (userModes.includes(course.mode)) {
        score += 0.5;
      }

      // Average rating bonus (from comments)
      if (course.comments && course.comments.length > 0) {
        const ratings = course.comments
          .map((comment) => comment.rating)
          .filter((rating) => rating != null);
        if (ratings.length > 0) {
          const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
          score += avgRating * 0.5; // Weight: 0.5 per rating point
        }
      }

      return { course, score };
    });

    // 5. Sort by score and return top 5
    scoredCourses.sort((a, b) => b.score - a.score);
    return scoredCourses.slice(0, 5).map((item) => item.course);
  } catch (error) {
    console.error("Error in getCourseSuggestions:", error);
    return [];
  }
};

/**
 * Get popular courses (fallback when user has no enrollments)
 */
const getPopularCourses = async () => {
  const courses = await db["Course"].findAll({
    include: ["comments"],
  });

  const coursesWithRating = courses.map((course) => {
    const ratings = (course.comments || [])
      .map((comment) => comment.rating)
      .filter((rating) => rating != null);
    const avgRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
    return { course, avgRating };
  });

  coursesWithRating.sort((a, b) => b.avgRating - a.avgRating);
  return coursesWithRating.slice(0, 5).map((scored) => scored.course);
};

module.exports = { getCourseSuggestions };
