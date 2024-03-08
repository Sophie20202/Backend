import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";


import router from "./router/index";
import mongoose from "mongoose";
const app = express();
dotenv.config();
import swaggerUi from "swagger-ui-express";
import swaggerOutPut from './documentation/swagger_output.json'
import { Comment } from "./models/comment";
import cors from "cors";

app.use(cors())
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutPut));
app.use("/greet/v1", router);
app.get("/uploads/:image", (req, res) => {
    // #swagger.ignore = true
    res.sendFile(req.params.image, { root: "uploads" });
  });




const port: string | number = process.env.PORT || 5000;
const database: string = process.env.DATABASE || "mongodb+srv://sofidele12:Sophie1992@mukamugema.xgxanbg.mongodb.net/SALES";

if (process.env.NODE_ENV !=="test") 
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});

// Database connection
mongoose.connect(database)
    .then(() => {
        console.log(`Database connected successfully`);
    })
    .catch((error) =>{
        console.log(error);
    });
    

export default app;




