import express from "express";
import https from "https";
import fs from "fs";
import mustache from "mustache";
import mongoose from "mongoose";
import MongoClient from "mongodb";
import mustacheExpress from 'mustache-express';
import cors from "cors";
import dotenv from "dotenv";
import { getGlobals } from 'common-es'
import coursesRouter from "./controllers/courses.controller.js";
import lessonsRouter from "./controllers/lessons.controller.js";
import usersRouter from "./controllers/users.controller.js";
import commentsRouter from "./controllers/comments.controller.js";
import reviewsRouter from "./controllers/reviews.controller.js";

dotenv.config();
const { __dirname, __filename } = getGlobals(import.meta.url);
const key = fs.readFileSync('ssl/key.pem');
const cert = fs.readFileSync('ssl/cert.pem');
const mongoClient = new MongoClient.MongoClient(process.env.MONGO_AUTH_STRING);
export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('static'));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use("/courses", coursesRouter);
app.use("/users", usersRouter);
app.use("/lessons", lessonsRouter);
app.use("/comments", commentsRouter);
app.use("/reviews", reviewsRouter);
app.get('/', function (request, response) {
    response.render('index');
});
app.use((err, req, res, next) => {
    console.log(err?.message)
    res.status(500).send({ message: "Uh oh! An unexpected error occured." })
});

const db = mongoClient.db("courses");
export const usersCollection = db.collection("users");
export const coursesCollection = db.collection("courses");
export const lessonsCollection = db.collection("lessons");
export const commentsCollection = db.collection("comments");
export const reviewsCollection = db.collection("reviews");
export const server = https.createServer({key: key, cert: cert }, app);

const start = async () => {
        try {
            await mongoClient.connect();
            server.listen(process.env.SERVER_PORT, () => { console.log(`Server is listening on ${process.env.SERVER_PORT}`) });
        } catch
            (err) {
            console.log(err.message);
        }
    }
;

start().catch();
