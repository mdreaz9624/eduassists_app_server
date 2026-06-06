


// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { 
    getUserRoleByEmail, 
    getAllUsers, 
    updateUserRole, 
    deleteUser, 
    createNewUser 
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/", createNewUser);
router.get("/role/:email", getUserRoleByEmail);

// Explicitly maps endpoints to frontend structure
router.patch("/:id/role", updateUserRole); 
router.delete("/:id", deleteUser);

module.exports = router;