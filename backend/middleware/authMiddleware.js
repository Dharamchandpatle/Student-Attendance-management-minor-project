const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated (User, Faculty, Admin)
const protect = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: "You are not authorized to access this route" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
        req.user = decoded; // decoded contains the user id, email, and role
        next();
    } catch (err) {
        return res.status(401).json({ message: "You are not authorized to access this route" });
    }
};

// Middleware to check if user is admin (Admin only)
const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to access this route" });
    }
    next();
};

module.exports = { protect, adminOnly };