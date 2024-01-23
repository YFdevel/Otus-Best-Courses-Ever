import express from "express";
import {create, getAll, findById, updateCourse, deleteCourse, findByAuthorId} from "../services/courses.service.js";
const coursesRouter = express.Router();

coursesRouter.post("/", async (req, res) => {
    const answer = await create(req.body);
    if (typeof answer === "string") {
        res.status(400).json({message: answer});

    } else {
        res.status(201).json(answer);
    }
});

coursesRouter.get("/", async (req, res) => {
    const answer = await getAll();
    res.status(200).send(answer);
});

coursesRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id);
    res.status(200).send(answer);
});

coursesRouter.get("/author/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByAuthorId(id);
    res.status(200).send(answer);
});

coursesRouter.patch("/", async (req, res) => {
    const answer = await updateCourse(req.params.id,req.body);
    res.status(200).send(answer);
});

coursesRouter.delete("/:id", async (req, res) => {
    const answer = await deleteCourse(req.params.id);
    res.status(200).send(answer);
});

export default coursesRouter;