const express = require("express");
const router = express.Router();
const notificationService = require("../service/notification.service");
const authenticate = require("../middleware/authenticate");

/**
 * GET /notifications
 * Get all notifications for the authenticated user
 */
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await notificationService.getUserNotifications(userId);
    res.json(notifications);
  } catch (error) {
    console.error("Error getting notifications:", error);
    res.status(500).json({ error: "Error al obtener notificaciones" });
  }
});

/**
 * PUT /notifications/:id/viewed
 * Mark a notification as viewed
 */
router.put("/:id/viewed", authenticate, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;

    const notification = await notificationService.markAsViewed(notificationId, userId);
    if (!notification) {
      return res.status(404).json({ error: "Notificación no encontrada" });
    }

    res.json(notification);
  } catch (error) {
    console.error("Error marking notification as viewed:", error);
    res.status(500).json({ error: "Error al actualizar notificación" });
  }
});

/**
 * DELETE /notifications/:id
 * Delete a notification
 */
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;

    const deleted = await notificationService.deleteNotification(notificationId, userId);
    if (!deleted) {
      return res.status(404).json({ error: "Notificación no encontrada" });
    }

    res.json({ message: "Notificación eliminada" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Error al eliminar notificación" });
  }
});

/**
 * POST /notifications/generate
 * Generate course start notifications
 */
router.post("/generate", async (req, res) => {
  try {
    const count = await notificationService.generateCourseStartNotifications();
    res.json({ message: `Se generaron ${count} notificaciones` });
  } catch (error) {
    console.error("Error generating notifications:", error);
    res.status(500).json({ error: "Error al generar notificaciones" });
  }
});



module.exports = router;
