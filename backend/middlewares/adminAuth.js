const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.cookies.token;
  console.log('token',token)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // Ensure the user has an admin role
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    req.user = decoded.id; // Add decoded data to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Export the middleware
module.exports = isAdmin;
