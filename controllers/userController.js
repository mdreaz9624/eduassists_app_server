
// controllers/userController.js
const { connectDatabase } = require("../config/database");
const { ObjectId } = require("mongodb");
const admin = require("firebase-admin");




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

// FIX: Dynamic role updater matching frontend payload
const updateUserRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { role } = req.body; // Extract new role sent by frontend

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: { role: role } };

        const db = await connectDatabase();
        const result = await db.collection("users").updateOne(filter, updateDoc);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
};



const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };

        const db = await connectDatabase();
        const usersCollection = db.collection("users");

        // 1. Find the target user in MongoDB first to get their email or UID
        const targetUser = await usersCollection.findOne(filter);

        if (!targetUser) {
            return res.status(404).send({ success: false, message: "User not found in database" });
        }

        // 2. Delete from Firebase Authentication using their email
        try {
            const firebaseUser = await admin.auth().getUserByEmail(targetUser.email);
            await admin.auth().deleteUser(firebaseUser.uid);
            console.log(`Successfully deleted user ${targetUser.email} from Firebase Auth`);
        } catch (firebaseError) {
            // If the user doesn't exist in Firebase but exists in MongoDB, catch it so the code doesn't crash
            console.log("Firebase deletion skipped or user not found in Auth:", firebaseError.message);
        }

        // 3. Delete from MongoDB Database
        const result = await usersCollection.deleteOne(filter);
        res.send(result);

    } catch (error) {
        console.error("Global delete routine error:", error);
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

module.exports = { getUserRoleByEmail, getAllUsers, updateUserRole, deleteUser, createNewUser };