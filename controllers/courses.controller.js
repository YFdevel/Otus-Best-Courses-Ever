import express from "express";
import {create} from "../services/courses.service.js";
import {coursesCollection} from "../index.js";
import {getAll,findById,updateOne,deleteOne, findByAuthorId} from "../handlers/servicesHandlers.js";
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
    const answer = await getAll(coursesCollection);
    res.status(200).render("courses-page",{list:answer});
});

coursesRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id,coursesCollection);
    //res.status(200).send(answer);
    res.render("course-detail",answer);
});

coursesRouter.get("/author/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByAuthorId(id,coursesCollection);
    res.status(200).send(answer);
});

coursesRouter.patch("/", async (req, res) => {
    const answer = await updateOne(req.params.id,req.body,coursesCollection);
    res.status(200).send(answer);
});

coursesRouter.delete("/:id", async (req, res) => {
    const answer = await deleteOne(req.params.id,coursesCollection);
    res.status(200).send(answer);
});

export default coursesRouter;