import express from "express";
import {create, getAll, findById, updateLesson, deleteLesson, findByCourseId, findByAuthorId} from "../services/lessons.service.js";
const lessonsRouter = express.Router();

lessonsRouter.post("/", async (req, res) => {
    const answer = await create(req.body);
    if (typeof answer === "string") {
        res.status(400).json({message: answer});

    } else {
        res.status(201).json(answer);
    }
});

lessonsRouter.get("/", async (req, res) => {
    const answer = await getAll();
    res.status(200).send(answer);
});

lessonsRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id);
    res.status(200).send(answer);
});

lessonsRouter.get("/author/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByAuthorId(id);
    res.status(200).send(answer);
});

lessonsRouter.get("/course/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByCourseId(id);
    res.status(200).send(answer);
});

lessonsRouter.patch("/", async (req, res) => {
    const answer = await updateCourse(req.params.id,req.body);
    res.status(200).send(answer);
});

lessonsRouter.delete("/:id", async (req, res) => {
    const answer = await deleteCourse(req.params.id);
    res.status(200).send(answer);
});

export default lessonsRouter;