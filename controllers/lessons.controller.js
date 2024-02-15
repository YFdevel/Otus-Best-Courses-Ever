import express from "express";
import {create, getCommentsGroupByLesson} from "../services/lessons.service.js";
import {lessonsCollection, commentsCollection} from "../index.js";
import {
    getAll,
    findById,
    updateOne,
    deleteOne,
    findByAuthorId,
    findByCourseId,
    getLinkOfCollections
} from "../handlers/servicesHandlers.js";
import {checkAuth} from "../handlers/checkAccess.js";

const lessonsRouter = express.Router();

lessonsRouter.post("/", async (req, res) => {
    const answer = await create(req.body, req.files);
    //
    // if (typeof answer === "string") {
    //     res.status(400).json({message: answer});
    //
    // } else {
    //     res.status(201).json(answer);
    // }
    res.sendStatus(201)
});

lessonsRouter.get("/", async (req, res) => {
    const answer = await getAll(lessonsCollection);
    res.status(200).send(answer);
});

lessonsRouter.get("/create/:id", async (req, res) => {
    res.status(200).render("lesson-create");
});

lessonsRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id, lessonsCollection);
    res.status(200).send(answer);
});

lessonsRouter.get("/author/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByAuthorId(id, lessonsCollection);
    res.status(200).send(answer);
});

lessonsRouter.get("/course/:id", checkAuth, async (req, res) => {
    const {id} = req.params;
    const initialLessons = await findByCourseId(id, lessonsCollection);
    const comments = await getCommentsGroupByLesson(id);
    const lessons = getLinkOfCollections(initialLessons, comments);
    res.status(200).render("lessons-page", {courseId:id,lessons});
});

lessonsRouter.patch("/", async (req, res) => {
    const answer = await updateOne(req.params.id, req.body, lessonsCollection);
    res.status(200).send(answer);
});

lessonsRouter.delete("/:id", async (req, res) => {
    const answer = await deleteOne(req.params.id, lessonsCollection);
    res.status(200).send(answer);
});

export default lessonsRouter;