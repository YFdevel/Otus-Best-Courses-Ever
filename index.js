import express from "express";
import https from "https";
import fs from "fs";
import mustache from "mustache";
import MongoClient from "mongodb";
import mustacheExpress from "mustache-express";
import cors from "cors";
import dotenv from "dotenv";
import { getGlobals } from "common-es";
import passport from "passport";
import cookieParser from "cookie-parser";
import Fingerprint from "express-fingerprint";
// import session from "express-session";
// import sessionFileStore from "session-file-store";
import passportJWT from "passport-jwt";
import coursesRouter from "./controllers/courses.controller.js";
import lessonsRouter from "./controllers/lessons.controller.js";
import usersRouter from "./controllers/users.controller.js";
import commentsRouter from "./controllers/comments.controller.js";
import reviewsRouter from "./controllers/reviews.controller.js";
import {strategy, auth} from "./config/strategy.js";

dotenv.config();
const { __dirname, __filename } = getGlobals(import.meta.url);
const key = fs.readFileSync('ssl/key.pem');
const cert = fs.readFileSync('ssl/cert.pem');
const mongoClient = new MongoClient.MongoClient(process.env.MONGO_AUTH_STRING);
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
export const app = express();
// const fileStore=sessionFileStore(session);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({credentials:true, origin:process.env.CLIENT_URL}));
app.use(Fingerprint({
    parameters:[
        Fingerprint.useragent, Fingerprint.acceptHeaders
    ]
}));
passport.use(strategy);
app.use(passport.initialize());
// app.use(passport.session({}));
// app.use(session({
//     secret: process.env.SECRET,
//     store: new fileStore({}),
//     cookie: {
//         path: "/",
//         httpOnly: true,
//         maxAge: 60 * 60 * 1000
//     },
//     resave: false,
//     saveUninitialized: false
// }));
app.use(express.static('static'));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

const db = mongoClient.db("courses");
export const usersCollection = db.collection("users");
export const coursesCollection = db.collection("courses");
export const lessonsCollection = db.collection("lessons");
export const commentsCollection = db.collection("comments");
export const reviewsCollection = db.collection("reviews");
export const refreshSessionsCollection = db.collection("refresh_sessions");


app.use("/courses", coursesRouter);
app.use("/users", usersRouter);
app.use("/lessons", lessonsRouter);
app.use("/comments", commentsRouter);
app.use("/reviews", reviewsRouter);
app.get('/', async (req, res) =>{
    const courses=await coursesCollection.find().toArray();
    res.render('index',{
        list:courses,
        // access:req.cookies.accessToken
    });
});
app.use((err, req, res, next) => {
    console.log("Возникла ошибка в работе приложения: ",err?.message);
    console.log(err.stack);
    res.status(500).send({ message: "Uh oh! An unexpected error occured." })
});

export const server = https.createServer({key: key, cert: cert }, app);

const start = async () => {
        try {
            await mongoClient.connect();
            server.listen(process.env.SERVER_PORT, () => { console.log(`Server is listening on ${process.env.SERVER_PORT}`) });
        } catch
            (err) {
            console.log("Возникла ошибка в работе приложения: ",err?.message);
            console.log(err.stack);
        }
    }
;

start().catch();
