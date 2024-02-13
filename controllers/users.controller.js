import express from "express";
import dotenv from "dotenv";
import {create} from "../services/users.service.js";
import {usersCollection, refreshSessionsCollection} from "../index.js";
import {getAll, findById, updateOne, deleteOne} from "../handlers/servicesHandlers.js";
import {isValidPassword,} from "../config/strategy.js";
// import jwt from "jwt-simple";
import jwt from "jsonwebtoken";
import {auth} from "../config/strategy.js";
import {
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION,
    ACCESS_COOKIE_SETTINGS,
    REFRESH_COOKIE_SETTINGS
} from "../constants/cookies.js";
import {checkAuth, checkRole} from "../handlers/checkAccess.js";
import {ROLES} from "../constants/roles.js";
import {login,logout,refresh} from "../services/users.service.js";


dotenv.config();
const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
    const answer = await create(req.body);
    if (typeof answer === "string") {
        res.status(400).json({message: answer});

    } else {
        res.status(201).json(answer);
    }
});

usersRouter.post('/login', async (req, res, next) => {
    try {
        const {fingerprint} = req;
        const answer = await login(req.body, fingerprint);
        if (answer) {
            const{accessToken, refreshToken}=answer;
            res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_SETTINGS);
            res.cookie('accessToken', accessToken, ACCESS_COOKIE_SETTINGS);
            res.json({
                accessToken,
                refreshToken,
                accessTokenExpiration: ACCESS_TOKEN_EXPIRATION
            });
        } else {
            res.status(400).send('Не верный логин или пароль!');
        }
    } catch (err) {
        next(err);
    }
});

usersRouter.get("/logout", async(req, res,next) => {
    try {
        await logout(req.cookies.refreshToken);
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        return res.redirect("/");
    } catch (err) {
        next(err);
    }
});


usersRouter.post("/refresh", async (req, res, next) => {
    try {
        const{fingerprint}=req;
        const answer=await refresh(req.cookies.refreshToken,fingerprint);
        if(answer){
            const{accessToken, refreshToken}=answer;
            res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_SETTINGS);
            res.cookie('accessToken', accessToken, ACCESS_COOKIE_SETTINGS);
            res.redirect("/");
        }
    } catch (err) {
        next(err);
    }
});

usersRouter.get("/", checkAuth, async (req, res) => {
    const answer = await getAll(usersCollection);
    res.status(200).send(answer);
});

usersRouter.get("/:id", auth, async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id, usersCollection);
    console.log(answer)
    res.status(200).send(answer);
});

usersRouter.patch("/:id", async (req, res) => {
    const answer = await updateOne(req.params.id, req.body, usersCollection);
    res.status(200).send(answer);
});


usersRouter.delete("/:id", checkAuth, checkRole(ROLES.ADMIN), async (req, res) => {
    const answer = await deleteOne(req.params.id, usersCollection);
    res.status(200).send(answer);
});

export default usersRouter;