const lessonsRouter = require('express').Router();

lessonsRouter.post("/", (req, res) => {
    const {title, description, videoUrl, courseId} = req.body;
    res.status(201).send("Урок успешно создан");
});

lessonsRouter.get("/", (req, res) => {
    res.status(200).send("Успешный запрос");
});

lessonsRouter.get("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Успешный запрос");
});

lessonsRouter.patch("/", (req, res) => {
    const {id, title, description, videoUrl} = req.body;
    res.status(201).send("Данные урока успешно изменены");
});


lessonsRouter.delete("/:id", (req, res) => {
    const {id} = req.params;
    res.status(200).send("Урок успешно удален");
});

module.exports=lessonsRouter;