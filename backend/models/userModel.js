const db = require('../configue/db');
const bcrypt = require("bcryptjs");

class User {
    // Create a new user (User, Faculty, or Admin)
    static async createUser(name, email, password, role, phone = null, department = null, student_id = null, faculty_id = null) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO users (name, email, password, role, phone, department, student_id, faculty_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [name, email, hashedPassword, role, phone, department, student_id, faculty_id],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    // Find user by email (Login or forgot password)
    static async findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        });
    }

    // Find user by ID (Profile update or admin access)
    static async findUserById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        });
    }

    // Get all users (Admin)
    static async getAllUsers() {
        return new Promise((resolve, reject) => {
            db.query("SELECT id, name, email, role, phone, department, student_id, faculty_id FROM users", (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Update user profile (User)
    static async updateUser(id, name, email, phone = null, department = null) {
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE users SET name = ?, email = ?, phone = ?, department = ? WHERE id = ?",
                [name, email, phone, department, id],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    // Update user role (Admin)
    static async updateUserRole(id, role) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE users SET role = ? WHERE id = ?", [role, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Delete user (Admin)
    static async deleteUser(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = User;