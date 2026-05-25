// config/database.js
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rbujavm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let dbInstance = null;

async function connectDatabase() {
    if (dbInstance) return dbInstance; // Return existing pool if already connected
    
    try {
        await client.connect();
        dbInstance = client.db("eduAssistsDB");
        console.log("Database connected smoothly!");
        return dbInstance;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

module.exports = { connectDatabase };