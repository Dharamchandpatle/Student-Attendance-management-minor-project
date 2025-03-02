const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./../configue/db");
require("dotenv").config();


// Register user -----(Amin or user )
exports.register = (req, res) => {
    const { name, email, password, role } = req.body;
  
    // Validate email domain
    if (!email.endsWith("@ietdavv.edu.in")) {
      return res.status(400).json({ message: "Only @ietdavv.edu.in emails are allowed." });
    }
  
    // Hash the password before storing it
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }
  
      const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(query, [name, email, hash, role], (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Error creating user", error });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  };


// login user for ----admin and user
exports.login = (req, res) => {
    const { email, password } = req.body;
  
    // Validate email domain
    if (!email.endsWith("@ietdavv.edu.in")) {
      return res.status(400).json({ message: "Only @ietdavv.edu.in emails are allowed." });
    }
  
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Database error", error });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const user = results[0];
  // i am doing comparision of password here
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
  
        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, "your_secret_key", {
          expiresIn: "1h",
        });
  
        res.status(200).json({ message: "Login successful", token });
      });
    });
  };

// Get all users (----- Admin )
exports.getAllUsers = async (req , res )=>{
  try{
    const users = await User.getAllUsers();
    res.status(200).json({
      message: "All users",
      users
    });

  }catch(err){
    res.status(500).json({
      message: "Server error",
      error: err.message
    })
  }
}

// Get user by ID (----- Admin )
exports.getSingleUser = async(req , res) =>{
  try {
    const user = await User.findUserById(req.params.id);
    if(!user){
      return res.status(404).json({
        message: "User not found"

      })
    }

   res.status(200).json(user);

  }catch(err){
    res.status(500).json({
      message: "Server error",
      error: err.message
    })
  }
}

// Update User Role for ---- Admin 
exports.updateUserRole = async(req , res)=>{
    const {id} = req.params;
    const {role} = req.body ;

    try {
      await User.updateUserRole(id , role );
      res.status(200).json({
        message : "User role updated successfully"
      })

  } catch (err) {
    res.status(500).json({
      message: "Error updating role",
      error: err.message
    })
  }
}

// Update user profile (------ User )
exports.updateUserProfile = async(req , res)=>{
  const {id} = req.params;
  const {name , email} = req.body;

  try {
    await User.updateUser(id , name , email);
    res.status(200).json({
      message : "User profile updated successfully"
    })

} catch (err) {
  res.status(500).json({
    message: "Error updating profile",
    error: err.message
  })
}
}

// Delete user (----Admin )
exports.deleteUser = async(req , res)=>{
  const {id} = req.params;

  try {
    await User.deleteUser(id);
    res.status(200).json({
      message : "User deleted successfully"
    })

} catch (err) {
  res.status(500).json({
    message: "Error deleting user",
    error: err.message
  })
}
}

// logout user
exports.logout = (req , res)=>{
  // cliet side token ko delete krna hoga , server stateless hai 
  res.status(200).json({
    message : "User logged out successfully"
  })
}

// forgot password for ------user 
exports.forgotPassword = async(req , rs )=>{
  const {email} = req.body ;
  try {
    const user = await User.findUserByEmail(email);
    if(!user){
      return res.status(404).json({
        message : "User not found"
      })

      // add logic for sending email to user for reset password
      res.status(200).json({
        message : "Password reset email sent"
      })
    }
  }
  catch(err){
    res.status(500).json({
      message : "Server error",
      error : err.message
    })
  }
}