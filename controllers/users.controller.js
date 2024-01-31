import express from "express";
import {create} from "../services/users.service.js";
import {usersCollection} from "../index.js";
import {getAll,findById,updateOne,deleteOne} from "../handlers/servicesHandlers.js";

const usersRouter = express.Router();

usersRouter.post("/", async(req, res) => {
    const answer = await create(req.body);
    if (typeof answer === "string") {
        res.status(400).json({message: answer});

    } else {
        res.status(201).json(answer);
    }
});

usersRouter.get("/", async (req, res) => {
    const answer=await getAll(usersCollection);
    res.status(200).send(answer);
});

usersRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id,usersCollection);
    res.status(200).send(answer);
});

usersRouter.patch("/:id", async (req, res) => {
    const answer = await updateOne(req.params.id,req.body,usersCollection);
    res.status(200).send(answer);
});


usersRouter.delete("/:id", async (req, res) => {
    const answer = await deleteOne(req.params.id);
    res.status(200).send(answer);
});

export default usersRouter;