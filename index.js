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


//new version


const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rbujavm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let universityDataCollection;

async function connectDB() {

  try {

    await client.connect();

    console.log("MongoDB Connected");

    const database = client.db('eduAssistsDB');

    universityDataCollection = database.collection('studyData');

  } catch (error) {

    console.log(error);

  }

}

connectDB();


// Root Route
app.get('/', (req, res) => {

  res.send('EduAssists Server Running');

});


// GET DATA
app.get('/studyData', async (req, res) => {

  try {

    const result = await universityDataCollection.find().toArray();

    res.send(result);

  } catch (error) {

    res.status(500).send(error);

  }

});


module.exports = app;