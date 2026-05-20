const db = require("../models");
const { createNotification } = require("./notification.service");

/**
 * Creates a new request
 * @param {number} user_id - User ID
 * @param {string} type - 'become_teacher' or 'request_verification'
 * @param {string} message - Optional message from user
 */
const createRequest = async (user_id, type, message) => {
  return await db["Request"].create({
    user_id,
    type,
    message: message || null,
  });
};

/**
 * Gets all requests with user info
 */
const getAllRequests = async () => {
  return await db["Request"].findAll({
    include: [
      {
        model: db["User"],
        as: "user",
        attributes: { exclude: ["password"] },
      },
    ],
    order: [["status", "ASC"], ["createdAt", "DESC"]],
  });
};

/**
 * Gets pending requests with user info
 */
const getPendingRequests = async () => {
  return await db["Request"].findAll({
    where: { status: "pending" },
    include: [
      {
        model: db["User"],
        as: "user",
        attributes: { exclude: ["password"] },
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Gets requests by user
 */
const getRequestsByUser = async (user_id) => {
  return await db["Request"].findAll({
    where: { user_id },
    include: [
      {
        model: db["User"],
        as: "user",
        attributes: { exclude: ["password"] },
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Gets a single request by ID
 */
const getRequestById = async (id) => {
  return await db["Request"].findByPk(id);
};

/**
 * Approves or rejects a request and applies the change
 */
const reviewRequest = async (id, status, review_message, reviewed_by) => {
  const request = await db["Request"].findByPk(id);
  if (!request) {
    throw new Error("Solicitud no encontrada");
  }

  request.status = status;
  request.review_message = review_message || null;
  request.reviewed_by = reviewed_by;
  request.reviewed_at = new Date();

  // Apply the requested change if approved
  if (status === "approved") {
    const user = await db["User"].findByPk(request.user_id);
    if (user) {
      if (request.type === "become_teacher") {
        user.role = "COURSE_SUPPLIER";
      } else if (request.type === "request_verification") {
        user.verified = true;
      }
      await user.save();
    }
  }

  await request.save();

  try {
    const typeLabel = request.type === "become_teacher" ? "ser profesor" : "verificación";
    const notifTitle = status === "approved" ? "Solicitud aprobada" : "Solicitud rechazada";
    const notifMessage = status === "approved"
      ? `Tu solicitud para ${typeLabel} ha sido aprobada.`
      : `Tu solicitud para ${typeLabel} ha sido rechazada.${review_message ? ' Motivo: ' + review_message : ''}`;
    await createNotification(request.user_id, notifTitle, notifMessage);
  } catch (notifErr) {
    console.error("============================================");
    console.error("ERROR creating notification for request review:");
    console.error(notifErr);
    console.error("============================================");
  }

  return request;
};

module.exports = {
  createRequest,
  getAllRequests,
  getPendingRequests,
  getRequestsByUser,
  getRequestById,
  reviewRequest,
};
