const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes (User, Faculty, Admin)
router.post("/register", authController.register); // For all roles
router.post("/login", authController.login); // For all roles
router.post("/logout", authController.logout); // For all roles
router.post("/forgot-password", authController.forgotPassword); // For User

// Protected routes (User, Faculty)
router.put("/profile", protect, authController.updateUserProfile); // For User, Faculty

// Admin-only routes (Admin)
// router.get("/users", protect, adminOnly, authController.getAllUsers); // Admin only
router.get("/users", authController.getAllUsers); // Admin only
router.get("/users/:id", protect, adminOnly, authController.getSingleUser); // Admin only
router.put("/users/:id/role", protect, adminOnly, authController.updateUserRole); // Admin only
router.delete("/users/:id", protect, adminOnly, authController.deleteUser); // Admin only

module.exports = router;