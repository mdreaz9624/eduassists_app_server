
// controllers/studyController.js
const { connectDatabase } = require("../config/database");

const getStudyData = async (req, res) => {
    try {
        const db = await connectDatabase();
        const result = await db.collection("studyData").find().toArray();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
};

const postStudyData = async (req, res) => {
    try {
        const db = await connectDatabase();
        const data = req.body;
        const result = await db.collection("studyData").insertOne(data);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = { getStudyData, postStudyData };