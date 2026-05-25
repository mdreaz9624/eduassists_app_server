// routes/studyRoutes.js
const express = require("express");
const router = express.Router();
const { getStudyData, postStudyData } = require("../controllers/studyController");

router.get("/", getStudyData);
router.post("/", postStudyData);

module.exports = router;