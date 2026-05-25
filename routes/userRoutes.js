// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { 
    getUserRoleByEmail, 
    getAllUsers, 
    promoteToAdmin, 
    createNewUser 
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/", createNewUser);
router.get("/role/:email", getUserRoleByEmail);
router.patch("/admin/:id", promoteToAdmin);

module.exports = router;