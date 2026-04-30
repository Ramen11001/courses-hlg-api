var express = require("express");
var router = express.Router();
const requestService = require("../service/request.service");
const authenticate = require("../middleware/authenticate");
const { validationResult } = require("express-validator");

// Create a new request (any authenticated user)
router.post("/", authenticate, async (req, res) => {
  try {
    const { type, message } = req.body;

    if (!type || !["become_teacher", "request_verification"].includes(type)) {
      return res.status(400).json({
        error: "Tipo de solicitud inválido. Use 'become_teacher' o 'request_verification'",
      });
    }

    const existingPending = await requestService.getRequestsByUser(req.user.id);
    const hasPending = existingPending.some((r) => r.status === "pending");
    if (hasPending) {
      return res.status(400).json({
        error: "Ya tienes una solicitud pendiente",
      });
    }

    const newRequest = await requestService.createRequest(
      req.user.id,
      type,
      message
    );

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "Error al crear la solicitud" });
  }
});

// Get all requests (admin only)
router.get("/", authenticate, async (req, res) => {
  try {
    if (
      req.user.role !== "ADMINISTRADOR" &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const requests = await requestService.getAllRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener solicitudes" });
  }
});

// Get pending requests (admin only)
router.get("/pending", authenticate, async (req, res) => {
  try {
    if (
      req.user.role !== "ADMINISTRADOR" &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const requests = await requestService.getPendingRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener solicitudes pendientes" });
  }
});

// Get requests for current user
router.get("/my-requests", authenticate, async (req, res) => {
  try {
    const requests = await requestService.getRequestsByUser(req.user.id);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tus solicitudes" });
  }
});

// Review a request (approve/reject) - admin only
router.put("/:id/review", authenticate, async (req, res) => {
  try {
    if (
      req.user.role !== "ADMINISTRADOR" &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const { status, review_message } = req.body;
    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        error: "Estado inválido. Use 'approved' o 'rejected'",
      });
    }

    const reviewedRequest = await requestService.reviewRequest(
      req.params.id,
      status,
      review_message,
      req.user.id
    );

    res.json(reviewedRequest);
  } catch (error) {
    if (error.message === "Solicitud no encontrada") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Error al revisar la solicitud" });
  }
});

module.exports = router;
