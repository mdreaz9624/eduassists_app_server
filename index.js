
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDatabase } = require("./config/database");

// Route Imports
const studyRoutes = require("./routes/studyRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Main App Base Route
app.get("/", (req, res) => {
    res.send("EduAssists Scalable Server Running");
});

// App Feature Endpoint Enforcers
app.use("/studyData", studyRoutes);
app.use("/users", userRoutes);

// Connect to Database first, then spin up Express web engine
connectDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`EduAssists API listening at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Server initialization halted due to database error.", err);
    });

module.exports = app;