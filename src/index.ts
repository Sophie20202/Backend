import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router/index";

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use("/greet/v1", router);

// Environment variables
const port: string | number = process.env.PORT || 3000;
const database: string = process.env.DATABASE || "mongodb://localhost:27017/mydatabase";

// Server start
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

// Database connection
mongoose.connect(database)
    .then(() => {
        console.log(`Database connected successfully`);
    })
    .catch((error) => {
        console.log(error);
    });

export default app;


