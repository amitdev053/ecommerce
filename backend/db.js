// const mongoose = require('mongoose');
// require('dotenv').config()

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     // console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB', error);
//   }
// };

// module.exports = connectToDatabase;


const { MongoClient } = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGO_URI; // Update with your MongoDB connection string
let client;

async function connectToDatabase() {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    // console.log('Connected to MongoDB');
}

function getDb() {
    return client.db('User'); // Update with your database name
}

module.exports = { connectToDatabase, getDb };