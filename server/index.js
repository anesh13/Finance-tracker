import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoute from './routes/user.js';

const app = express(); // create an express app
app.use(cors()); // todo configure allowed domain/origin later
// app.use(cors({origin: process.env.frontendURL, credentials: true}));

app.use(express.urlencoded({ extended: true })); // parse req.body with URL-encoded format by client
app.use(express.json()); // parse request bodies that are in JSON format
dotenv.config();

const port = 3000 || process.env.PORT;

// Connection pooling to improve the performance and scalability
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

app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
