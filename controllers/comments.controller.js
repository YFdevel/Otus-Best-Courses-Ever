import express from "express";
import {create} from "../services/comments.service.js";
import {commentsCollection} from "../index.js";
import {getAll,findById,updateOne,deleteOne, findByAuthorId,findByLessonId} from "../handlers/servicesHandlers.js";
const commentsRouter = express.Router();

commentsRouter.post("/", async (req, res) => {
    const answer = await create(req.body);
        res.status(201).json(answer);
});

commentsRouter.get("/", async (req, res) => {
    const answer = await getAll(commentsCollection);
    res.status(200).send(answer);
});

commentsRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id,commentsCollection);
    res.status(200).send(answer);
});

commentsRouter.get("/author/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByAuthorId(id,commentsCollection);
    res.status(200).send(answer);
});

commentsRouter.get("/lesson/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByLessonId(id,commentsCollection);
    res.status(200).send(answer);
});

commentsRouter.patch("/", async (req, res) => {
    const answer = await updateOne(req.params.id,req.body,commentsCollection);
    res.status(200).send(answer);
});

commentsRouter.delete("/:id", async (req, res) => {
    const answer = await deleteOne(req.params.id,commentsCollection);
    res.status(200).send(answer);
});

export default commentsRouter;