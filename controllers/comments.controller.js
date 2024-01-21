const commentsRouter = require('express').Router();

commentsRouter.post("/", (req, res) => {
    const {title, message, authorId, lessonId} = req.body;
    res.status(201).send("Комментарий успешно создан");
});

commentsRouter.get("/", (req, res) => {
    res.status(200).send("Успешный запрос");
});

commentsRouter.get("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Успешный запрос");
});

commentsRouter.patch("/", (req, res) => {
    const {id, title, message} = req.body;
    res.status(201).send("Данные комментария успешно изменены");
});


commentsRouter.delete("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Комментарий успешно удален");
});

module.exports=commentsRouter;