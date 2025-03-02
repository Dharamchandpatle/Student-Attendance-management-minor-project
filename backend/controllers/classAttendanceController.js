const ClassAttendance = require("../models/classAttendanceModel");


// Create a new attendance record -- Admin and authorized user 
exports.createAttendance = async (req , res)=>{
    const { user_id , class_date , status} = req.body ;

    try{

        const result = await ClassAttendance.createAttendance(user_id , class_date , status);
        res.status(201).json({
            message: "Attendance record created successfully",
            data: result,
        })
    }catch(err){
        res.status(500).json({ message: "Error recording attendance", error })
    }
};


// Get attendance by user id -- Admin and authorized user
exports.getAttendanceByUser = async (req , res)=>{
    const {user_id} = req.params ;

    try {
        
        const attendance = await ClassAttendance.getAttendanceByUser(user_id);  
        res.status(200).json({
            message: "Attendance record fetched successfully",
            data: attendance,
        })
    } catch (err) {
        res.status(500).json({ message: "Error fetching attendance record", error })
        
    }
}

// Get all attendance (Admin only)
exports.getAllAttendance = async (req , res )=>{
    try{
        const attendance = await ClassAttendance.getAllAttendance();
        res.status(200).json({
            message: "Attendance records fetched successfully",
            data: attendance,
        })

    }catch(err){
        res.status(500).json({ message: "Error fetching attendance records", error })
    }
}

// Update attendance record (Admin only)
exports.updateAttendance = async (req , res)=>{
    const { id } = req.params ;
    const { status } = req.body ;

    try{
        const result = await ClassAttendance.updateAttendance(id , status);
        res.status(200).json({
            message: "Attendance record updated successfully",
            data: result,
        })
    }catch(err){
        res.status(500).json({ message: "Error updating attendance record", error })
    }
}

// Delete attendance record (Admin only)
exports.deleteAttendance = async (req , res)=>{
    const { id } = req.params ;

    try{
        const result = await ClassAttendance.deleteAttendance(id);
        res.status(200).json({
            message: "Attendance record deleted successfully",
            data: result,
        })
    }catch(err){
        res.status(500).json({ message: "Error deleting attendance record", error })
    }
}


module.exports = exports ;
