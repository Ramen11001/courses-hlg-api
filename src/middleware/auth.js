const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";

/**
 * Middleware to validate the token on private paths.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * prevents unauthenticated users from modifying, creating, or deleting sensitive data in the API.
 */
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; //Extract Header Token

  if (!token) {
    return res.status(403).json({ error: "Acceso denegado: No autenticado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Save user info in the request
    next();
  } catch (error) {
    //server understands the request but refuses to authorize it 
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

module.exports = authenticate;
