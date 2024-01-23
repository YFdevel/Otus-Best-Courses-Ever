import express from "express";
import {create, getAll, findById,updateUser,deleteUser} from "../services/users.service.js";
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
    const answer = await getAll();
    res.status(200).send(answer);
});

usersRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id);
    res.status(200).send(answer);
});

usersRouter.patch("/:id", async (req, res) => {
    const answer = await updateUser(req.params.id,req.body);
    res.status(200).send(answer);
});


usersRouter.delete("/:id", async (req, res) => {
    const answer = await deleteUser(req.params.id);
    res.status(200).send(answer);
});

export default usersRouter;