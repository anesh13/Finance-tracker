require('dotenv').config();
const express = require('express') //express module
const app = express(); // create an express app

const cors = require('cors'); //allows all cross-origin requests to access the resources
app.use(cors()); //configure allowed domain/origin later
// app.use(cors({origin: process.env.frontendURL, credentials: true}));

app.use(express.urlencoded({extended: true})); //parse incoming request bodies with URL-encoded data by the client
app.use(express.json()); // parse request bodies that are in JSON format

const port = 3000 || process.env.PORT;


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});