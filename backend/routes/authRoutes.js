const express = require("express");
const cors = require("cors");
const authController = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes for ---- users and ---- Admin 
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);


// Protected routes (User ke liye)
router.put("/profile", protect, authController.updateUserProfile);


// Admin-only routes (Sirf Admin ke liye)
// router.get("/users", protect, adminOnly, authController.getAllUsers);
router.get("/users", authController.getAllUsers);
router.get("/users/:id", protect, adminOnly, authController.getSingleUser);
router.put("/users/:id/role", protect, adminOnly, authController.updateUserRole);
router.delete("/users/:id",  authController.deleteUser);
// router.delete("/users/:id", protect, adminOnly, authController.deleteUser);
module.exports = router ;
