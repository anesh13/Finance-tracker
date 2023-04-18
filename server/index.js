require('dotenv').config();
const express = require('express') //express module
const app = express(); // create an express app

const cors = require('cors');
const mongoose = require("mongoose"); //allows all cross-origin requests to access the resources
app.use(cors()); //configure allowed domain/origin later
// app.use(cors({origin: process.env.frontendURL, credentials: true}));

app.use(express.urlencoded({extended: true})); //parse incoming request bodies with URL-encoded data by the client
app.use(express.json()); // parse request bodies that are in JSON format

const port = 3000 || process.env.PORT;

//Connection pooling to improve the performance and scalability
// Reuse connection to db
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // max connections in the pool
};

mongoose.connect(process.env.MONGODB_URL, options)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
    console.log(err);
    console.log('MongoDB Connection Failed');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});