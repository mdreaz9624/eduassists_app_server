//main version 

// const express = require('express')
// require('dotenv').config()
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');



// const app = express()
// const port = process.env.PORT || 3000



// // Middleware
// app.use(cors());
// app.use(express.json());
// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-dpd64pq-shard-00-00.rbujavm.mongodb.net:27017,ac-dpd64pq-shard-00-01.rbujavm.mongodb.net:27017,ac-dpd64pq-shard-00-02.rbujavm.mongodb.net:27017/?ssl=true&replicaSet=atlas-x7k3ap-shard-0&authSource=admin&appName=Cluster0&retryWrites=true&w=majority`;

// // console.log(process.env.DB_USER);
// // console.log(process.env.DB_PASSWORD);

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     const database = client.db('eduAssistsDB');
//     const universityDataCollection = database.collection('studyData');
//     const usersCollection = database.collection('users');
  

//     // university info api
//     app.get('/studyData', async (req, res) => {
//       const result = await universityDataCollection.find().toArray();
//       res.send(result);
//     });


//     app.post('/studyData', async (req, res) => {
//       studyData = req.body;
//       console.log(studyData);
//       const result = await universityDataCollection.insertOne(studyData);
//       res.send(result);
//     });

//     // users api
//     app.get('/users', async (req, res) => {
//       const result = await usersCollection.find().toArray();
//       res.send(result);
//     });

//     app.post('/users', async (req, res) => {
//       const userData = req.body;
//       console.log(userData);
//       const result = await usersCollection.insertOne(userData);
//       res.send(result);
//     });

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);



// app.get('/', (req, res) => {
//   res.send('EduAssists Server is running!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



//version 2

// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection (only when needed, not at startup)
// let client = null;
// let dbConnected = false;

// async function connectToMongo() {
//   if (dbConnected && client) {
//     return client;
//   }

//   const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-dpd64pq-shard-00-00.rbujavm.mongodb.net:27017,ac-dpd64pq-shard-00-01.rbujavm.mongodb.net:27017,ac-dpd64pq-shard-00-02.rbujavm.mongodb.net:27017/?ssl=true&replicaSet=atlas-x7k3ap-shard-0&authSource=admin&appName=Cluster0&retryWrites=true&w=majority`;

//   client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });

//   await client.connect();
//   dbConnected = true;
//   return client;
// }

// // Routes
// app.get('/', (req, res) => {
//   res.send('EduAssists Server is running!');
// });

// // Get all study data
// app.get('/studyData', async (req, res) => {
//   try {
//     const mongoClient = await connectToMongo();
//     const database = mongoClient.db('eduAssistsDB');
//     const universityDataCollection = database.collection('studyData');
//     const result = await universityDataCollection.find().toArray();
//     res.send(result);
//   } catch (error) {
//     console.error('Error fetching study data:', error);
//     res.status(500).send({ error: 'Failed to fetch data' });
//   }
// });

// // Post study data
// app.post('/studyData', async (req, res) => {
//   try {
//     const mongoClient = await connectToMongo();
//     const database = mongoClient.db('eduAssistsDB');
//     const universityDataCollection = database.collection('studyData');
//     const studyData = req.body;
//     console.log(studyData);
//     const result = await universityDataCollection.insertOne(studyData);
//     res.send(result);
//   } catch (error) {
//     console.error('Error posting study data:', error);
//     res.status(500).send({ error: 'Failed to post data' });
//   }
// });


// // Get all users
// app.get('/users', async (req, res) => {
//   try {
//     const mongoClient = await connectToMongo();
//     const database = mongoClient.db('eduAssistsDB');
//     const usersCollection = database.collection('users');
//     const result = await usersCollection.find().toArray();
//     res.send(result);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).send({ error: 'Failed to fetch users' });
//   }
// });

// // Post users
// app.post('/users', async (req, res) => {
//   try {
//     const mongoClient = await connectToMongo();
//     const database = mongoClient.db('eduAssistsDB');
//     const usersCollection = database.collection('users');
//     const userData = req.body;
//     console.log(userData);
//     // Check existing user
//     const existingUser = await usersCollection.findOne({
//       email: userData.email
//     });

//     if (existingUser) {

//       return res.send({
//         message: 'User already exists',
//         inserted: false
//       });

//     }
//     const result = await usersCollection.insertOne(userData);
//     res.send(result);
//   } catch (error) {
//     console.error('Error posting user data:', error);
//     res.status(500).send({ error: 'Failed to post data' });
//   }
// });

// //user delete api

// app.delete('/users/:id', async (req, res) => {

//   const id = req.params.id;

//   const query = {
//     _id: new ObjectId(id)
//   };

//   const result = await usersCollection.deleteOne(query);

//   res.send(result);

// });





// // For Vercel serverless function
// module.exports = app;

// // Only listen if running locally
// if (process.env.NODE_ENV !== 'production') {
//   const port = process.env.PORT || 3000;
//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
// }


//another version with better error handling and connection management

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());


// =========================
// MongoDB URI
// =========================

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rbujavm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// =========================
// MongoDB Client
// =========================

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});


// =========================
// Connect DB Function
// =========================

async function connectDB() {

    try {

        await client.connect();

        return client.db("eduAssistsDB");

    } catch (error) {

        console.log(error);

    }

}


// =========================
// ROOT
// =========================

app.get("/", (req, res) => {

    res.send("EduAssists Server Running");

});


// =========================
// GET STUDY DATA
// =========================

app.get("/studyData", async (req, res) => {

    try {

        const db = await connectDB();

        const studyDataCollection = db.collection("studyData");

        const result = await studyDataCollection.find().toArray();

        res.send(result);

    } catch (error) {

        console.log(error);

        res.status(500).send({
            success: false,
            message: error.message
        });

    }

});


// =========================
// POST STUDY DATA
// =========================

app.post("/studyData", async (req, res) => {

    try {

        const db = await connectDB();

        const studyDataCollection = db.collection("studyData");

        const data = req.body;

        const result = await studyDataCollection.insertOne(data);

        res.send(result);

    } catch (error) {

        console.log(error);

        res.status(500).send({
            success: false,
            message: error.message
        });

    }

});


// =========================
// GET USERS
// =========================

app.get("/users", async (req, res) => {

    try {

        const db = await connectDB();

        const usersCollection = db.collection("users");

        const result = await usersCollection.find().toArray();

        res.send(result);

    } catch (error) {

        console.log(error);

        res.status(500).send({
            success: false,
            message: error.message
        });

    }

});


// =========================
// POST USERS
// =========================

app.post("/users", async (req, res) => {

    try {

        const db = await connectDB();

        const usersCollection = db.collection("users");

        const userData = req.body;

        const existingUser = await usersCollection.findOne({
            email: userData.email
        });

        if (existingUser) {

            return res.send({
                success: false,
                inserted: false,
                message: "User already exists"
            });

        }

        const result = await usersCollection.insertOne(userData);

        res.send({
            success: true,
            inserted: true,
            insertedId: result.insertedId
        });

    } catch (error) {

        console.log(error);

        res.status(500).send({
            success: false,
            message: error.message
        });

    }

});


// =========================
// EXPORT
// =========================

module.exports = app;