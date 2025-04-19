const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  console.log("Cookies Received:", req.cookies); // ✅ Debugging log

  if (!req.cookies || !req.cookies.token) {
    console.log("Unauthorized: No token provided.");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.log("Unauthorized: Invalid token.");
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateUser;


// const jwt = require("jsonwebtoken");

// const authenticateUser = (req, res, next) => {
//     console.log("Headers Received:", req.headers); // ✅ Debugging log
//     console.log("Cookies Received:", req.cookies); // ✅ Debugging log

//     let token = null;

//     // Check for token in Authorization header
//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
//         token = req.headers.authorization.split(" ")[1]; // Extract token after "Bearer "
//     } else if (req.cookies && req.cookies.token) {
//         // Check for token in cookies (fallback)
//         token = req.cookies.token;
//     }

//     if (!token) {
//         console.log("Unauthorized: No token provided.");
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.id; // Attach user ID to request object
//         next();
//     } catch (error) {
//         console.log("Unauthorized: Invalid token.");
//         return res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }
// };

// module.exports = authenticateUser;

