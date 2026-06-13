const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat with EduAssists AI
const chatWithEduAssistsAI = async (req, res) => {
    try {
        const { message, history = [] } = req.body;
        
        // Get the model (using free tier - gemini-1.5-flash)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Create a specialized prompt for EduAssists
        const systemPrompt = `You are EduAssists AI, a professional study abroad advisor. 
        Your role is to help students with:
        - University admissions in UK, USA, Australia, Canada, Germany
        - Scholarship information and applications
        - Student visa requirements and processes
        - Course selection based on career goals
        - English proficiency tests (IELTS, TOEFL, PTE)
        - Application deadlines and documentation
        - Cost of living and tuition fees
        
        Be friendly, professional, and encouraging. 
        Keep responses concise but informative (2-3 paragraphs maximum).
        If you don't know something, suggest booking a free consultation.
        
        Current conversation context: ${history.length} previous messages.`;
        
        // Prepare the chat history
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }]
                },
                {
                    role: "model",
                    parts: [{ text: "I understand. I'm ready to help students with their study abroad questions." }]
                },
                ...history.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.content }]
                }))
            ],
            generationConfig: {
                maxOutputTokens: 500, // Limit response length for free tier
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
            },
        });
        
        // Send the message
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        
        res.json({ 
            success: true, 
            reply: text,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ 
            success: false, 
            error: error.message,
            reply: "I'm having trouble connecting right now. Please try again or contact our support team directly at office@eduassists.com"
        });
    }
};

// Test the API connection
const testGeminiConnection = async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        
        res.json({ 
            success: true, 
            message: "Gemini API is working!",
            response: response.text()
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { chatWithEduAssistsAI, testGeminiConnection };