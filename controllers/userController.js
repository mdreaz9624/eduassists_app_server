// controllers/userController.js
const { connectDatabase } = require("../config/database");
const { ObjectId } = require("mongodb");

const getUserRoleByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const db = await connectDatabase();
        const user = await db.collection("users").findOne({ email });
        res.send({ role: user?.role || "student" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const db = await connectDatabase();
        const result = await db.collection("users").find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const promoteToAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: { role: 'admin' } };

        const db = await connectDatabase();
        const result = await db.collection("users").updateOne(filter, updateDoc);
        res.send(result);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const createNewUser = async (req, res) => {
    try {
        const userData = req.body;
        const db = await connectDatabase();
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email: userData.email });
        if (existingUser) {
            return res.send({ success: false, inserted: false, message: "User already exists" });
        }

        const result = await usersCollection.insertOne(userData);
        res.send({ success: true, inserted: true, insertedId: result.insertedId });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = { getUserRoleByEmail, getAllUsers, promoteToAdmin, createNewUser };