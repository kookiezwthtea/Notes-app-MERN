import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import cors from 'cors';

const port = env.PORT;

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