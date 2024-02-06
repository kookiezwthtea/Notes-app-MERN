import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import cors from 'cors';

const port = env.PORT;

app.use(cors({
    origin: 'https://notes-app-mern-lgpr.onrender.com',
    optionsSuccessStatus: 200, 
  }));

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