// config/database.js

const { MongoClient, ServerApiVersion } = require("mongodb");
const admin = require("firebase-admin");
const path = require("path");

require("dotenv").config();


// Initialize Firebase Admin SDK
const serviceAccount = require(path.join(__dirname, "../firebase-service-account.json"));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin SDK Initialized!");
}


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