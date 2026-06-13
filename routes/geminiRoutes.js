

const express = require('express');
const router = express.Router();
const { chatWithEduAssistsAI } = require('../controllers/geminiController');

// This creates the /api/gemini/chat endpoint
router.post('/chat', chatWithEduAssistsAI);

// Add a test route to verify it's working
router.get('/test', (req, res) => {
    res.json({ message: "Gemini API route is working!" });
});

module.exports = router;