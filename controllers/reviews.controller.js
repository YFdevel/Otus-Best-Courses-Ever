const reviewsRouter = require('express').Router();

reviewsRouter.post("/", (req, res) => {
    const {title, message, authorId, courseId} = req.body;
    res.status(201).send("Комментарий успешно создан");
});

reviewsRouter.get("/", (req, res) => {
    res.status(200).send("Успешный запрос");
});

reviewsRouter.get("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Успешный запрос");
});

reviewsRouter.patch("/", (req, res) => {
    const {id, title, message} = req.body;
    res.status(201).send("Данные комментария успешно изменены");
});


reviewsRouter.delete("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Комментарий успешно удален");
});

module.exports=reviewsRouter;