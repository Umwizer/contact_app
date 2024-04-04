import dotenv from 'dotenv';
dotenv.config();
import swaggerUi from "swagger-ui-express";
import fs from 'fs';
const swagger = JSON.parse(fs.readFileSync("./docs/swagger.json", "utf-8"));
import express from 'express';
const app = express();
import configuration from './configs/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
import contactRouter from './routes/contact.routes.js';
import errorHandler from './errorHandler/contactErrorHandler.js';

//middleware

app.use(express.json());
app.use(cors());
app.use(express.json());

//db connection

mongoose.connect(configuration.mongoURI)
.then(() => {
 //routes
 app.use("/contact",contactRouter);
 app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger))

 app.use(errorHandler.notFound)
 app.use(errorHandler.serverError)
    app.listen(configuration.port, ()=> {
        console.log("listening on port "+configuration.port);
    });
})
.catch(err => {
    console.log(err);
});