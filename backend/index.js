// const express = require('express');
// const connectToDatabase = require('./db'); // Adjust path as necessary

// const app = express();
// const port = process.env.PORT || 3000;
// console.log(process.env)
// // Connect to MongoDB
// connectToDatabase();

// // Middleware and routes setup
// app.use(express.json());

// // Example route
// app.get('/', (req, res) => {
//     console.log("send request", req)
//   res.send('Hello World');
// });
// app.get(`/getuser`, async (req, res) => {
//   try {
//     const db = connectToDatabase(); // Get the database instance
//     const collection = db.collection('ragister_user'); // Replace with your collection name
//     const users = await collection.find().toArray(); // Fetch all documents
//     res.json(users); // Send the documents as a JSON response
//     console.log("get user", users)
// } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching users');
// }
  
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const cors = require('cors'); // Import the cors package
const { connectToDatabase, getDb } = require('./db'); // Adjust path as necessary

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectToDatabase().catch(console.error);


// Middleware and routes setup
app.use(express.json());

// Enable CORS for all routes
app.use(cors());
// Example route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/getuser', async (req, res) => {
  // res.set('Cache-Control', 'no-store'); // Or 'no-cache'
    try {
        const db = getDb(); // Get the database instance
        const collection = db.collection('ragister_user'); 
        const users = await collection.find().toArray(); // Fetch all documents
        res.json(users);
        console.log("get user", users)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
