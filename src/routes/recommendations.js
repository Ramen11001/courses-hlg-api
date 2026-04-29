const express = require("express");
const router = express.Router();
const recommendationService = require("../service/recommendation.service");
const authenticate = require("../middleware/authenticate");

/**
 * GET /recommendations
 * Get course recommendations for the authenticated user
 */
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const suggestions = await recommendationService.getCourseSuggestions(userId);
    res.json(suggestions);
  } catch (error) {
    console.error("Error getting recommendations:", error);
    res.status(500).json({ error: "Error al obtener recomendaciones" });
  }
});

module.exports = router;
