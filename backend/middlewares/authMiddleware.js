const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    if (!userId || !decoded.role) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = { _id: userId, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    req.admin = req.user;
    return next();
  }
  return res.status(403).json({ message: "Access denied. Admins only." });
};

module.exports = { authMiddleware, adminMiddleware };
