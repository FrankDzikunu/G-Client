const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization header:", authHeader); // Debugging

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing or malformed.");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token); // Debugging

  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Ensure the decoded token has the required fields
    if (!decoded.userId || !decoded.role) {
      console.log("Token is missing required fields (userId or role).");
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = { userId: decoded.userId, role: decoded.role }; 

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied. Admins only." });
};

module.exports = { authMiddleware, adminMiddleware };
