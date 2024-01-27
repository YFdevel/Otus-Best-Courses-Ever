import express from "express";
import {create} from "../services/reviews.service.js";
import {reviewsCollection} from "../index.js";
import {getAll,findById,updateOne,deleteOne, findByAuthorId,findByCourseId} from "../handlers/servicesHandlers.js";
const reviewsRouter = express.Router();

reviewsRouter.post("/", async (req, res) => {
    const answer = await create(req.body);
    res.status(201).json(answer);
});

reviewsRouter.get("/", async (req, res) => {
    const answer = await getAll(reviewsCollection);
    res.status(200).send(answer);
});

reviewsRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id,reviewsCollection);
    res.status(200).send(answer);
});

reviewsRouter.get("/author/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByAuthorId(id,reviewsCollection);
    res.status(200).send(answer);
});

reviewsRouter.get("/course/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByCourseId(id,reviewsCollection);
    res.status(200).send(answer);
});

reviewsRouter.patch("/", async (req, res) => {
    const answer = await updateOne(req.params.id,req.body,reviewsCollection);
    res.status(200).send(answer);
});

reviewsRouter.delete("/:id", async (req, res) => {
    const answer = await deleteOne(req.params.id,reviewsCollection);
    res.status(200).send(answer);
});

export default reviewsRouter;