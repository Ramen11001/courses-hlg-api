const requestCounts = new Map();

const rateLimiter = (maxRequests, windowMs) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, []);
    }

    const timestamps = requestCounts.get(ip).filter(ts => now - ts < windowMs);

    if (timestamps.length >= maxRequests) {
      return res.status(429).json({ error: "Demasiados intentos. Intenta de nuevo en un minuto." });
    }

    timestamps.push(now);
    requestCounts.set(ip, timestamps);
    next();
  };
};

module.exports = rateLimiter;
