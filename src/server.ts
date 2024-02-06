import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import cors from 'cors';
import express from "express";

const port = env.PORT;

// Allow requests from a specific origin
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all origins
      callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('My Notes');
});

mongoose.connect(env.MONGO_CONNECTION_STRING, {
  ssl: true,
  sslValidate: true,
})

    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch(console.error);

    mongoose.set('strictQuery', false);