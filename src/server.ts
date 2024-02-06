import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import cors from 'cors';
import express from "express";

const port = env.PORT;

// Allow requests from a specific origin
app.use(express.json());

app.options('/api/users/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://notes-app-mern-lgpr.onrender.com');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204); // No content in the response
  });
  

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